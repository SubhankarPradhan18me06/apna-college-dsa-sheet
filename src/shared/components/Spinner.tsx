import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

const Spinner: React.FC<Props> = ({ className = '', size = 'md' }) => (
  <div
    className={`animate-spin rounded-full border-2 border-slate-200 dark:border-dark-700 border-t-brand-orange ${sizeMap[size]} ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
