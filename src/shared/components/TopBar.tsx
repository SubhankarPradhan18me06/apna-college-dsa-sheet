import React from 'react';
import ThemeToggle from './ThemeToggle';

interface Props {
  children: React.ReactNode;
}

const TopBar: React.FC<Props> = ({ children }) => (
  <header className="h-14 bg-bg-card/80 backdrop-blur border-b border-surface-border flex items-center justify-between px-6 sticky top-0 z-20 transition-colors duration-300">
    {children}
  </header>
);

export const TopBarSearch: React.FC = () => {
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [loopNum, setLoopNum] = React.useState(0);
  const [typingSpeed, setTypingSpeed] = React.useState(150);

  const phrases = [
    'Crack the code, land the offer...',
    'Your dream job is one problem away...',
    'Search algorithms...',
    'Find Dynamic Programming...',
  ];

  React.useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
      <input
        type="text"
        placeholder={displayText}
        className="bg-bg-alt border border-slate-200 dark:border-surface-border rounded-full pl-9 pr-4 py-1.5 text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-brand-orange w-64 transition-all"
      />
    </div>
  );
};

export const TopBarActions: React.FC = () => (
  <div className="flex items-center gap-4 text-black dark:text-primary">
    <ThemeToggle />
    <button className="hover:text-brand-orange transition-colors text-lg filter grayscale dark:grayscale-0" title="Notifications">🔔</button>
    <button className="hover:text-brand-orange transition-colors text-lg filter grayscale dark:grayscale-0" title="Settings">⚙️</button>
    <button className="hover:text-brand-orange transition-colors text-lg filter grayscale dark:grayscale-0" title="Profile">👤</button>
  </div>
);

export default TopBar;
