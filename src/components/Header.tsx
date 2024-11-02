import React from 'react';
import { Droplet, History, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Droplet className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">HydroTracker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={() => {}} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};