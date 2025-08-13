import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Code, Users, Activity, Key, Database, BarChart3, Settings, Filter, Download, Search } from 'lucide-react';

export default function DataAccess() {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: Settings, label: 'Settings', path: '/developer/settings' },
  ];

  const dataAccessLogs = [
    {
      id: 1,
      app: 'PhotoShare Pro',
      user: 'john.doe@example.com',
      dataType: 'Profile Information',
      action: 'READ',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      app: 'PhotoShare Pro',
      user: 'jane.smith@example.com',
      dataType: 'Photo Gallery',
      action: 'READ',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success',
      ipAddress: '10.0.0.50'
    },
    {
      id: 3,
      app: 'TaskManager',
      user: 'bob.wilson@example.com',
      dataType: 'Calendar Events',
      action: 'WRITE',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'success',
      ipAddress: '172.16.0.25'
    },
    {
      id: 4,
      app: 'PhotoShare Pro',
      user: 'alice.brown@example.com',
      dataType: 'Profile Information',
      action: 'READ',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'failed',
      ipAddress: '203.0.113.10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'READ':
        return 'bg-blue-100 text-blue-800';
      case 'WRITE':
        return 'bg-purple-100 text-purple-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Access</h1>
            <p className="text-gray-600 mt-2">Monitor and audit data access across your applications</p>
          </div>
          <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">45,231</p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">99.2%</p>
            <p className="text-sm text-green-600 mt-1">+0.3% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Unique Users</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">2,451</p>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500">Failed Requests</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">362</p>
            <p className="text-sm text-red-600 mt-1">-5% from last month</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by user, app, or data type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Requests</option>
                <option value="success">Successful</option>
                <option value="failed">Failed</option>
                <option value="read">Read Operations</option>
                <option value="write">Write Operations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Access Logs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Access Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataAccessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Database className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{log.app}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.dataType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}