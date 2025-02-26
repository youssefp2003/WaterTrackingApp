import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { useWaterStore } from '../store/waterStore';
import { format } from 'date-fns';

export const TodayLogs: React.FC = () => {
  const { logs, removeWaterLog, resetTodayLogs } = useWaterStore();
  
  const todayLogs = logs.filter(
    (log) =>
      new Date(log.timestamp).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Logs</h2>
      <div className="space-y-2">
        {todayLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div>
              <span className="font-medium text-gray-900">{log.amount}ml</span>
              <span className="text-sm text-gray-500 ml-2">
                {format(new Date(log.timestamp), 'HH:mm')}
              </span>
            </div>
            <button
              onClick={() => removeWaterLog(log.id)}
              className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {todayLogs.length === 0 && (
          <p className="text-center text-gray-500 py-4">No logs for today</p>
        )}
      </div>
      
      {todayLogs.length > 0 && (
        <button
          onClick={resetTodayLogs}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} />
          Reset Today's Intake
        </button>
      )}
    </div>
  );
};