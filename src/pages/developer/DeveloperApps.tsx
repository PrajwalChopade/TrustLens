import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Code, Users, Activity, Key, Database, BarChart3, Settings, Plus, ExternalLink, Edit, Trash2 } from 'lucide-react';

export default function DeveloperApps() {
  const [showCreateApp, setShowCreateApp] = useState(false);

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: Settings, label: 'Settings', path: '/developer/settings' },
  ];

  const apps = [
    {
      id: 1,
      name: 'PhotoShare Pro',
      description: 'Professional photo sharing and editing platform',
      status: 'active',
      users: 1250,
      apiCalls: 45200,
      created: '2024-01-15',
      lastUpdated: '2024-03-10'
    },
    {
      id: 2,
      name: 'TaskManager',
      description: 'Productivity and task management application',
      status: 'active',
      users: 890,
      apiCalls: 23100,
      created: '2024-02-20',
      lastUpdated: '2024-03-08'
    },
    {
      id: 3,
      name: 'DataViz Dashboard',
      description: 'Business intelligence and data visualization tool',
      status: 'development',
      users: 45,
      apiCalls: 1200,
      created: '2024-03-01',
      lastUpdated: '2024-03-12'
    }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-2">Manage your applications and their configurations</p>
          </div>
          <button
            onClick={() => setShowCreateApp(true)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create App</span>
          </button>
        </div>

        {/* Apps Grid */}
        <div className="grid gap-6">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{app.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : app.status === 'development'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{app.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Active Users</p>
                        <p className="text-lg font-semibold text-gray-900">{app.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">API Calls</p>
                        <p className="text-lg font-semibold text-gray-900">{app.apiCalls.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-sm text-gray-900">{new Date(app.created).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-sm text-gray-900">{new Date(app.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create App Modal */}
        {showCreateApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Application</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter app name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your application"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>Desktop Application</option>
                    <option>API Service</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateApp(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Create App
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}