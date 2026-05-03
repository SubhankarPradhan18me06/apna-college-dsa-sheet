import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TopBar: React.FC<Props> = ({ children }) => (
  <header className="h-14 bg-dark-800/80 backdrop-blur border-b border-surface-border flex items-center justify-between px-6 sticky top-0 z-20">
    {children}
  </header>
);

export const TopBarSearch: React.FC = () => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
    <input
      type="text"
      placeholder="Search algorithms..."
      className="bg-dark-700 border border-surface-border rounded-full pl-9 pr-4 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-orange w-56 transition-colors"
    />
  </div>
);

export const TopBarActions: React.FC = () => (
  <div className="flex items-center gap-4 text-gray-400">
    <button className="hover:text-gray-100 transition-colors text-lg" title="Notifications">🔔</button>
    <button className="hover:text-gray-100 transition-colors text-lg" title="Settings">⚙️</button>
    <button className="hover:text-gray-100 transition-colors text-lg" title="Profile">👤</button>
  </div>
);

export default TopBar;
