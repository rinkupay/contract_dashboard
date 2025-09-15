import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar, setUploadModalOpen } from '../../store/slices/uiSlice';
import { 
  Menu, 
  Bell, 
  Upload, 
  User, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleUploadClick = () => {
    dispatch(setUploadModalOpen(true));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={handleUploadClick}
            className="btn-primary flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-2 sm:px-4 py-1.5 sm:py-2"
          >
            <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Upload</span>
          </button>

          <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 relative">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-md hover:bg-gray-100"
            >
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
              </div>
              <span className="hidden md:block text-xs sm:text-sm font-medium text-gray-700 truncate max-w-20 sm:max-w-none">
                {user?.username}
              </span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
