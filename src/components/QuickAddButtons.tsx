import React from 'react';
import { Droplet } from 'lucide-react';
import { User } from '../types';

interface QuickAddButtonsProps {
  user: User | null;
  onAdd: (amount: number) => void;
}

export const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({ user, onAdd }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      {user?.quickAddOptions.map((amount) => (
        <button
          key={amount}
          onClick={() => onAdd(amount)}
          className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:bg-blue-50 transition-colors"
        >
          <Droplet className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-gray-800 font-medium">
            {amount} {user.preferredUnit}
          </span>
        </button>
      ))}
    </div>
  );
};