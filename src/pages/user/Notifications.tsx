import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, User, Activity, Bell, Lock, Clock, Mail, Smartphone, Settings as SettingsIcon } from 'lucide-react';

export default function Notifications() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    dataAccess: true,
    appUpdates: false,
    marketing: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    security: true,
    dataAccess: false,
    appUpdates: false
  });

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/user/dashboard' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Shield, label: 'Connected Apps', path: '/user/connected-apps' },
    { icon: Clock, label: 'Activity Logs', path: '/user/activity-logs' },
    { icon: Lock, label: 'Security', path: '/user/security' },
    { icon: Bell, label: 'Notifications', path: '/user/notifications' },
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'security',
      title: 'New login detected',
      message: 'Someone signed in to your account from Chrome on Windows',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'data_access',
      title: 'Data accessed by PhotoShare Pro',
      message: 'PhotoShare Pro accessed your profile information',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    },
    {
      id: 3,
      type: 'app_update',
      title: 'New app connected',
      message: 'TaskManager has been connected to your account',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Lock className="h-4 w-4 text-red-600" />;
      case 'data_access':
        return <Activity className="h-4 w-4 text-blue-600" />;
      case 'app_update':
        return <Shield className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes} minutes ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage your notification preferences and view recent alerts</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Notification Settings */}
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Email Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(emailNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {key === 'security' && 'Security Alerts'}
                        {key === 'dataAccess' && 'Data Access Notifications'}
                        {key === 'appUpdates' && 'App Updates'}
                        {key === 'marketing' && 'Marketing Communications'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'security' && 'Get notified about login attempts and security events'}
                        {key === 'dataAccess' && 'Alerts when apps access your data'}
                        {key === 'appUpdates' && 'Updates about connected applications'}
                        {key === 'marketing' && 'Product updates and promotional content'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setEmailNotifications({
                          ...emailNotifications,
                          [key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Push Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(pushNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {key === 'security' && 'Security Alerts'}
                        {key === 'dataAccess' && 'Data Access Notifications'}
                        {key === 'appUpdates' && 'App Updates'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'security' && 'Instant alerts for security events'}
                        {key === 'dataAccess' && 'Real-time data access notifications'}
                        {key === 'appUpdates' && 'Push notifications for app changes'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setPushNotifications({
                          ...pushNotifications,
                          [key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Notifications</h2>
            
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.read 
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-purple-200 bg-purple-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-purple-900'}`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-purple-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 text-center text-purple-600 hover:text-purple-700 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}