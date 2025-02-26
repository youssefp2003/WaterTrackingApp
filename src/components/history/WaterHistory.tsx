import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useWaterStore } from '../../store/waterStore';
import { DayLogItem } from './DayLogItem';
import { useAuth } from '../../contexts/AuthContext';

interface WaterHistoryProps {
  onClose: () => void;
}

interface DayData {
  date: string;
  total: number;
  logs: { time: string; amount: number }[];
}

export const WaterHistory: React.FC<WaterHistoryProps> = ({ onClose }) => {
  const { getWeeklyData, dailyGoal } = useWaterStore();
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const maxValue = Math.max(...weeklyData.map((d) => d.total), dailyGoal);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getWeeklyData(user.id);
        setWeeklyData(data);
      }
    };
    fetchData();
  }, [getWeeklyData, user?.id]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl relative my-8">
        <div className="sticky top-0 z-10 flex justify-between items-center bg-white pb-4 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Water History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="space-y-4 mt-4 max-h-[70vh] overflow-y-auto">
          {weeklyData.map((day) => (
            <DayLogItem
              key={day.date}
              {...day}
              dailyGoal={dailyGoal}
              maxValue={maxValue}
              isExpanded={expandedDay === day.date}
              onToggle={() => setExpandedDay(expandedDay === day.date ? null : day.date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};