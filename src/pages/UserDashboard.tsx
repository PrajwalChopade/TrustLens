import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { Shield, Check, Activity, Bell, Lock, Clock, User } from 'lucide-react';

interface UserStats {
  connectedApps: number;
  activeConsents: number;
  dataAccesses: number;
  // notifications: number;
}


export default function UserDashboard() {
    const current = JSON.parse(localStorage.getItem('current') || '{}');
    const [pfp, setPfp] = useState("");
 
  const [stats, setStats] = useState<UserStats>({
    connectedApps: 0,
    activeConsents: 0,
    dataAccesses: 0
  });
    const [data, setData] = useState([]);
      const [logs, setLogs] = useState([]);
    
      useEffect(() => {
        let fn = async () => {
          try {
          let response = await fetch('http://localhost:5000/getConApp', {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({ "email" : current.email})
      })
      if(response.ok) {
        let res = await response.json();
        console.log(res)
        setData(res);
        setStats((obj) => ({...obj, connectedApps : res.length}))
      }
      
    } catch (error) {
      console.error('Error fetching connected apps:', error);
      
    }
        }
        fn();
        
      }, [])

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
        setStats((obj) => ({...obj, activeConsents : res.length, dataAccesses : res.length}))

            }}
            fn();
        }, [])
        

  const [name, setName] = useState("");
 useEffect(() => {console.log(current)}, [current])

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
      localStorage.setItem('name', res.name)
      console.log(res)
      setName(res.name);
    }

    const response2 = await fetch('http://localhost:5000/userImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email" : current.email, "role" : current.role }),
    });

    if(response2.ok) {
      let res2 = await response2.json();
      setPfp(res2.photo);
       localStorage.setItem('pfp', res2.photo)
    }
  
    }
    fn();
  }, []);
  useEffect(() => {localStorage.setItem('name', name); localStorage.setItem('pfp', pfp)}, [name, pfp])
useEffect(() => {console.log(current)}, [current])
  
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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
    { icon: Activity, label: 'Dashboard', path: '/user/dashboard' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Shield, label: 'Connected Apps', path: '/user/connected-apps' },
    { icon: Clock, label: 'Activity Logs', path: '/user/activity-logs' },
    { icon: Lock, label: 'Security', path: '/user/security' }
    // { icon: Bell, label: 'Notifications', path: '/user/notifications' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Connected Apps"
            value={stats.connectedApps}
            icon={Shield}
            color="purple"
          />
          <StatCard
            title="Active Consents"
            value={stats.activeConsents}
            icon={Check}
            color="green"
          />
          <StatCard
            title="Data Accesses"
            value={stats.dataAccesses}
            icon={Activity}
            color="blue"
          />
          {/* <StatCard
            title="Notifications"
            value={stats.notifications}
            icon={Bell}
            color="yellow"
          /> */}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Connected Apps */}
          <div style = {{position : 'relative'}} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Apps</h2>
            {data.length > 0 ? (
              data.map((d) => (
                <div style = {{border : '1px solid rgba(0, 0, 0, 0.06)', boxShadow : '0 0 5px rgba(0,0,0,0.15)',marginBottom : '5px', display : 'flex', flexDirection : 'row', width : '90%', position : 'relative', justifyContent : 'space-around', alignItems : 'center'}} className="text-center py-12">
                  {d.icon ? (<img style = {{width : '70px', aspectRatio : '1'}} src = {d.icon}/>) : ( <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />)}
                  <div style={{width : '70%'}}>
                    <h1 style = {{fontWeight : '600', fontSize : '20px'}}>{d.name}</h1>
                    <h2>Description : {d.purpose}</h2>

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

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            {logs.length > 0 ? (
              logs.map((d) => (
                <div style = {{marginBottom : '5px', border : '1px solid rgba(0, 0, 0, 0.06)', boxShadow : '0 0 5px rgba(0,0,0,0.15)', display : 'flex', flexDirection : 'row', width : '90%', position : 'relative', justifyContent : 'space-around', alignItems : 'center'}} className="text-center py-12">
                  {d.icon ? (<img style = {{width : '70px', aspectRatio : '1'}} src = {d.icon}/>) : ( <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />)}
                  <div style={{width : '70%'}}>
                    <h1 style = {{fontWeight : '600', fontSize : '20px'}}>{d.name}</h1>
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
              <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-500">Your data hasn't been accessed recently.</p>
            </div>
            )}
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}