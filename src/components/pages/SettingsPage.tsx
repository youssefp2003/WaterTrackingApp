import React, { useState, useEffect } from 'react';
import { Scale, Bell } from 'lucide-react';
import { useWaterStore } from '../../store/waterStore';
import { notificationService } from '../../services/NotificationService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

export const SettingsPage: React.FC = () => {
  const { dailyGoal, setDailyGoal } = useWaterStore();
  const { user } = useAuth();
  const [newGoal, setNewGoal] = useState(dailyGoal.toString());
  const [weight, setWeight] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(user?.reminderEnabled ?? false);
  const [reminderInterval, setReminderInterval] = useState(user?.reminderInterval?.toString() ?? '60');
  const [reminderStartTime, setReminderStartTime] = useState(user?.reminderStartTime ?? '08:00');
  const [reminderEndTime, setReminderEndTime] = useState(user?.reminderEndTime ?? '22:00');
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    if (reminderEnabled && notificationPermission === 'granted') {
      notificationService.startReminders(
        parseInt(reminderInterval),
        reminderStartTime,
        reminderEndTime
      );
    } else {
      notificationService.stopReminders();
    }

    return () => notificationService.stopReminders();
  }, [reminderEnabled, reminderInterval, reminderStartTime, reminderEndTime, notificationPermission]);

  const calculateDailyGoal = (weightKg: number) => {
    return Math.round(weightKg * 35);
  };

  const handleWeightSubmit = () => {
    const weightNum = parseFloat(weight);
    if (weightNum > 0) {
      const calculatedGoal = calculateDailyGoal(weightNum);
      setNewGoal(calculatedGoal.toString());
      setDailyGoal(calculatedGoal);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseInt(newGoal);
    if (goal > 0) {
      setDailyGoal(goal);
    }

    if (user?.id) {
      try {
        await updateDoc(doc(db, 'users', user.id), {
          reminderEnabled,
          reminderInterval: parseInt(reminderInterval),
          reminderStartTime,
          reminderEndTime
        });

        if (reminderEnabled) {
          const hasPermission = await notificationService.requestPermission();
          setNotificationPermission(hasPermission ? 'granted' : 'denied');
          
          if (hasPermission) {
            notificationService.startReminders(
              parseInt(reminderInterval),
              reminderStartTime,
              reminderEndTime
            );
          }
        } else {
          notificationService.stopReminders();
        }
      } catch (error) {
        console.error('Error updating reminder settings:', error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 mb-20">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Scale size={20} />
              Daily Goal Calculator
            </h3>
            <div className="space-y-3">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight (kg)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
              <button
                onClick={handleWeightSubmit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Calculate Goal
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700 mb-1">
                Daily Water Goal (ml)
              </label>
              <input
                type="number"
                id="dailyGoal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell size={20} />
            Reminder Settings
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="reminderEnabled" className="text-sm font-medium text-gray-700">
                Enable Reminders
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="reminderEnabled"
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            {reminderEnabled && (
              <>
                <div>
                  <label htmlFor="reminderInterval" className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Interval
                  </label>
                  <select
                    id="reminderInterval"
                    value={reminderInterval}
                    onChange={(e) => setReminderInterval(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                    <option value="90">Every 1.5 hours</option>
                    <option value="120">Every 2 hours</option>
                    <option value="180">Every 3 hours</option>
                    <option value="240">Every 4 hours</option>
                    <option value="300">Every 5 hours</option>
                    <option value="360">Every 6 hours</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      value={reminderStartTime}
                      onChange={(e) => setReminderStartTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      value={reminderEndTime}
                      onChange={(e) => setReminderEndTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};