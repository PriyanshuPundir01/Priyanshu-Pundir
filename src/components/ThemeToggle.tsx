import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Original Dark Mode' : 'Alternate Light Mode'} — Click to toggle`}
      className={`group relative inline-flex items-center gap-1 p-1 rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? 'bg-[#14171F]/90 border-white/15 text-[#D7E2EA] hover:border-white/30 shadow-[0_0_15px_rgba(0,210,255,0.12)]'
          : 'bg-slate-200/90 border-slate-300 text-slate-800 hover:border-slate-400 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      {/* Dark Option */}
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-300 ${
          isDark
            ? 'bg-[#00D2FF]/15 text-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.35)]'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-[#00D2FF]' : 'text-slate-400'}`} />
        <span className="hidden sm:inline">DARK</span>
      </div>

      {/* Light Option */}
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-300 ${
          !isDark
            ? 'bg-amber-500/20 text-amber-700 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-600' : 'text-slate-500'}`} />
        <span className="hidden sm:inline">LIGHT</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
