import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';
import { useAuth } from '../contexts/AuthContext';

export const CustomAdd: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const { addWaterLog } = useWaterStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(amount);
    if (value > 0 && user) {
      try {
        await addWaterLog(value, user.id);
        setAmount('');
      } catch (error) {
        console.error('Error adding water log:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-3">Custom Amount</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in ml"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Plus size={24} />
        </button>
      </form>
    </div>
  );
};