import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Code, Users, Activity, Key, Database, BarChart3, Settings, Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid'

function toLabel(field: string): string {
  switch(field) {
    case "profilePhoto": return "Profile Photo";
    case "email": return "Email";
    case "name": return "Name";
    case "phoneNumber": return "Phone Number";
    case "physicalAddress": return "Physical Address";
    case "mailingAddress": return "Mailing Address";
    case "dateOfBirth": return "Date of Birth";
    case "gender": return "Gender";
    case "businessName": return "Business Name";
    case "businessEmail": return "Business Email";
    case "businessPhoneNumber": return "Business Phone Number";
    case "numberOfEmployees": return "Number Of Employees";
    case "dateOfFoundation": return "Date of Foundation";
  
  }
  return "";
}


export default function APIKeys() {
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<{[key: string]: boolean}>({});
  const [permBg1, setPermBg1] = useState('rgba(0, 0, 0, 0.1)');
 const [permBg2, setPermBg2] = useState('rgba(0, 0, 0, 0.1)');
  const [permBg3,setPermBg3] = useState('rgba(0, 0, 0, 0.1)');

  const [permViz1, setPermViz1 ] = useState(false)
  const [permViz2, setPermViz2 ] = useState(false)
  const [permViz3, setPermViz3 ] = useState(false)

  const[apiName, setApiName] = useState("")

  const [perms1, setPerms1] = useState<string[]>([]);
  const [perms2, setPerms2] = useState<string[]>([]);
  const [perms3, setPerms3] = useState<string[]>([]);

  useEffect(() => {console.log(perms1)}, [perms1]);
  useEffect(() => {console.log(perms2)}, [perms2]);

  useEffect(() => {console.log(perms3)}, [perms3]);
  useEffect(() => {console.log(apiName)}, [apiName])
 

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: Settings, label: 'Settings', path: '/developer/settings' },
  ];
  const current = JSON.parse(localStorage.getItem('current') || '{}');

  const [apiKeys, setApiKeys] = useState<any>([]);

  useEffect(() => {
  const fetchKeys = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApiKeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: current.email })
      });

      const res = await response.json();
      const keys = Array.isArray(res.user) ? res.user : [res.user];

      console.log("Fetched keys:", keys);
      setApiKeys(keys);
    } catch (error) {
      console.error("Failed to fetch API keys:", error);
    }
  };

  fetchKeys();
}, []);

  // useEffect(() => {console.log(apiKeys)}, [apiKeys])

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const maskKey = (key: string) => {
    return key.substring(0, 1) + '••••••';
  };

  return (
    <DashboardLayout  sidebarItems={sidebarItems}>
      <div style = {{overflow : 'hidden'}} className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
            <p className="text-gray-600 mt-2">Manage your API keys and access permissions</p>
          </div>
          <button
            onClick={() => setShowCreateKey(true)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create API Key</span>
          </button>
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Key className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{apiKey.name}</h3>
                    <div className="flex items-center space-x-2">
                      
                      <span className="text-sm text-gray-500">
                        Created {apiKey.date.substring(0,10)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* API Key */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm">
                    {visibleKeys[i] ? apiKey.key : maskKey(apiKey.key)}
                  </div>
                  <button
                    onClick={() => toggleKeyVisibility(i.toString())}
                    className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {visibleKeys[i] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {apiKey.permissions.basic.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                  {apiKey.permissions.personal.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                  {apiKey.permissions.business.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {/* Usage Info */}
              
            </div>
          ))}
        </div>

        {/* Create API Key Modal */}
        {showCreateKey && (
          <div style = {{margin : '0'}} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2  className="text-xl font-semibold text-gray-900 mb-4">Create API Key</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                  <input
                    type="text" value = {apiName} onChange={(e) => {setApiName(e.target.value)}}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter a descriptive name"
                  />
                </div>
                
              
                
                <div>
                  <label onClick={() => {setPermViz1(!permViz1)}} onMouseEnter={() => {setPermBg1('rgba(0,0,0,0.2)')}} onMouseLeave={() => {setPermBg1('rgba(0,0,0,0.1)')}}  className="block text-sm font-medium text-gray-700 mb-2" style = {{width : 'fit-content', borderRadius : '5px', backgroundColor : permBg1, padding : '5px 10px'}}>Basic Permissions</label>
                  <div style = {{display : permViz1 ? 'block' : 'none'}} className="space-y-2">
                    {['profilePhoto', 'email', 'name'].map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input onChange = {(e) => {if(perms1.includes(permission)) {setPerms1((arr) => arr.filter((p) => p !== permission));} else {setPerms1((arr) => [...arr, permission]);}}} type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <span className="ml-2 text-sm text-gray-700">{toLabel(permission)}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label onClick={() => {setPermViz2(!permViz2)}}  onMouseEnter={() => {setPermBg2('rgba(0,0,0,0.2)')}} onMouseLeave={() => {setPermBg2('rgba(0,0,0,0.1)')}}  className="block text-sm font-medium text-gray-700 mb-2" style = {{width : 'fit-content', borderRadius : '5px', backgroundColor : permBg2, padding : '5px 10px'}}>Personal Info</label>
                  <div style = {{display : permViz2 ? 'block' : 'none'}} className="space-y-2">
                    {['phoneNumber', 'physicalAddress', 'mailingAddress', 'dateOfBirth', 'gender'].map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input onChange = {(e) => {if(perms2.includes(permission)) {setPerms2((arr) => arr.filter((p) => p !== permission));} else {setPerms2((arr) => [...arr, permission]);}}}  type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <span className="ml-2 text-sm text-gray-700">{toLabel(permission)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label onClick={() => {setPermViz3(!permViz3)}}  onMouseEnter={() => {setPermBg3('rgba(0,0,0,0.2)')}} onMouseLeave={() => {setPermBg3('rgba(0,0,0,0.1)')}}  className="block text-sm font-medium text-gray-700 mb-2" style = {{width : 'fit-content', borderRadius : '5px', backgroundColor : permBg3, padding : '5px 10px'}}>Business Info</label>
                  <div style = {{display : permViz3 ? 'block' : 'none'}} className="space-y-2">
                    {['businessName', 'businessEmail', 'businessPhoneNumber', 'numberOfEmployees', 'dateOfFoundation'].map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input onChange = {(e) => {if(perms3.includes(permission)) {setPerms3((arr) => arr.filter((p) => p !== permission));} else {setPerms3((arr) => [...arr, permission]);}}}  type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <span className="ml-2 text-sm text-gray-700">{toLabel(permission)}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl shadow-sm">
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">
      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
        <input 
          type='checkbox' 
          className='rounded border-red-300 text-red-600 focus:ring-red-500 focus:ring-2' 
        />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-bold text-red-800">Important Privacy Agreement</span>
      </div>
      <p className="text-sm text-red-700 leading-relaxed">
        <strong>I agree to delete User Data with just One Revocation Click!</strong>
      </p>
      <p className="text-xs text-red-600 mt-2 italic">
        This ensures users maintain complete control over their personal data at all times.
      </p>
    </div>
  </div>
  
  {/* Pulsing indicator for extra attention */}
  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
</div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateKey(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick = {async () => {
                      let bodyy = {"email" : current.email, "name" : apiName, "key" : nanoid(12), "permissions" : {"basic" : perms1, "personal" : perms2, "business" : perms3}, "date" : new Date().toISOString()};
                      console.log(bodyy);
                      // alert('test')
                      await fetch('http://localhost:5000/createApiKey', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json'},
                                body : JSON.stringify(bodyy)
                              });
                                
                      window.location.reload()}}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Create Key
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