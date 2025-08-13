import React from 'react';
import { User, Clock } from 'lucide-react';

interface ActivityItemProps {
  message: string;
  timestamp: Date;
  type: string;
}

export default function ActivityItem({ message, timestamp, type }: ActivityItemProps) {
  const timeAgo = React.useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  }, [timestamp]);

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="h-4 w-4 text-purple-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{message}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}