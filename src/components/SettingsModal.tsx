import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { dailyGoal, setDailyGoal } = useWaterStore();
  const [newGoal, setNewGoal] = useState(dailyGoal.toString());
  const [weight, setWeight] = useState('');

  const calculateDailyGoal = (weightKg: number) => {
    // Standard calculation: 35ml per kg of body weight
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseInt(newGoal);
    if (goal > 0) {
      setDailyGoal(goal);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
        
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
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};