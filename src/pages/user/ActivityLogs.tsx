import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, User, Activity, Bell, Lock, Clock, Search, MapPin, Monitor, Smartphone, AlertTriangle } from 'lucide-react';
interface final {
  id : string; //done
  name : string; //done
  purpose : string; //done
  icon : string; //done

  userEmail : string;
  devEmail : string; 

  privacyPolicyUrl: string; //done
  dataCategories: string[]; //donee
  permissions: {
    name: string;
    status: 'Granted' | 'Denied';        //done
  }[];
  

  timestamp : string;
  country : string;                  //done
  ip_address: string;                  //done
  browser: string;                  //done
  device_type: string;                  //done
  operating_system: string;                  //done
  successful: boolean;             //done
  risk_level : string;             //done
  location: {                  //done
    city: string;
    state: string | null;
    country_code: string;
  };
  
  app_color: string;


  accessFrequency : string;
}
interface ActivityLog {
   id : string; //done
  name : string; //done
  purpose : string; //done
  icon : string; //done

  userEmail : string;
  devEmail : string; 

  privacyPolicyUrl: string; //done
  dataCategories: string[]; //donee
  permissions: {
    name: string;
    status: 'Granted' | 'Denied';        //done
  }[];
  

  timestamp : string;
  country : string;                  //done
  ip_address: string;                  //done
  browser: string;                  //done
  device_type: string;                  //done
  operating_system: string;                  //done
  successful: boolean;             //done
  risk_level : string;             //done
  location: {                  //done
    city: string;
    state: string | null;
    country_code: string;
  };
  
  app_color: string;


