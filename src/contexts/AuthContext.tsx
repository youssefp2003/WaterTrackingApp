import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../types';
<<<<<<< HEAD
=======
import { notificationService } from '../services/NotificationService';
>>>>>>> 8be8f0c (pre-workign-notif)

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
<<<<<<< HEAD
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              username: userDoc.data().username,
              dailyGoal: userDoc.data().dailyGoal || 2000,
              preferredUnit: userDoc.data().preferredUnit || 'ml',
              quickAddOptions: userDoc.data().quickAddOptions || [250, 500, 750]
            });
=======
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              username: userData.username,
              dailyGoal: userData.dailyGoal || 2000,
              preferredUnit: userData.preferredUnit || 'ml',
              quickAddOptions: userData.quickAddOptions || [250, 500, 750],
              reminderEnabled: userData.reminderEnabled || false,
              reminderInterval: userData.reminderInterval || 60,
              reminderStartTime: userData.reminderStartTime || '08:00',
              reminderEndTime: userData.reminderEndTime || '22:00'
            });

            if (userData.reminderEnabled) {
              const hasPermission = await notificationService.requestPermission();
              if (hasPermission) {
                notificationService.startReminders(
                  userData.reminderInterval,
                  userData.reminderStartTime,
                  userData.reminderEndTime
                );
              }
            }
>>>>>>> 8be8f0c (pre-workign-notif)
          } else {
            const userData = {
              email: firebaseUser.email!,
              username: firebaseUser.email!.split('@')[0],
              dailyGoal: 2000,
              preferredUnit: 'ml',
<<<<<<< HEAD
              quickAddOptions: [250, 500, 750]
=======
              quickAddOptions: [250, 500, 750],
              reminderEnabled: false,
              reminderInterval: 60,
              reminderStartTime: '08:00',
              reminderEndTime: '22:00'
>>>>>>> 8be8f0c (pre-workign-notif)
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            setUser({ id: firebaseUser.uid, ...userData });
          }
        } else {
          setUser(null);
<<<<<<< HEAD
=======
          notificationService.stopReminders();
>>>>>>> 8be8f0c (pre-workign-notif)
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

<<<<<<< HEAD
    return () => unsubscribe();
=======
    return () => {
      unsubscribe();
      notificationService.stopReminders();
    };
>>>>>>> 8be8f0c (pre-workign-notif)
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists()) {
<<<<<<< HEAD
        setUser({
          id: result.user.uid,
          email: result.user.email!,
          username: userDoc.data().username,
          dailyGoal: userDoc.data().dailyGoal || 2000,
          preferredUnit: userDoc.data().preferredUnit || 'ml',
          quickAddOptions: userDoc.data().quickAddOptions || [250, 500, 750]
        });
=======
        const userData = userDoc.data();
        setUser({
          id: result.user.uid,
          email: result.user.email!,
          username: userData.username,
          dailyGoal: userData.dailyGoal || 2000,
          preferredUnit: userData.preferredUnit || 'ml',
          quickAddOptions: userData.quickAddOptions || [250, 500, 750],
          reminderEnabled: userData.reminderEnabled || false,
          reminderInterval: userData.reminderInterval || 60,
          reminderStartTime: userData.reminderStartTime || '08:00',
          reminderEndTime: userData.reminderEndTime || '22:00'
        });

        if (userData.reminderEnabled) {
          const hasPermission = await notificationService.requestPermission();
          if (hasPermission) {
            notificationService.startReminders(
              userData.reminderInterval,
              userData.reminderStartTime,
              userData.reminderEndTime
            );
          }
        }
>>>>>>> 8be8f0c (pre-workign-notif)
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential' || 
          error.code === 'auth/user-not-found' || 
          error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error('Failed to login. Please try again.');
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        username,
        email,
        dailyGoal: 2000,
        preferredUnit: 'ml',
<<<<<<< HEAD
        quickAddOptions: [250, 500, 750]
=======
        quickAddOptions: [250, 500, 750],
        reminderEnabled: false,
        reminderInterval: 60,
        reminderStartTime: '08:00',
        reminderEndTime: '22:00'
>>>>>>> 8be8f0c (pre-workign-notif)
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      setUser({ id: firebaseUser.uid, ...userData });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error('Failed to register. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
<<<<<<< HEAD
=======
      notificationService.stopReminders();
>>>>>>> 8be8f0c (pre-workign-notif)
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};