import React, { useState } from 'react';
import { PlusCircle, Plus, X } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';
import { useAuth } from '../contexts/AuthContext';

export const QuickAdd: React.FC = () => {
  const { user } = useAuth();
  const { quickAddAmounts, addWaterLog, addQuickAmount, removeQuickAmount } = useWaterStore();
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newAmount, setNewAmount] = useState('');

  const handleAddCustomAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(newAmount);
    if (amount > 0) {
      addQuickAmount(amount);
      setNewAmount('');
      setShowAddCustom(false);
    }
  };

  const handleQuickAdd = async (amount: number) => {
    if (user) {
      try {
        await addWaterLog(amount, user.id);
      } catch (error) {
        console.error('Error adding water log:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Quick Add</h2>
        <button
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
        >
          <Plus size={20} />
          Add Custom
        </button>
      </div>

      {showAddCustom && (
        <form onSubmit={handleAddCustomAmount} className="mb-4 flex gap-2">
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Enter amount in ml"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Add
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-2">
        {quickAddAmounts.map((amount) => (
          <div key={amount} className="relative group">
            <button
              onClick={() => handleQuickAdd(amount)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <PlusCircle size={20} />
              {amount}ml
            </button>
            <button
              onClick={() => removeQuickAmount(amount)}
              className="absolute -top-2 -right-2 hidden group-hover:flex bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};