import React, { useState } from 'react';
import { PlusCircle, Plus, X } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';
import { useAuth } from '../contexts/AuthContext';

export const QuickAdd: React.FC = () => {
  const { user } = useAuth();
  const { quickAddAmounts, addWaterLog, addQuickAmount, removeQuickAmount } = useWaterStore();
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newAmount, setNewAmount] = useState('');
<<<<<<< HEAD
=======
  const [instantAmount, setInstantAmount] = useState('');
>>>>>>> 242ed06 (bar fix)

  const handleAddCustomAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(newAmount);
    if (amount > 0) {
      addQuickAmount(amount);
      setNewAmount('');
      setShowAddCustom(false);
    }
  };

<<<<<<< HEAD
=======
  const handleInstantAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(instantAmount);
    if (amount > 0 && user) {
      addWaterLog(amount, user.id);
      setInstantAmount('');
    }
  };

>>>>>>> 242ed06 (bar fix)
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
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Quick Add</h2>
        <button
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium"
        >
          <Plus size={18} />
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
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
      )}

<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-2">
=======
      <div className="grid grid-cols-3 gap-2 mb-4">
>>>>>>> 242ed06 (bar fix)
        {quickAddAmounts.map((amount) => (
          <div key={amount} className="relative group">
            <button
              onClick={() => handleQuickAdd(amount)}
              className="w-full flex items-center justify-center gap-1.5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium"
            >
              <PlusCircle size={16} />
              {amount}ml
            </button>
            <button
              onClick={() => removeQuickAmount(amount)}
              className="absolute -top-1 -right-1 hidden group-hover:flex bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
<<<<<<< HEAD
=======

      <form onSubmit={handleInstantAdd} className="flex gap-2">
        <input
          type="number"
          value={instantAmount}
          onChange={(e) => setInstantAmount(e.target.value)}
          placeholder="Enter custom amount in ml"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!instantAmount || parseInt(instantAmount) <= 0}
        >
          Add
        </button>
      </form>
>>>>>>> 242ed06 (bar fix)
    </div>
  );
};