import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Cloud } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      id="theme-toggle-btn"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center w-[62px] h-[32px] p-[3px] rounded-full border transition-colors duration-500 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] overflow-hidden ${
        isDark
          ? 'bg-[#0B0F19] border-cyan-500/30 shadow-[inset_0_2px_5px_rgba(0,0,0,0.7),0_0_15px_rgba(0,210,255,0.2)]'
          : 'bg-gradient-to-r from-sky-400 to-indigo-300 border-amber-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_0_15px_rgba(251,191,36,0.35)]'
      } ${className}`}
    >
      {/* Track Background Elements: Stars (Dark) / Cloud (Light) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Night Stars */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.6,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-start pl-2 gap-1"
        >
          <span className="w-1 h-1 rounded-full bg-cyan-200 animate-pulse" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-white opacity-80"
            style={{ animation: 'pulse 1.8s ease-in-out infinite 0.4s' }}
          />
          <span
            className="w-0.5 h-0.5 rounded-full bg-cyan-300"
            style={{ animation: 'pulse 2.2s ease-in-out infinite 0.8s' }}
          />
        </motion.div>

        {/* Day Cloud Puff */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.6 : 1,
            x: isDark ? 10 : 0,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-end pr-2"
        >
          <Cloud className="w-3.5 h-3.5 text-white/90 fill-white/80 drop-shadow-sm" />
        </motion.div>
      </div>

      {/* Sliding Animated Knob (Thumb) */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 32,
        }}
        animate={{
          x: isDark ? 30 : 0,
        }}
        className={`relative z-10 w-[24px] h-[24px] rounded-full flex items-center justify-center transition-colors duration-400 shadow-md ${
          isDark
            ? 'bg-gradient-to-tr from-[#0F172A] to-[#1E293B] border border-cyan-400/50 text-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.6)]'
            : 'bg-gradient-to-tr from-amber-400 to-yellow-200 border border-amber-200 text-amber-950 shadow-[0_0_12px_rgba(245,158,11,0.7)]'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-icon"
              initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <Moon className="w-3 h-3 text-[#00D2FF] drop-shadow-[0_0_4px_rgba(0,210,255,0.8)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <Sun className="w-3.5 h-3.5 text-amber-900 fill-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
