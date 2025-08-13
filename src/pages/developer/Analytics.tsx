import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Code, Users, Activity, Key, Database, BarChart3, Settings, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: BarChart3, label: 'Analytics', path: '/developer/analytics' },
    { icon: Settings, label: 'Settings', path: '/developer/settings' },
  ];

  const metrics = [
    {
      title: 'API Requests',
      value: '45.2k',
      change: '+12%',
      trend: 'up',
      description: 'Total API calls this period'
    },
    {
      title: 'Active Users',
      value: '2,451',
      change: '+8%',
      trend: 'up',
      description: 'Unique users accessing your apps'
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      description: 'Successful API responses'
    },
    {
      title: 'Avg Response Time',
      value: '245ms',
      change: '-15ms',
      trend: 'up',
      description: 'Average API response time'
    }
  ];

  const topApps = [
    { name: 'PhotoShare Pro', requests: 28500, users: 1250, growth: '+15%' },
    { name: 'TaskManager', requests: 12300, users: 890, growth: '+8%' },
    { name: 'DataViz Dashboard', requests: 4400, users: 311, growth: '+22%' }
  ];

  const recentActivity = [
    { time: '2 min ago', event: 'High API usage detected for PhotoShare Pro' },
    { time: '15 min ago', event: 'New user registered via TaskManager' },
    { time: '1 hour ago', event: 'API key regenerated for DataViz Dashboard' },
    { time: '3 hours ago', event: 'Successful deployment of PhotoShare Pro v2.1' }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Monitor performance and usage across your applications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-xs text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Usage Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">API Usage Trends</h2>
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p>API usage chart visualization</p>
                <p className="text-sm text-gray-400 mt-2">Chart would show request volume over time</p>
              </div>
            </div>
          </div>

          {/* Top Applications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Applications</h2>
            <div className="space-y-4">
              {topApps.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Code className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-600">
                        {app.requests.toLocaleString()} requests • {app.users} users
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{app.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Growth</h2>
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p>User growth chart visualization</p>
                <p className="text-sm text-gray-400 mt-2">Chart would show user acquisition over time</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">99.9%</h3>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">245ms</h3>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">1.2TB</h3>
              <p className="text-sm text-gray-600">Data Processed</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}