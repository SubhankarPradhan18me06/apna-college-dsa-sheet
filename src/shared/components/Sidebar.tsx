import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../graphql/mutations';
import { useAuthStore } from '../../store/useAuthStore';
import { client } from '../../graphql/client';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞' },
  { to: '/topics', label: 'Topics', icon: '▤' },
  { to: '/bookmarks', label: 'Bookmarks', icon: '🔖' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [logoutMutation] = useMutation(LOGOUT);

  const handleLogout = async () => {
    await logoutMutation();
    logout();
    client.clearStore();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 bg-dark-800 border-r border-surface-border flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-border">
        <h1 className="text-xl font-bold text-gradient">Apna College</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Technical Engine</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="text-lg w-5 text-center">{item.icon}</span>
            <span className="text-sm font-medium uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-100 truncate">{user?.name || 'Student'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.role || 'Student'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-gray-500 hover:text-brand-orange transition-colors text-lg"
          >
            ⎋
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
