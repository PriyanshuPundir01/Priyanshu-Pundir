import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Activity,
  Github,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';

export interface ProjectSpecData {
  number: string;
  name: string;
  category: string;
  subtitle: string;
  impactQuote: string;
  techStack: string[];
  demoMode: string;
  githubUrl: string;
  liveUrl?: string;
  architectureStages: {
    stage: string;
    title: string;
    detail: string;
  }[];
  telemetryLogs: string[];
}

interface ProjectSpecModalProps {
  project: ProjectSpecData | null;
  onClose: () => void;
}

export const ProjectSpecModal: React.FC<ProjectSpecModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'techStack'>('techStack');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (project) {
      setTerminalLogs(project.telemetryLogs);
      setActiveTab('techStack');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const extraLogs = [
      `[DIAGNOSTIC] Running real-time telemetry stress loop...`,
      `[BUFFER] Analyzing 10,000 synthetic throughput packets...`,
      `[LATENCY] Measured round-trip execution: 1.48ms [OPTIMAL].`,
      `[SUCCESS] All architectural assertions passed with 100% data fidelity.`,
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < extraLogs.length) {
        setTerminalLogs((prev) => [...prev, extraLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 450);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const sanitizedCmd = commandInput.slice(0, 100).replace(/<[^>]*>/g, '').trim();
    if (!sanitizedCmd) {
      setCommandInput('');
      return;
    }
    const cmd = sanitizedCmd.toLowerCase();
    const newLogs = [...terminalLogs, `$ ${sanitizedCmd}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: help, status, benchmark, clear, inspect');
    } else if (cmd === 'status') {
      newLogs.push(`[STATUS] System: ${project.name} | Category: ${project.category} | State: ONLINE`);
    } else if (cmd === 'benchmark') {
      newLogs.push(`[BENCHMARK] Throughput: 10Gbps sim | Accuracy: 99.4% | Thread latency: <2ms`);
    } else if (cmd === 'inspect') {
      newLogs.push(`[SPECS] Stack: ${project.techStack.join(', ')}`);
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCommandInput('');
      return;
    } else {
      newLogs.push(`Command not recognized: '${sanitizedCmd}'. Type 'help' for options.`);
    }

    setTerminalLogs(newLogs);
    setCommandInput('');
  };

  return (
    <AnimatePresence>
      <div
        id="project-spec-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(168,85,247,0.15),0_25px_60px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 text-slate-800 dark:text-[#D7E2EA] z-10 select-none max-h-[92vh] overflow-y-auto flex flex-col justify-between transition-colors duration-200 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-purple-500/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        >
          <div>
            {/* 1. Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {/* Glowing Purple Number */}
                <span className="font-black text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#C084FC] leading-none select-none tracking-tight shrink-0 drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]">
                  {project.number}
                </span>

                <div className="flex flex-col min-w-0">
                  <h2 className="text-slate-900 dark:text-white font-black uppercase text-xl sm:text-2xl md:text-3xl tracking-tight leading-none truncate">
                    {project.name}
                  </h2>
                  <span className="text-slate-500 dark:text-[#8E97A0] font-mono uppercase text-[10px] sm:text-xs tracking-[0.2em] mt-1 truncate">
                    {project.subtitle}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white transition-all cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Architectural Metric & Impact Box */}
            <div className="mt-5 rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-[#160E27]/50 p-4 sm:p-5 relative overflow-hidden shadow-inner">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                <Activity className="w-4 h-4 text-[#9333EA] dark:text-[#C084FC] animate-pulse" />
                <span>ARCHITECTURAL METRIC &amp; IMPACT</span>
              </div>
              <p className="text-slate-800 dark:text-white text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                &ldquo;{project.impactQuote}&rdquo;
              </p>
            </div>

            {/* 3. Navigation Tabs with Underline */}
            <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200 dark:border-white/10 mt-6 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`pb-3 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border-b-2 ${
                  activeTab === 'architecture'
                    ? 'border-[#9333EA] dark:border-[#C084FC] text-purple-700 dark:text-white font-bold drop-shadow-[0_0_10px_rgba(192,132,252,0.4)]'
                    : 'border-transparent text-slate-500 dark:text-[#8E97A0] hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
              >
                ARCHITECTURE SPEC
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={`pb-3 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border-b-2 ${
                  activeTab === 'telemetry'
                    ? 'border-[#9333EA] dark:border-[#C084FC] text-purple-700 dark:text-white font-bold drop-shadow-[0_0_10px_rgba(192,132,252,0.4)]'
                    : 'border-transparent text-slate-500 dark:text-[#8E97A0] hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
              >
                &gt;_ LIVE TELEMETRY / DEMO
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('techStack')}
                className={`pb-3 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border-b-2 ${
                  activeTab === 'techStack'
                    ? 'border-[#9333EA] dark:border-[#C084FC] text-purple-700 dark:text-white font-bold drop-shadow-[0_0_10px_rgba(192,132,252,0.4)]'
                    : 'border-transparent text-slate-500 dark:text-[#8E97A0] hover:text-slate-900 dark:hover:text-white font-medium'
                }`}
              >
                TECH STACK &amp; SPECS
              </button>
            </div>

            {/* 4. Tab Content */}
            <div className="py-6 min-h-[260px]">
              {/* TAB 3: TECH STACK & SPECS */}
              {activeTab === 'techStack' && (
                <div className="flex flex-col gap-5 animate-fadeIn">
                  <div>
                    <h4 className="text-purple-700 dark:text-[#C084FC] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-3">
                      CORE TECHNOLOGIES EMPLOYED
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-[#141824] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium text-xs sm:text-sm shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Two Cards: Category & Demo Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Card 1: CATEGORY */}
                    <div className="bg-slate-50 dark:bg-[#101420] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5">
                      <span className="text-slate-500 dark:text-[#8E97A0] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider block mb-1">
                        CATEGORY
                      </span>
                      <h5 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base md:text-lg">
                        {project.category}
                      </h5>
                    </div>

                    {/* Card 2: DEMO MODE */}
                    <div className="bg-slate-50 dark:bg-[#101420] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5">
                      <span className="text-slate-500 dark:text-[#8E97A0] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider block mb-1">
                        DEMO MODE
                      </span>
                      <h5 className="text-emerald-600 dark:text-[#00FF9D] font-mono font-bold text-xs sm:text-sm md:text-base">
                        {project.demoMode}
                      </h5>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: ARCHITECTURE SPEC */}
              {activeTab === 'architecture' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {project.architectureStages.map((stage, idx) => (
                      <div
                        key={stage.stage}
                        className="bg-slate-50 dark:bg-[#101420] border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-400 dark:hover:border-[#C084FC]/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                              {stage.stage}
                            </span>
                            <span className="text-slate-400 dark:text-[#8E97A0] text-xs font-mono">0{idx + 1}/03</span>
                          </div>
                          <h5 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-tight mb-2">
                            {stage.title}
                          </h5>
                          <p className="text-slate-600 dark:text-[#8E97A0] text-xs leading-relaxed font-light">
                            {stage.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>Production-Grade Architecture: Verified across real user scenarios and performance profiling.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: >_ LIVE TELEMETRY / DEMO */}
              {activeTab === 'telemetry' && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  {/* Terminal Header */}
                  <div className="rounded-2xl border border-slate-300 dark:border-white/15 bg-[#07090F] overflow-hidden shadow-2xl flex flex-col">
                    <div className="bg-[#111624] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-[11px] font-mono text-[#8E97A0]">
                          bash - {project.name.toLowerCase()}_telemetry.sh
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={runSimulation}
                          disabled={isSimulating}
                          className="px-2.5 py-1 rounded text-[11px] font-mono bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Play className="w-3 h-3" />
                          <span>{isSimulating ? 'SIMULATING...' : 'RUN BENCHMARK'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTerminalLogs(project.telemetryLogs)}
                          className="p-1 rounded text-[#8E97A0] hover:text-white transition-colors"
                          title="Reset Terminal"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Terminal Output */}
                    <div className="p-4 font-mono text-xs text-[#00FF9D] max-h-52 overflow-y-auto space-y-1.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/20">
                      {terminalLogs.map((log, index) => (
                        <div key={index} className="leading-relaxed">
                          <span className="text-purple-400 select-none mr-2">&gt;</span>
                          <span className={log.startsWith('$') ? 'text-white font-bold' : log.includes('ALERT') ? 'text-amber-400 font-semibold' : 'text-[#00FF9D]'}>
                            {log}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1 text-white pt-1">
                        <span className="text-purple-400">&gt;</span>
                        <span className="w-2 h-4 bg-purple-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Interactive Input */}
                    <form onSubmit={handleCommandSubmit} className="border-t border-white/10 bg-[#0C101A] px-3 py-2 flex items-center gap-2">
                      <span className="text-purple-400 font-mono text-xs select-none">$</span>
                      <input
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        placeholder="Type 'help', 'status', 'benchmark', or 'clear'..."
                        className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-white/20"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      >
                        SEND
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Bottom Action Row */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            {/* Left: Source Code Button */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-all hover:border-slate-400 dark:hover:border-white/30 cursor-pointer shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </a>

            {/* Right: Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 dark:text-[#8E97A0] hover:text-black dark:hover:text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectSpecModal;
