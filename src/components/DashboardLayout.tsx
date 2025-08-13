import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, LogOut, Bell } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
}

export default function DashboardLayout({ children, sidebarItems }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const current = JSON.parse(localStorage.getItem('current') || '{}')
  const location = useLocation();
  useEffect(() => {
      let fn = async () => {
        let response = await fetch('http://localhost:5000/getDevInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "email" : current.email })
        });
  
        if(response.ok) {
          let res = await response.json();
          localStorage.setItem('name', res.name);
          console.log(localStorage.getItem('name'))
        }
      }
      let fn2 = async () => {
      const response= await fetch('http://localhost:5000/userProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email" : current.email}),
    });
    console.log
    if(response.ok) {
      const res= await response.json();
      console.log(res.user.basic.name)
       localStorage.setItem('name', res.user.basic.name);
      localStorage.getItem('name')
    }
    }
    
      if(current.role == 'developer') {
        fn();
      }
      else {
        fn2();
        console.log("chalja")
      }
    }, [])
  return (
    // <div className="min-h-screen bg-gray-50 flex">
    <div className="bg-gray-50 flex">

      {/* Sidebar */}
  <div className="w-64 h-screen fixed top-0 left-0 bg-white shadow-sm border-r border-gray-200 flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">TrustLens</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-purple-600">
                {localStorage.getItem("pfp") ? ( <img src = {localStorage.getItem('pfp') || ""} style = {{borderRadius : '1000px', aspectRatio : '1'}} />) : <h2>{localStorage.getItem('name')?.charAt(0).toUpperCase()}</h2>}
               
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{localStorage.getItem('name')}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">

        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {user?.role === 'developer' ? 'Developer Portal' : 'User Portal'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {children}
        </main>
      </div>
    </div>
  );
}