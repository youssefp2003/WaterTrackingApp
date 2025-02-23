import React from 'react';
<<<<<<< HEAD
import { ChevronDown, ChevronUp } from 'lucide-react';
=======
import { ChevronDown, ChevronUp, Droplet } from 'lucide-react';
>>>>>>> 8be8f0c (pre-workign-notif)
import { format } from 'date-fns';

interface DayLogItemProps {
  date: string;
  total: number;
  logs: { time: string; amount: number }[];
  dailyGoal: number;
  maxValue: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DayLogItem: React.FC<DayLogItemProps> = ({
  date,
  total,
  logs,
  dailyGoal,
  maxValue,
  isExpanded,
  onToggle,
}) => {
<<<<<<< HEAD
  const height = (total / maxValue) * 100;
  const isToday = date === format(new Date(), 'EEE');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
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
            <div className="font-semibold text-gray-900">{date}</div>
            <div className="text-sm text-gray-600">
              {(total / 1000).toFixed(1)}L of {(dailyGoal / 1000).toFixed(1)}L
            </div>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-600">{log.time}</span>
              <span className="font-medium">{log.amount}ml</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              No logs for this day
            </p>
          )}
=======
  const progress = Math.min((total / dailyGoal) * 100, 100);
  const isToday = date === format(new Date(), 'EEE');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-50 rounded-full" />
            <div
              className="absolute bottom-0 w-full bg-blue-500 transition-all duration-300 rounded-b-full"
              style={{ height: `${progress}%`, opacity: isToday ? 1 : 0.5 }}
            />
            <Droplet
              size={20}
              className={isToday ? 'text-blue-500' : 'text-blue-300'}
            />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">{date}</div>
            <div className="text-sm text-gray-500">
              {(total / 1000).toFixed(1)}L / {(dailyGoal / 1000).toFixed(1)}L
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-gray-500">
            {Math.round(progress)}%
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-2 mt-2">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Droplet size={16} className="text-blue-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {log.amount}ml
                  </span>
                </div>
                <span className="text-sm text-gray-500">{log.time}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-3">
                No logs for this day
              </p>
            )}
          </div>
>>>>>>> 8be8f0c (pre-workign-notif)
        </div>
      )}
    </div>
  );
};