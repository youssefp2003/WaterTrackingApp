import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { useWaterStore } from '../../store/waterStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

export const SettingsPage: React.FC = () => {
  const { dailyGoal, setDailyGoal } = useWaterStore();
  const { user } = useAuth();
  const [newGoal, setNewGoal] = useState(dailyGoal.toString());
  const [weight, setWeight] = useState('');

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
          dailyGoal: goal
        });
      } catch (error) {
        console.error('Error updating settings:', error);
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