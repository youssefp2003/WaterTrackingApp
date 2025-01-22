import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWaterStore } from '../store/waterStore';
import { Header } from './dashboard/Header';
import { WaterProgress } from './WaterProgress';
import { QuickAdd } from './QuickAdd';
import { TodayLogs } from './TodayLogs';
import { WaterHistory } from './history/WaterHistory';
import { SettingsModal } from './SettingsModal';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { fetchUserLogs } = useWaterStore();

  useEffect(() => {
    if (user?.id) {
      fetchUserLogs(user.id);
    }
  }, [user?.id, fetchUserLogs]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        username={user.username}
        onHistoryClick={() => setShowHistory(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLogout={logout}
      />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <WaterProgress />
        <QuickAdd />
        <TodayLogs />
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHistory && <WaterHistory onClose={() => setShowHistory(false)} />}
    </div>
  );
}