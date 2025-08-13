import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/user/UserProfile';
import ConnectedApps from './pages/user/ConnectedApps';
import ActivityLogs from './pages/user/ActivityLogs';
import Security from './pages/user/Security';
import Notifications from './pages/user/Notifications';
import DeveloperApps from './pages/developer/DeveloperApps';
import APIKeys from './pages/developer/APIKeys';
import DataAccess from './pages/developer/DataAccess';
import Analytics from './pages/developer/Analytics';
import Settings from './pages/developer/Settings';
import UserProfileForm  from './pages/user/UserProfileForm';
import Component from './Component.tsx';
import Middleware from './Middleware.tsx';
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user ? (
        user.role === 'developer' ? <Navigate to="/developer/dashboard" /> : <Navigate to="/user/dashboard" />
      ) : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      
      {/* User Routes */}
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/profile" 
        element={
          <ProtectedRoute requiredRole="user">
            <UserProfileForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/connected-apps" 
        element={
          <ProtectedRoute requiredRole="user">
            <ConnectedApps />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/activity-logs" 
        element={
          <ProtectedRoute requiredRole="user">
            <ActivityLogs />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/upf" 
        element={
          <ProtectedRoute requiredRole="user">
            <UserProfileForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/security" 
        element={
          <ProtectedRoute requiredRole="user">
            <Security />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/notifications" 
        element={
          <ProtectedRoute requiredRole="user">
            <Notifications />
          </ProtectedRoute>
        } 
      />

      {/* Developer Routes */}
      <Route 
        path="/developer/dashboard" 
        element={
          <ProtectedRoute requiredRole="developer">
            <DeveloperDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer/apps" 
        element={
          <ProtectedRoute requiredRole="developer">
            <DeveloperApps />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer/api-keys" 
        element={
          <ProtectedRoute requiredRole="developer">
            <APIKeys />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer/data-access" 
        element={
          <ProtectedRoute requiredRole="developer">
            <DataAccess />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer/analytics" 
        element={
          <ProtectedRoute requiredRole="developer">
            <Analytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer/settings" 
        element={
          <ProtectedRoute requiredRole="developer">
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route path = "/component" element = {<Component />}/>
      <Route path = "/middleware" element = {<Middleware apiKey={"YIbJN8iKWGgM"} />}/>

    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;