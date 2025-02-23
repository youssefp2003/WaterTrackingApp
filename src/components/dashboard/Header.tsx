import React from 'react';
import { LogOut, Droplet } from 'lucide-react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900">HydroTracker</h1>
            <span className="text-sm text-gray-500">@{username}</span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};