import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-bg-alt hover:bg-slate-200 dark:hover:bg-dark-700 transition-all duration-200 group"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <span className="text-xl group-hover:scale-110 block transition-transform">☀️</span>
      ) : (
        <span className="text-xl group-hover:scale-110 block transition-transform">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;
