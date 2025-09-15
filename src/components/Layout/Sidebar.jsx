import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { 
  FileText, 
  BarChart3, 
  FileBarChart, 
  Settings, 
  X
} from 'lucide-react';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const menuItems = [
    { path: '/dashboard', label: 'Contracts', icon: FileText },
    { path: '/insights', label: 'Insights', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: FileBarChart },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 sm:w-72 lg:w-64 flex flex-col
      `}>
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
            <span className="text-base sm:text-lg font-semibold text-gray-900 truncate">Contract Manager</span>
          </div>
          <button
            onClick={() => dispatch(setSidebarOpen(false))}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
