import React from 'react';
import { Droplets, Settings, History as HistoryIcon } from 'lucide-react';

interface HeaderProps {
  username: string;
  onHistoryClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  username,
  onHistoryClick,
  onSettingsClick,
  onLogout,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" size={32} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">HydroTracker</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-sm sm:text-base text-gray-600">Hi, {username}</span>
            <button
              onClick={onHistoryClick}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            >
              <HistoryIcon size={20} />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};