import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
<<<<<<< HEAD
import { format } from 'date-fns';
=======
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
>>>>>>> 8be8f0c (pre-workign-notif)

interface WaterLog {
  id: string;
  amount: number;
  timestamp: number;
  userId: string;
<<<<<<< HEAD
=======
  date: string;
>>>>>>> 8be8f0c (pre-workign-notif)
}

interface WaterStore {
  dailyGoal: number;
  logs: WaterLog[];
  quickAddAmounts: number[];
<<<<<<< HEAD
=======
  optimisticLogs: WaterLog[];
  cachedWeeklyData: { [key: string]: any };
>>>>>>> 8be8f0c (pre-workign-notif)
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
<<<<<<< HEAD
      quickAddAmounts: [250, 500, 750],
=======
      optimisticLogs: [],
      quickAddAmounts: [250, 500, 750],
      cachedWeeklyData: {},
>>>>>>> 8be8f0c (pre-workign-notif)
      
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      
      addWaterLog: async (amount, userId) => {
        const timestamp = Date.now();
<<<<<<< HEAD
        const docRef = await addDoc(collection(db, 'waterLogs'), {
          amount,
          timestamp,
          userId,
          date: format(timestamp, 'yyyy-MM-dd')
        });
        
        set((state) => ({
          logs: [...state.logs, { id: docRef.id, amount, timestamp, userId }],
        }));
      },
      
      removeWaterLog: async (id) => {
        await deleteDoc(doc(db, 'waterLogs', id));
        set((state) => ({
          logs: state.logs.filter((log) => log.id !== id),
        }));
=======
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
>>>>>>> 8be8f0c (pre-workign-notif)
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
<<<<<<< HEAD
        const today = new Date().setHours(0, 0, 0, 0);
        return get().logs
          .filter((log) => new Date(log.timestamp).setHours(0, 0, 0, 0) === today)
=======
        const today = format(new Date(), 'yyyy-MM-dd');
        const allLogs = [...get().logs, ...get().optimisticLogs];
        return allLogs
          .filter((log) => log.date === today)
>>>>>>> 8be8f0c (pre-workign-notif)
          .reduce((sum, log) => sum + log.amount, 0);
      },
      
      getWeeklyData: async (userId) => {
<<<<<<< HEAD
=======
        const cacheKey = `${userId}-${format(new Date(), 'yyyy-MM-dd')}`;
        const cachedData = get().cachedWeeklyData[cacheKey];
        
        if (cachedData) {
          return cachedData;
        }
        
>>>>>>> 8be8f0c (pre-workign-notif)
        const days = 7;
        const data = [];
        const now = new Date();

<<<<<<< HEAD
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const formattedDate = format(date, 'yyyy-MM-dd');
          
          const q = query(
            collection(db, 'waterLogs'),
            where('date', '==', formattedDate),
            where('userId', '==', userId)
          );
          
          const querySnapshot = await getDocs(q);
          const dayLogs = querySnapshot.docs.map(doc => ({
            time: format(doc.data().timestamp, 'HH:mm'),
            amount: doc.data().amount
          }));
          
          const total = dayLogs.reduce((sum, log) => sum + log.amount, 0);
          
          data.push({
            date: format(date, 'EEE'),
            total,
=======
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
>>>>>>> 8be8f0c (pre-workign-notif)
            logs: dayLogs.sort((a, b) => a.time.localeCompare(b.time))
          });
        }

<<<<<<< HEAD
=======
        set((state) => ({
          cachedWeeklyData: {
            ...state.cachedWeeklyData,
            [cacheKey]: data
          }
        }));

>>>>>>> 8be8f0c (pre-workign-notif)
        return data;
      },
      
      resetTodayLogs: async () => {
<<<<<<< HEAD
        const today = new Date().setHours(0, 0, 0, 0);
        const todayLogs = get().logs.filter(
          (log) => new Date(log.timestamp).setHours(0, 0, 0, 0) === today
        );
=======
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayLogs = get().logs.filter(log => log.date === today);
>>>>>>> 8be8f0c (pre-workign-notif)
        
        for (const log of todayLogs) {
          await deleteDoc(doc(db, 'waterLogs', log.id));
        }
        
        set((state) => ({
<<<<<<< HEAD
          logs: state.logs.filter(
            (log) => new Date(log.timestamp).setHours(0, 0, 0, 0) !== today
          ),
=======
          logs: state.logs.filter(log => log.date !== today),
          cachedWeeklyData: {}, // Clear cache when resetting logs
>>>>>>> 8be8f0c (pre-workign-notif)
        }));
      },
      
      fetchUserLogs: async (userId) => {
<<<<<<< HEAD
        const q = query(collection(db, 'waterLogs'), where('userId', '==', userId));
=======
        const q = query(
          collection(db, 'waterLogs'),
          where('userId', '==', userId)
        );
>>>>>>> 8be8f0c (pre-workign-notif)
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