import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface WaterLog {
  id: string;
  amount: number;
  timestamp: number;
  userId: string;
  date: string;
}

interface WaterStore {
  dailyGoal: number;
  logs: WaterLog[];
  quickAddAmounts: number[];
  optimisticLogs: WaterLog[];
  cachedWeeklyData: { [key: string]: any };
  setDailyGoal: (goal: number) => void;
  addWaterLog: (amount: number, userId: string) => Promise<void>;
  removeWaterLog: (id: string) => Promise<void>;
  addQuickAmount: (amount: number) => void;
  removeQuickAmount: (amount: number) => void;
  getTodayTotal: () => number;
  getWeeklyData: (userId: string) => Promise<{ date: string; total: number; logs: { time: string; amount: number }[] }[]>;
  resetTodayLogs: () => Promise<void>;
  fetchUserLogs: (userId: string) => Promise<void>;
}

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      dailyGoal: 2000,
      logs: [],
      optimisticLogs: [],
      quickAddAmounts: [250, 500, 750],
      cachedWeeklyData: {},
      
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      
      addWaterLog: async (amount, userId) => {
        const timestamp = Date.now();
        const date = format(timestamp, 'yyyy-MM-dd');
        const optimisticLog = { id: `temp-${timestamp}`, amount, timestamp, userId, date };
        
        set((state) => ({
          optimisticLogs: [...state.optimisticLogs, optimisticLog],
        }));
        
        try {
          const docRef = await addDoc(collection(db, 'waterLogs'), {
            amount,
            timestamp,
            userId,
            date
          });
          
          set((state) => ({
            logs: [...state.logs, { ...optimisticLog, id: docRef.id }],
            optimisticLogs: state.optimisticLogs.filter(log => log.id !== optimisticLog.id),
            cachedWeeklyData: {}, // Clear cache when adding new log
          }));
        } catch (error) {
          set((state) => ({
            optimisticLogs: state.optimisticLogs.filter(log => log.id !== optimisticLog.id),
          }));
          throw error;
        }
      },
      
      removeWaterLog: async (id) => {
        set((state) => ({
          logs: state.logs.filter((log) => log.id !== id),
        }));
        
        try {
          await deleteDoc(doc(db, 'waterLogs', id));
          set({ cachedWeeklyData: {} }); // Clear cache when removing log
        } catch (error) {
          const log = get().logs.find((l) => l.id === id);
          if (log) {
            set((state) => ({
              logs: [...state.logs, log],
            }));
          }
          throw error;
        }
      },
      
      addQuickAmount: (amount) =>
        set((state) => ({
          quickAddAmounts: [...new Set([...state.quickAddAmounts, amount])].sort((a, b) => a - b),
        })),
        
      removeQuickAmount: (amount) =>
        set((state) => ({
          quickAddAmounts: state.quickAddAmounts.filter((a) => a !== amount),
        })),
        
      getTodayTotal: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const allLogs = [...get().logs, ...get().optimisticLogs];
        return allLogs
          .filter((log) => log.date === today)
          .reduce((sum, log) => sum + log.amount, 0);
      },
      
      getWeeklyData: async (userId) => {
        const cacheKey = `${userId}-${format(new Date(), 'yyyy-MM-dd')}`;
        const cachedData = get().cachedWeeklyData[cacheKey];
        
        if (cachedData) {
          return cachedData;
        }
        
        const days = 7;
        const data = [];
        const now = new Date();

        // Get all logs for the user
        const q = query(
          collection(db, 'waterLogs'),
          where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        const allLogs = querySnapshot.docs.map(doc => ({
          time: format(doc.data().timestamp, 'HH:mm'),
          amount: doc.data().amount,
          date: doc.data().date
        }));

        // Process logs for each day
        for (let i = days - 1; i >= 0; i--) {
          const date = format(subDays(now, i), 'yyyy-MM-dd');
          const dayLogs = allLogs.filter(log => log.date === date);
          
          data.push({
            date: format(subDays(now, i), 'EEE'),
            total: dayLogs.reduce((sum, log) => sum + log.amount, 0),
            logs: dayLogs.sort((a, b) => a.time.localeCompare(b.time))
          });
        }

        set((state) => ({
          cachedWeeklyData: {
            ...state.cachedWeeklyData,
            [cacheKey]: data
          }
        }));

        return data;
      },
      
      resetTodayLogs: async () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayLogs = get().logs.filter(log => log.date === today);
        
        for (const log of todayLogs) {
          await deleteDoc(doc(db, 'waterLogs', log.id));
        }
        
        set((state) => ({
          logs: state.logs.filter(log => log.date !== today),
          cachedWeeklyData: {}, // Clear cache when resetting logs
        }));
      },
      
      fetchUserLogs: async (userId) => {
        const q = query(
          collection(db, 'waterLogs'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const logs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as WaterLog[];
        
        set({ logs });
      },
    }),
    {
      name: 'water-storage',
    }
  )
);