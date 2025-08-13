import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import { Code, Users, Activity, TrendingUp, Key, Database, BarChart3, Settings, Lock } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const dataa = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 600, pv: 2200, amt: 2200}];

interface DeveloperStats {
  totalApps: number;
  activeUsers: number;
  apiRequests: number;
}

interface ActivityData {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
}

export default function DeveloperDashboard() {
  const current = JSON.parse(localStorage.getItem('current') || '{}');

  const [stats, setStats] = useState<DeveloperStats>({
  "totalApps": 0,
  "activeUsers": 0,
  "apiRequests":0
});
useEffect(() => {console.log(stats)}, [stats])
  const successRate = '100%'
  const [activities, setActivities] = useState<ActivityData[]>([]);

  useEffect(() => {
    fetchStats();
    // fetchActivities();
  }, []);
  
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/devDashboard', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({ "email" : current.email})
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
      const [data, setData] = useState([]);
  useEffect(() => {
          let fn = async () => {
            try {
            let response = await fetch('http://localhost:5000/devtActivityLogs', {
          method : 'POST',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify({ "email" : current.email})
        })
        if(response.ok) {
          let res = await response.json();
          console.log(res)
          setData(res);
        }
        
      } catch (error) {
        console.error('Error fetching connected apps:', error);
        
      }
          }
          fn();
          
        }, [])
  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const sidebarItems = [
    { icon: Activity, label: 'Dashboard', path: '/developer/dashboard' },
    { icon: Key, label: 'API Keys', path: '/developer/api-keys' },
    { icon: Settings, label: 'Settings', path: '/developer/settings' },
  ];
  localStorage.setItem('email', current);
   const [name, setName] = useState("");
    useEffect(() => {
      let fn = async () => {
        const response= await fetch('http://localhost:5000/getName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email" : current.email, "role" : current.role }),
      });
      if(response.ok) {
        let res = await response.json();
        setName(res.name);
        localStorage.setItem('name', res.name);
        console.log(localStorage.getItem('name'))
      }
      };
      fn();
    }, [])

useEffect(() => {console.log(current)}, [current])
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Keys"
            value={stats.totalApps}
            icon={Code}
            color="purple"
            trend="up"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            icon={Users}
            color="blue"
            trend="up"
          />
          <StatCard
            title="API Requests"
            value={`${stats.apiRequests}`}
            icon={Activity}
            color="green"
            trend="up"
          />
          <StatCard
            title="Success Rate"
            value={`${successRate}`}
            icon={TrendingUp}
            color="yellow"
            trend="up"
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {data.length > 0 ? (
              data.map((d) => (
                <div style = {{border : '1px solid rgba(0, 0, 0, 0.06)', boxShadow : '0 0 5px rgba(0,0,0,0.15)',marginBottom : '5px', display : 'flex', flexDirection : 'row', width : '90%', position : 'relative', justifyContent : 'space-around', alignItems : 'center'}} className="text-center py-12">
                  {/* {d.icon ? (<img style = {{width : '70px', aspectRatio : '1'}} src = {d.icon}/>) : ( <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />)} */}
                   <Lock style = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}} className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <div style={{width : '70%'}}>
                    <h1 style = {{fontWeight : '600', fontSize : '20px'}}>{d.userEmail}</h1>
                    <h2>{new Date(d.timestamp).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                      })}, {new Date(d.timestamp).toLocaleDateString('en-US', { 
    weekday: 'short',
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })}</h2>

                  </div>
                </div>
              ))
            ) : (
               <div className="text-center py-12">
              <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No connected apps</h3>
              <p className="text-gray-500">You haven't connected any third-party applications yet.</p>
            </div>
            )}
            </div>
          </div>

          {/* API Usage Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">API Usage</h2>
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                {/* <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p>API usage chart will be displayed here</p> */}
                 <LineChart style = {{marginTop : '100px'}} width={500} height={300} data={dataa}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}