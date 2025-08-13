import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, role);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
     
    }
  };

  // Demo credentials
  const demoCredentials = {
    user: { email: 'kananmarothi123@gmail.com', password: 'kanan1' },
    developer: { email: 'kananmarothi1230@gmail.com', password: 'kanan1' }
  };

  const fillDemoCredentials = (type: 'user' | 'developer') => {
    setEmail(demoCredentials[type].email);
    setPassword(demoCredentials[type].password);
    setRole(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
            <div className="flex justify-center">
            <Shield 
              className="h-12 w-12 text-purple-600 cursor-pointer hover:text-purple-700" 
              onClick={() => nav('/')} 
            />
            </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to TrustLens</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 mb-3 font-medium">Demo Credentials:</p>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user')}
                className="text-left text-xs text-blue-700 hover:text-blue-800 p-2 bg-blue-100 rounded"
              >
                <strong>User:</strong> {demoCredentials.user.email} / {demoCredentials.user.password}
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('developer')}
                className="text-left text-xs text-blue-700 hover:text-blue-800 p-2 bg-blue-100 rounded"
              >
                <strong>Developer:</strong> {demoCredentials.developer.email} / {demoCredentials.developer.password}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="user">User Account</option>
                <option value="developer">Developer Account</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}