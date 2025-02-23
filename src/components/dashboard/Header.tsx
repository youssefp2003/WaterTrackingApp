import React from 'react';
<<<<<<< HEAD
import { Droplets, Settings, History as HistoryIcon, LogOut } from 'lucide-react';

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
=======
import { LogOut, Droplet } from 'lucide-react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
>>>>>>> 8be8f0c (pre-workign-notif)
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <Droplets className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold text-gray-900">HydroTracker</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onHistoryClick}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50"
              aria-label="History"
            >
              <HistoryIcon size={20} />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
=======
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
>>>>>>> 8be8f0c (pre-workign-notif)
        </div>
      </div>
    </header>
  );
};