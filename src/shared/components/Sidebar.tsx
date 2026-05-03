import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../../graphql/mutations';
import { useAuthStore } from '../../store/useAuthStore';
import { client } from '../../graphql/client';

const navItems = [
  { to: '/', label: 'Dashboard', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )},
  { to: '/topics', label: 'Topics', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )},
  { to: '/bookmarks', label: 'Bookmarks', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  )},
  { to: '/profile', label: 'Profile', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )},
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
    <aside className="fixed left-0 top-0 h-screen w-52 bg-bg-card border-r border-surface-border flex flex-col z-30 transition-colors duration-300">
      {/* Logo */}
      <div className="h-16 px-5 border-b border-surface-border flex flex-col justify-center">
        <h1 className="text-xl font-bold text-gradient leading-tight">Apna College</h1>
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
            <span className="w-5 flex items-center justify-center transition-colors">{item.icon}</span>
            <span className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-gray-400 group-hover:text-primary transition-colors">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-4 py-5 border-t border-surface-border mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-black text-base shadow-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-primary truncate leading-none mb-1">{user?.name || 'Student'}</p>
            <p className="text-[10px] text-secondary font-medium uppercase tracking-wider truncate">{user?.role || 'Student'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:text-brand-orange hover:bg-bg-alt transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
