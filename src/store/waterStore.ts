import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';

interface WaterLog {
  id: string;
  amount: number;
  timestamp: number;
  userId: string;
}

interface WaterStore {
  dailyGoal: number;
  logs: WaterLog[];
  quickAddAmounts: number[];
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
      quickAddAmounts: [250, 500, 750],
      
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      
      addWaterLog: async (amount, userId) => {
        const timestamp = Date.now();
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
        const today = new Date().setHours(0, 0, 0, 0);
        return get().logs
          .filter((log) => new Date(log.timestamp).setHours(0, 0, 0, 0) === today)
          .reduce((sum, log) => sum + log.amount, 0);
      },
      
      getWeeklyData: async (userId) => {
        const days = 7;
        const data = [];
        const now = new Date();

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
            logs: dayLogs.sort((a, b) => a.time.localeCompare(b.time))
          });
        }

        return data;
      },
      
      resetTodayLogs: async () => {
        const today = new Date().setHours(0, 0, 0, 0);
        const todayLogs = get().logs.filter(
          (log) => new Date(log.timestamp).setHours(0, 0, 0, 0) === today
        );
        
        for (const log of todayLogs) {
          await deleteDoc(doc(db, 'waterLogs', log.id));
        }
        
        set((state) => ({
          logs: state.logs.filter(
            (log) => new Date(log.timestamp).setHours(0, 0, 0, 0) !== today
          ),
        }));
      },
      
      fetchUserLogs: async (userId) => {
        const q = query(collection(db, 'waterLogs'), where('userId', '==', userId));
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