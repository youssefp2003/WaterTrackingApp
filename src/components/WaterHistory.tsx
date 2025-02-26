import React, { useEffect, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';
import { format } from 'date-fns';

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
  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const maxValue = Math.max(...weeklyData.map((d) => d.total), dailyGoal);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeeklyData();
      setWeeklyData(data);
    };
    fetchData();
  }, [getWeeklyData]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Water History</h2>

        <div className="space-y-4">
          {weeklyData.map((day) => {
            const height = (day.total / maxValue) * 100;
            const isToday = day.date === format(new Date(), 'EEE');
            const isExpanded = expandedDay === day.date;
            
            return (
              <div
                key={day.date}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : day.date)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full" />
                      <div
                        className={`absolute bottom-0 w-full rounded-full ${
                          isToday ? 'bg-blue-500' : 'bg-blue-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{day.date}</div>
                      <div className="text-sm text-gray-600">
                        {(day.total / 1000).toFixed(1)}L of {(dailyGoal / 1000).toFixed(1)}L
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    {day.logs.map((log, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-600">{log.time}</span>
                        <span className="font-medium">{log.amount}ml</span>
                      </div>
                    ))}
                    {day.logs.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        No logs for this day
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};