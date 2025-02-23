import React, { useEffect, useState } from 'react';
import { useWaterStore } from '../../store/waterStore';
import { useAuth } from '../../contexts/AuthContext';
import { DayLogItem } from '../history/DayLogItem';

export const HistoryPage: React.FC = () => {
  const { getWeeklyData, dailyGoal } = useWaterStore();
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
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

  return (
    <div className="max-w-lg mx-auto px-4 py-6 mb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-gray-500 mt-1">Track your hydration journey</p>
      </div>
      
      <div className="space-y-3">
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
  );
};