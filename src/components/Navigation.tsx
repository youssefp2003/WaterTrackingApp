import React from 'react';
import { Home, History, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-lg mx-auto flex justify-around">
        <button
          onClick={() => onNavigate('today')}
          className={`flex flex-col items-center p-2 ${
            currentPage === 'today' ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Today</span>
        </button>
        <button
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center p-2 ${
            currentPage === 'history' ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          <History size={24} />
          <span className="text-xs mt-1">History</span>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center p-2 ${
            currentPage === 'settings' ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  );
};