import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/thunks/authThunks';
import { FileText, Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-md w-full">
        <div className="card p-4 sm:p-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-primary-100 p-2 sm:p-3 rounded-full">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Contract Manager</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-8 sm:pl-10 text-sm sm:text-base"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-8 sm:pl-10 text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-2.5"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Demo credentials: Any username, password: <span className="font-mono bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">test123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
