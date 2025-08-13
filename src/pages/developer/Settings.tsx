import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Code, Users, Activity, Key, Database, BarChart3, Settings as SettingsIcon, Save, Edit, Bell, Shield, Globe, Camera } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const[name, setName] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState(null);
  const current = JSON.parse(localStorage.getItem('current') || '{}')
  const email = current.email;

  useEffect(() => {
    let fn = async () => {
      let response = await fetch('http://localhost:5000/getDevInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if(response.ok) {
        let res = await response.json();
        setName(res.name);
        setDescription(res.description);
        setWebsite(res.website);
        setImage(res.image);
        setPrivacyPolicy(res.privacyPolicy);
      }
    }
    fn();
  }, [])

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: SettingsIcon, label: 'Settings', path: '/developer/settings' },
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon }
  ];

    const click = useRef<HTMLInputElement>(null);

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }; 
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your developer account and application settings</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span onClick = { async () => {
              if(isEditing) { 
                await fetch('http://localhost:5000/saveDevInfo', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, name, description, website, image, privacyPolicy })
                });
              }
            }}>{isEditing ? 'Reflect Changes' : 'Edit Settings'}</span>
          </button>
        </div>

        <div style = {{display : 'flex', flexDirection : 'column'}} className="flex space-x-8">
          {/* Sidebar Tabs */}
          <div style = {{marginBottom : '20px'}} className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div style = {{margin : '0'}} className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">

                    {<div style = {{display : 'flex', flexDirection : 'row', gap : '0', justifyContent : 'flex-start', alignItems : 'self-start'}} onClick = {() => {console.log("hello"); click.current?.click()}}  className="relative inline-block">
                      <div className="w-32 h-32 rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center overflow-hidden">
                        {image !== null? (
                          <img src={image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-12 h-12 text-purple-400" />
                        )}
                      </div>
                      {isEditing && (
                        <label onClick = {() => {console.log("hello"); click.current?.click()}} className="absolute bottom-0 left-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700">
                          <Camera style = {{zIndex:'100'}} onClick = {() => {console.log("hello"); click.current?.click()}} className="w-4 h-4" />
                          <input
                            type="file" ref = {click}
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value = {name} onChange={(e) => {setName(e.target.value)}}
                          
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{name ? (name) : "Enter your company name"}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy</label>
                      {isEditing ? (
                        <input
                          type="email"
                           value = {privacyPolicy} onChange={(e) => {setPrivacyPolicy(e.target.value)}}
                         
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{privacyPolicy ? privacyPolicy : "Enter link to privacy policy document."}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                         value = {description} onChange={(e) => {setDescription(e.target.value)}}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="text-gray-900">{description ? description : "Enter company description"}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                           value = {website} onChange={(e) => {setWebsite(e.target.value)}}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900">{website? website : "Enter website link"}</p>
                      )}
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        Enabled
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">API Rate Limiting</h3>
                        <p className="text-sm text-gray-600">Protect your APIs from abuse</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Configure
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">IP Whitelisting</h3>
                        <p className="text-sm text-gray-600">Restrict API access to specific IP addresses</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Setup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'API Usage Alerts', description: 'Get notified when API usage exceeds thresholds' },
                        { label: 'Security Alerts', description: 'Important security-related notifications' },
                        { label: 'System Updates', description: 'Platform updates and maintenance notifications' },
                        { label: 'Billing Notifications', description: 'Payment and billing-related alerts' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">API Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default API Version</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>v2.1 (Latest)</option>
                      <option>v2.0</option>
                      <option>v1.9</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (requests per minute)</label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                    <input
                      type="url"
                      placeholder="https://your-app.com/webhooks/trustlens"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">CORS Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Origins</label>
                        <textarea
                          rows={3}
                          placeholder="https://yourapp.com&#10;https://staging.yourapp.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}