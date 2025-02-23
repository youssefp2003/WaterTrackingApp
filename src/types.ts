export interface User {
  id: string;
  email: string;
  username: string;
  dailyGoal: number;
  preferredUnit: 'ml' | 'oz';
  quickAddOptions: number[];
<<<<<<< HEAD
=======
  reminderEnabled: boolean;
  reminderInterval: number; // in minutes
  reminderStartTime: string; // HH:mm format
  reminderEndTime: string; // HH:mm format
>>>>>>> 8be8f0c (pre-workign-notif)
}

export interface WaterLog {
  id: string;
  userId: string;
  amount: number;
  timestamp: number;
  date: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}