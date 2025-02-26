import React from 'react';
import { User } from '../types';

interface AddWaterModalProps {
  user: User | null;
  customAmount: string;
  onClose: () => void;
  onAmountChange: (value: string) => void;
  onAdd: (amount: number) => void;
}

export const AddWaterModal: React.FC<AddWaterModalProps> = ({
  user,
  customAmount,
  onClose,
  onAmountChange,
  onAdd,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Water Intake</h2>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder={`Amount in ${user?.preferredUnit}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(Number(customAmount))}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={!customAmount || Number(customAmount) <= 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};