import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, User, Activity, Bell, Lock, Clock, Key, Smartphone, AlertTriangle, Check } from 'lucide-react';

export default function Security() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/user/dashboard' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Shield, label: 'Connected Apps', path: '/user/connected-apps' },
    { icon: Clock, label: 'Activity Logs', path: '/user/activity-logs' },
    { icon: Lock, label: 'Security', path: '/user/security' },
    { icon: Bell, label: 'Notifications', path: '/user/notifications' },
  ];

  const securityItems = [
    {
      title: 'Password',
      description: 'Last changed 3 months ago',
      status: 'warning',
      action: 'Change Password'
    },
    {
      title: 'Two-Factor Authentication',
      description: twoFactorEnabled ? 'Enabled via SMS' : 'Not enabled',
      status: twoFactorEnabled ? 'success' : 'danger',
      action: twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'
    },
    {
      title: 'Login Notifications',
      description: 'Get notified of new sign-ins',
      status: 'success',
      action: 'Configure'
    }
  ];

  const recentSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: '30 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '10.0.0.50',
      lastActive: '2 days ago',
      current: false
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security</h1>
          <p className="text-gray-600 mt-2">Manage your account security settings and active sessions</p>
        </div>

        {/* Security Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Overview</h2>
          <div className="space-y-4">
            {securityItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'success' ? 'bg-green-100' :
                    item.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'success' ? (
                      <Check className={`h-5 w-5 text-green-600`} />
                    ) : item.status === 'warning' ? (
                      <AlertTriangle className={`h-5 w-5 text-yellow-600`} />
                    ) : (
                      <AlertTriangle className={`h-5 w-5 text-red-600`} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (item.title === 'Two-Factor Authentication') {
                      setTwoFactorEnabled(!twoFactorEnabled);
                    } else if (item.title === 'Password') {
                      setShowChangePassword(!showChangePassword);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-600 hover:border-purple-700 rounded-lg transition-colors"
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password Form */}
        {showChangePassword && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Active Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Sessions</h2>
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {session.location} • {session.ip} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 hover:border-red-700 rounded transition-colors">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}