  accessFrequency : string;
}

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState([]);

  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    app: 'all',
    status: 'all',
    risk: 'all',
  });

  const [data, setData] = useState([]);

  const current = JSON.parse(localStorage.getItem('current') || '{}')
  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/user/dashboard' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Shield, label: 'Connected Apps', path: '/user/connected-apps' },
    { icon: Clock, label: 'Activity Logs', path: '/user/activity-logs' },
    { icon: Lock, label: 'Security', path: '/user/security' },
    { icon: Bell, label: 'Notifications', path: '/user/notifications' },
  ];

  useEffect(() => {
    setFilteredLogs(logs);
    setIsLoading(false);

    
  }, [logs]);
  useEffect(() => {

    let fn = async () => {
      let response = await fetch('http://localhost:5000/getActivityLogs', {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({ "email" : current.email})
      })
      if(response.ok) {
        let res = await response.json();
        console.log(res)
        setLogs(res);
      }}
      fn();
  }, [])
  useEffect(() => {
    if (!logs) return; // Guard against logs being null
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Add null checks and optional chaining to prevent undefined.toLowerCase() errors
    const filtered = logs.filter(log => {
      // Check if the property exists before trying to use toLowerCase()
      const nameMatch = log?.name ? log.name.toLowerCase().includes(searchTermLower) : false;
      const purposeMatch = log?.purpose ? log.purpose.toLowerCase().includes(searchTermLower) : false;
      const countryMatch = log?.country ? log.country.toLowerCase().includes(searchTermLower) : false;
      const ipMatch = log?.ip_address ? log.ip_address.toLowerCase().includes(searchTermLower) : false;
      const browserMatch = log?.browser ? log.browser.toLowerCase().includes(searchTermLower) : false;
      
      return nameMatch || purposeMatch || countryMatch || ipMatch || browserMatch;
    });
    
    setFilteredLogs(filtered);
  }, [searchTerm, logs, filterOptions]);

  if (isLoading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="ml-4 text-gray-600">Loading activity logs...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-2">Track all data access events from connected applications</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((logs.filter(log => log.successful).length / logs.length) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Risk Events</p>
                <p className="text-2xl font-bold text-gray-900">{logs.filter(log => log.risk_level === 'High').length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Countries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(logs.map(log => log.country)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by app name, purpose, location, IP, browser..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="app-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Application
              </label>
              <select
                id="app-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={filterOptions.app}
                onChange={(e) => setFilterOptions({...filterOptions, app: e.target.value})}
              >
                <option value="all">All Applications</option>
                <option value="atlassian">Atlassian</option>
                <option value="geeksforgeeks">GeeksForGeeks</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={filterOptions.status}
                onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="success">Successful</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <select
                id="risk-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={filterOptions.risk}
                onChange={(e) => setFilterOptions({...filterOptions, risk: e.target.value})}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No Activity Logs</h3>
            <p className="mt-2 text-gray-600">
              There are no recorded data access events yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 border-l-4" 
                style={{ borderLeftColor: log.app_color || '#3182ce' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                      {log.icon ? (
                        <img 
                          src={log.icon} 
                          alt={`${log.name} logo`}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                      <div className="w-full h-full bg-purple-100 flex items-center justify-center hidden">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="text-lg font-medium text-gray-900">{log.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.risk_level === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : log.risk_level === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {log.risk_level} Risk
                        </span>
                        
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.successful 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.successful ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 font-medium">
                        {log.purpose}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(log.timestamp).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {log.location?.city ? `${log.location.city}, ` : ''}
                        {log.location?.state ? `${log.location.state}, ` : ''}
                        {log.country}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 font-medium">IP:</span>
                      <span className="text-sm text-gray-700 ml-2">{log.ip_address}</span>
                    </div>
                    
                    {log.device_type && (
                      <div className="flex items-center">
                        {log.device_type === 'Mobile' ? 
                          <Smartphone size={14} className="mr-1 text-gray-500" /> :
                          <Monitor size={14} className="mr-1 text-gray-500" />
                        }
                        <span className="text-sm text-gray-700">{log.device_type}</span>
                      </div>
                    )}
                    
                    {log.browser && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 font-medium">Browser:</span>
                        <span className="text-sm text-gray-700 ml-2">{log.browser}</span>
                      </div>
                    )}
                    
                    {log.operating_system && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700 font-medium">OS:</span>
                        <span className="text-sm text-gray-700 ml-2">{log.operating_system}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Data Fields Accessed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {log.dataCategories.map((field: string, index: number) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${log.app_color}22` || '#3182ce22',
                          color: log.app_color || '#3182ce' 
                        }}
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActivityLogs;







// import React, { useState } from 'react';
// import DashboardLayout from '../../components/DashboardLayout';
// import { Shield, User, Activity, Bell, Lock, Clock, Filter, Download, Search } from 'lucide-react';

// export default function ActivityLogs() {
//   const [filterType, setFilterType] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const sidebarItems = [
//     { icon: Activity, label: 'Dashboard', path: '/user/dashboard' },
//     { icon: User, label: 'Profile', path: '/user/profile' },
//     { icon: Shield, label: 'Connected Apps', path: '/user/connected-apps' },
//     { icon: Clock, label: 'Activity Logs', path: '/user/activity-logs' },
//     { icon: Lock, label: 'Security', path: '/user/security' },
//     { icon: Bell, label: 'Notifications', path: '/user/notifications' },
//   ];

//   const activities = [
//     {
//       id: 1,
//       type: 'login',
//       description: 'Successful login from Chrome on Windows',
//       timestamp: new Date(Date.now() - 30 * 60 * 1000),
//       ip: '192.168.1.100',
//       location: 'San Francisco, CA'
//     },
//     {
//       id: 2,
//       type: 'data_access',
//       description: 'PhotoShare Pro accessed your profile information',
//       timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
//       app: 'PhotoShare Pro'
//     },
//     {
//       id: 3,
//       type: 'permission_granted',
//       description: 'Granted photo access permission to PhotoShare Pro',
//       timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
//       app: 'PhotoShare Pro'
//     },
//     {
//       id: 4,
//       type: 'login',
//       description: 'Successful login from Safari on iPhone',
//       timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//       ip: '10.0.0.50',
//       location: 'San Francisco, CA'
//     }
//   ];

//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case 'login':
//         return <Lock className="h-4 w-4 text-green-600" />;
//       case 'data_access':
//         return <Activity className="h-4 w-4 text-blue-600" />;
//       case 'permission_granted':
//         return <Shield className="h-4 w-4 text-purple-600" />;
//       default:
//         return <Clock className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const formatTimestamp = (timestamp: Date) => {
//     const now = new Date();
//     const diff = now.getTime() - timestamp.getTime();
//     const minutes = Math.floor(diff / (1000 * 60));
    
//     if (minutes < 60) return `${minutes} minutes ago`;
//     if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
//     return `${Math.floor(minutes / 1440)} days ago`;
//   };

//   return (
//     <DashboardLayout sidebarItems={sidebarItems}>
//       <div className="space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
//             <p className="text-gray-600 mt-2">Monitor all activities related to your account</p>
//           </div>
//           <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
//             <Download className="h-4 w-4" />
//             <span>Export Logs</span>
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search activities..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Filter className="h-4 w-4 text-gray-400" />
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="all">All Activities</option>
//                 <option value="login">Login Events</option>
//                 <option value="data_access">Data Access</option>
//                 <option value="permission_granted">Permissions</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Activity List */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {activities.map((activity) => (
//               <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     {getActivityIcon(activity.type)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900">{activity.description}</p>
//                     <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
//                       <span>{formatTimestamp(activity.timestamp)}</span>
//                       {activity.ip && <span>IP: {activity.ip}</span>}
//                       {activity.location && <span>{activity.location}</span>}
//                       {activity.app && <span>App: {activity.app}</span>}
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     {activity.timestamp.toLocaleString()}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }