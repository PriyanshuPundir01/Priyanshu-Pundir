import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  Check,
  Moon,
  Sun,
  Copy,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  FileText,
  ArrowUpRight,
  FolderGit2,
  Award,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  // Tab view: 'digital' (Interactive Dossier) vs 'pdf' (Raw PDF Viewer)
  const [viewMode, setViewMode] = useState<'digital' | 'pdf'>('digital');
  const [isDarkPaper, setIsDarkPaper] = useState<boolean>(isDark);
  const [downloaded, setDownloaded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Sync paper mode with active theme on open / theme change
  useEffect(() => {
    setIsDarkPaper(isDark);
  }, [isDark]);

  const resumeUrl = '/assets/Priyanshu_Pundir_Resume.pdf';
  const resumeFileName = 'Priyanshu_Pundir_Resume.pdf';
  const linkedInUrl = 'https://www.linkedin.com/in/priyanshupundir01/';
  const gitHubUrl = 'https://github.com/PriyanshuPundir01';

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setDownloaded(false);
      setCopiedField(null);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2800);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="resume-modal-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-[#05070B]/85 backdrop-blur-2xl cursor-pointer"
          />

          {/* Holographic Ambient Glow Blobs */}
          <div className="absolute w-[450px] h-[450px] bg-[#00D2FF]/10 rounded-full blur-[130px] pointer-events-none -top-24 -left-24" />
          <div className="absolute w-[450px] h-[450px] bg-[#B600A8]/10 rounded-full blur-[130px] pointer-events-none -bottom-24 -right-24" />

          {/* Main Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[95vw] max-w-5xl h-[88vh] max-h-[860px] bg-white dark:bg-[#080B11]/95 border border-slate-300 dark:border-[#00D2FF]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(0,210,255,0.2),0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden z-10 text-slate-800 dark:text-[#D7E2EA] transition-colors duration-200"
          >
            {/* Cyber Corner Brackets */}
            <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00D2FF] pointer-events-none z-30" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00D2FF] pointer-events-none z-30" />
            <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00D2FF] pointer-events-none z-30" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00D2FF] pointer-events-none z-30" />

            {/* ============================================================== */}
            {/* 1. TOP BAR / HUD TOOLBAR                                       */}
            {/* ============================================================== */}
            <div className="bg-slate-100 dark:bg-[#0D121B]/95 border-b border-slate-200 dark:border-white/10 px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3 shrink-0 relative z-20">
              {/* Left: Mode Switcher Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('digital')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'digital'
                      ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                      : 'text-slate-600 dark:text-[#8E97A0] hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIGITAL CV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'pdf'
                      ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                      : 'text-slate-600 dark:text-[#8E97A0] hover:text-black dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>OFFICIAL PDF</span>
                </button>
              </div>

              {/* Middle: Status Pill or Dark Paper Toggle */}
              <div className="hidden md:flex items-center gap-2">
                {viewMode === 'pdf' ? (
                  <button
                    type="button"
                    onClick={() => setIsDarkPaper(!isDarkPaper)}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-[#00D2FF]/40 text-xs font-mono text-slate-800 dark:text-[#D7E2EA] hover:text-black dark:hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    title="Toggle Paper Style for PDF"
                  >
                    {isDarkPaper ? (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>OLED DARK PAPER</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>LIGHT PAPER</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-50 dark:bg-[#00D2FF]/5 border border-cyan-200 dark:border-[#00D2FF]/20 text-[11px] font-mono text-cyan-700 dark:text-[#00D2FF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
                    <span>SYS://INTERACTIVE_DOSSIER_ONLINE</span>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Download PDF Button */}
                <button
                  id="download-resume-btn"
                  type="button"
                  onClick={handleDownload}
                  className={`relative group overflow-hidden rounded-lg px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    downloaded
                      ? 'bg-[#22C55E] text-black shadow-[0_0_20px_rgba(34,197,94,0.6)]'
                      : 'bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#00A3FF] text-black shadow-[0_0_20px_rgba(0,210,255,0.45)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  title="Download Resume PDF"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
                  {downloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>DOWNLOADED!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>DOWNLOAD PDF</span>
                    </>
                  )}
                </button>

                {/* Open in Full Native Tab */}
                <a
                  id="open-resume-newtab-btn"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-[#00D2FF]/15 border border-slate-300 dark:border-white/10 hover:border-[#00D2FF]/50 flex items-center justify-center text-slate-700 dark:text-white/70 hover:text-[#00D2FF] transition-all cursor-pointer shadow-sm"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Close Button */}
                <button
                  id="close-resume-modal-btn"
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-rose-500/15 border border-slate-300 dark:border-white/10 hover:border-rose-500/50 flex items-center justify-center text-slate-700 dark:text-white/70 hover:text-rose-500 transition-all cursor-pointer ml-0.5 shadow-sm"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 2. MAIN CONTENT BODY: DIGITAL CV OR RAW PDF                    */}
            {/* ============================================================== */}
            <div className="flex-1 w-full min-h-0 relative overflow-hidden bg-slate-50 dark:bg-[#06090E]">
              {viewMode === 'digital' ? (
                /* ------------------------------------------------------------ */
                /* OPTION 1: INTERACTIVE DIGITAL DOSSIER                        */
                /* ------------------------------------------------------------ */
                <div className="w-full h-full overflow-y-auto px-4 sm:px-7 md:px-10 py-6 sm:py-8 text-slate-800 dark:text-[#D7E2EA] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#00D2FF]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {/* Top Header Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0F1420] dark:via-[#0C101A] dark:to-[#0A0D15] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#00D2FF]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-cyan-700 dark:text-[#00D2FF] text-[10px] font-mono uppercase tracking-wider mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
                          <span>FULLSTACK DEVELOPER</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white tracking-tight">
                          Priyanshu Pundir
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8E97A0] max-w-2xl mt-1.5 leading-relaxed font-light">
                          Full Stack Developer skilled in Java, JavaScript (React.js, Angular), Python, and SQL, with hands-on experience across the Software Development Life Cycle (SDLC).
                        </p>
                      </div>

                      {/* Direct Contact Pills */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('priyanshupundir36@gmail.com', 'email')}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#00D2FF]/40 text-xs text-slate-700 dark:text-[#D7E2EA] hover:text-black dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00D2FF]" />
                          <span>{copiedField === 'email' ? 'Copied Email!' : 'Email'}</span>
                          {copiedField === 'email' ? (
                            <Check className="w-3 h-3 text-[#22C55E]" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400 dark:text-white/30" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => copyToClipboard('+919548014400', 'phone')}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#00D2FF]/40 text-xs text-slate-700 dark:text-[#D7E2EA] hover:text-black dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-[#38BDF8]" />
                          <span>{copiedField === 'phone' ? 'Copied Phone!' : '+91 9548014400'}</span>
                        </button>

                        <a
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#0A66C2]/10 dark:bg-[#0A66C2]/15 border border-[#0A66C2]/30 dark:border-[#0A66C2]/40 hover:bg-[#0A66C2]/20 text-xs text-[#0A66C2] dark:text-[#60A5FA] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>

                        <a
                          href={gitHubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-xs text-slate-800 dark:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Stats Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-[#8E97A0] block text-[10px] font-mono">LOCATION</span>
                        <span className="text-slate-800 dark:text-white font-medium flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#EA580C]" /> Rawat Vihar, Dehradun
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-[#8E97A0] block text-[10px] font-mono">RAG PLATFORM</span>
                        <span className="text-cyan-600 dark:text-[#00D2FF] font-medium mt-0.5 block">87% – 92% Accuracy</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-[#8E97A0] block text-[10px] font-mono">CORE SYSTEM</span>
                        <span className="text-purple-600 dark:text-[#A855F7] font-medium mt-0.5 block">10,000+ Tx Integrity</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-[#8E97A0] block text-[10px] font-mono">ACADEMICS</span>
                        <span className="text-emerald-600 dark:text-[#4ADE80] font-medium mt-0.5 block">MCA (7.22) &amp; BCA (7.37)</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Summary Card */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 mb-6 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-cyan-700 dark:text-[#00D2FF] tracking-wider block mb-1.5 font-bold">
                      // PROFESSIONAL PROFILE
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-[#D7E2EA] font-light leading-relaxed">
                      Full Stack Developer skilled in Java, JavaScript (React.js, Angular), Python, and SQL, with hands-on experience across the Software Development Life Cycle (SDLC) — from RESTful API design and secure backend development to responsive front-end interfaces. Delivered production-grade projects including an AI-powered RAG platform achieving 87–92% retrieval accuracy and a secure banking system processing 10,000+ transactions with 100% data integrity. Experienced in Agile/Scrum collaboration, Git version control, and cross-functional teamwork with QA and security teams.
                    </p>
                  </div>

                  {/* Section Grid: Experience & Skills */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    {/* Left: Professional Experience Timeline (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-cyan-600 dark:text-[#00D2FF]" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          EXPERIENCE
                        </h3>
                      </div>

                      {/* Experience Item 1: Berg Technologies */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-[#00D2FF]/30 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                            Quality Assurance Analyst
                          </h4>
                          <span className="text-[11px] font-mono text-cyan-700 dark:text-[#00D2FF] font-semibold">
                            Dec 2025 – Aug 2026
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-[#8E97A0] font-medium block mb-3">
                          Berg Technologies Pvt. Ltd.
                        </span>
                        <ul className="text-xs text-slate-700 dark:text-[#D7E2EA]/90 space-y-2 leading-relaxed font-light">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-600 dark:text-[#00D2FF] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">Functional &amp; Regression Testing:</strong> Executed 150+ functional and regression test cases per release cycle across full-stack web applications, identifying 40+ critical defects before production deployment.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-600 dark:text-[#00D2FF] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">SQL-Based Data Validation:</strong> Wrote SQL queries to automate data quality audits across production databases, improving data accuracy by 35% and cutting manual verification time by 5+ hours per week.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-600 dark:text-[#00D2FF] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">Agile Collaboration &amp; Issue Tracking:</strong> Logged and tracked technical defects in issue-tracking tools while collaborating with 10+ Subject Matter Experts and Team Leads in Agile sprint ceremonies, improving defect resolution time by 20%.
                            </span>
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                          {['Functional Testing', 'Regression Testing', 'SQL Audits', 'Agile / Scrum', 'Defect Tracking'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#8E97A0] border border-slate-200 dark:border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience Item 2: Prodigy InfoTech */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-purple-500/40 dark:hover:border-[#00D2FF]/30 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                            Cyber Security Intern
                          </h4>
                          <span className="text-[11px] font-mono text-purple-700 dark:text-[#A855F7] font-semibold">
                            Sept 2025 – Dec 2025
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-[#8E97A0] font-medium block mb-3">
                          Prodigy InfoTech
                        </span>
                        <ul className="text-xs text-slate-700 dark:text-[#D7E2EA]/90 space-y-2 leading-relaxed font-light">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-[#A855F7] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">Secure Application Development:</strong> Built a secure login module and file integrity checker in Python using AES-256 encryption (PyCryptodome), achieving 100% data confidentiality across all tested cases.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-[#A855F7] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">Performance Recognition:</strong> Commended by the Software Engineering Manager for exceptional attention to detail and problem-solving on complex security features.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-[#A855F7] mt-1 shrink-0">•</span>
                            <span>
                              <strong className="text-slate-900 dark:text-white font-medium">Formal Recognition:</strong> Awarded a formal Letter of Recommendation for consistently exceeding expectations and rapidly mastering industry-standard security practices.
                            </span>
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                          {['Python', 'AES-256', 'PyCryptodome', 'File Integrity', 'Security Best Practices'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#8E97A0] border border-slate-200 dark:border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Technical Skills & Education (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      {/* Education Card */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-[#4ADE80]" />
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            EDUCATION
                          </h3>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 flex flex-col gap-3 shadow-sm">
                          <div>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                              <span>Master of Computer Applications (MCA)</span>
                              <span className="text-emerald-700 dark:text-[#4ADE80] font-mono">2024 – 2026</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-[#8E97A0] block mt-0.5">
                              Graphic Era Hill University – Dehradun, India
                            </span>
                            <span className="text-[11px] text-cyan-700 dark:text-[#00D2FF] font-mono block mt-0.5 font-semibold">
                              CGPA: 7.22
                            </span>
                          </div>

                          <div className="pt-2.5 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                              <span>Bachelor of Computer Applications (BCA)</span>
                              <span className="text-emerald-700 dark:text-[#4ADE80] font-mono">2021 – 2024</span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-[#8E97A0] block mt-0.5">
                              Graphic Era Hill University – Dehradun, India
                            </span>
                            <span className="text-[11px] text-cyan-700 dark:text-[#00D2FF] font-mono block mt-0.5 font-semibold">
                              CGPA: 7.37
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Technical Skills Matrix */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-purple-600 dark:text-[#A855F7]" />
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            TECHNICAL SKILLS
                          </h3>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 flex flex-col gap-3.5 shadow-sm">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-cyan-700 dark:text-[#00D2FF] tracking-wider block mb-1.5 font-bold">
                              LANGUAGES
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {['JavaScript (ES6+)', 'Java', 'Python', 'C++', 'C', 'SQL'].map((s) => (
                                <span key={s} className="px-2 py-1 rounded bg-cyan-50 dark:bg-[#00D2FF]/10 border border-cyan-200 dark:border-[#00D2FF]/30 text-cyan-900 dark:text-white text-xs font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase text-purple-700 dark:text-[#A855F7] tracking-wider block mb-1.5 font-bold">
                              FRONTEND &amp; MOBILE
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {['React.js', 'Angular', 'HTML5', 'CSS3', 'Responsive Web Design', 'Android Studio', 'Biometric API'].map((s) => (
                                <span key={s} className="px-2 py-1 rounded bg-purple-50 dark:bg-[#A855F7]/10 border border-purple-200 dark:border-[#A855F7]/30 text-purple-900 dark:text-white text-xs font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase text-sky-700 dark:text-[#38BDF8] tracking-wider block mb-1.5 font-bold">
                              BACKEND, TOOLS &amp; PRACTICES
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {['RESTful API Design', 'MySQL', 'Git', 'GitHub', 'VS Code', 'Postman', 'Agile/Scrum', 'SDLC', 'OOP', 'Unit Testing', 'Netlify', 'Vercel'].map((s) => (
                                <span key={s} className="px-2 py-1 rounded bg-sky-50 dark:bg-[#38BDF8]/10 border border-sky-200 dark:border-[#38BDF8]/30 text-sky-900 dark:text-white text-xs font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-[#4ADE80] tracking-wider block mb-1.5 font-bold">
                              INTERPERSONAL SKILLS
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {['Leadership', 'Team Collaboration', 'Problem-Solving', 'Effective Communication', 'Cross-Functional Collaboration', 'Multitasking'].map((s) => (
                                <span key={s} className="px-2 py-1 rounded bg-emerald-50 dark:bg-[#4ADE80]/10 border border-emerald-200 dark:border-[#4ADE80]/30 text-emerald-900 dark:text-white text-xs font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects Showcase */}
                  <div className="mb-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-cyan-600 dark:text-[#00D2FF]" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        PROJECTS
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Project 1: Nexus Intelligence */}
                      <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-[#00D2FF]/30 transition-all flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                              Nexus Intelligence – AI RAG Platform
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-[#D7E2EA]/85 leading-relaxed font-light mt-1.5">
                            Architected and deployed an enterprise-grade Retrieval-Augmented Generation (RAG) platform using LangChain and Streamlit; integrated NVIDIA embeddings and ChromaDB vector storage to build a persistent semantic index achieving 87–92% retrieval accuracy.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5">
                          {['Python', 'LangChain', 'Streamlit', 'ChromaDB', 'NVIDIA Embeddings'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-50 dark:bg-white/5 text-cyan-700 dark:text-[#00D2FF]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project 2: OmniVault */}
                      <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-purple-500/40 dark:hover:border-[#00D2FF]/30 transition-all flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                              OmniVault – Mobile Security App
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-[#D7E2EA]/85 leading-relaxed font-light mt-1.5">
                            Engineered an Android application using the Biometric API for facial recognition and fingerprint authentication, eliminating password-based login and reducing credential-based vulnerabilities.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5">
                          {['Java', 'Android Studio', 'Biometric API', 'Security'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 dark:bg-white/5 text-purple-700 dark:text-[#A855F7]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project 3: Money Matrix */}
                      <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-[#00D2FF]/30 transition-all flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                              Money Matrix – Banking System
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-[#D7E2EA]/85 leading-relaxed font-light mt-1.5">
                            Designed a secure C++ banking system with persistent file-handling architecture, supporting 10,000+ simulated transactions with 100% data integrity across accounts, loans, and admin records.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5">
                          {['C++', 'File Handling', 'OOP', 'ACID Transactions'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-50 dark:bg-white/5 text-sky-700 dark:text-[#38BDF8]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project 4: Sangeet & Automotive Hub */}
                      <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-[#00D2FF]/30 transition-all flex flex-col justify-between shadow-sm">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                              Sangeet &amp; Automotive Hub – Web Platforms
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-[#D7E2EA]/85 leading-relaxed font-light mt-1.5">
                            Built two responsive front-end platforms: a music-streaming site with a custom audio player, and a car-trading platform with authentication, search filters, and an admin dashboard.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5">
                          {['HTML5', 'CSS3', 'JavaScript', 'Audio Player', 'Dashboard'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-white/5 text-emerald-700 dark:text-[#4ADE80]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements and Certifications */}
                  <div className="mb-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        ACHIEVEMENTS AND CERTIFICATIONS
                      </h3>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-[#0D121B] border border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 shadow-sm">
                      {[
                        { title: 'Python for Machine Learning', org: 'Edupyramids', year: '2026' },
                        { title: 'Data Analytics Job Simulation', org: 'Deloitte', year: '2026' },
                        { title: 'Cyber Security', org: 'Prodigy', year: '2025' },
                        { title: 'CCNA', org: 'Cisco', year: '2024' },
                        { title: 'MCSA', org: 'Microsoft', year: '2024' },
                        { title: 'Web Development Bootcamp', org: 'Udemy', year: '2023' },
                      ].map((cert) => (
                        <div key={cert.title} className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col justify-between">
                          <span className="text-xs font-medium text-slate-900 dark:text-white">{cert.title}</span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-[#8E97A0] mt-1">
                            {cert.org} • {cert.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Switch to Official PDF Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 via-white to-transparent dark:from-[#00D2FF]/10 dark:via-[#0D121B] dark:to-transparent border border-cyan-200 dark:border-[#00D2FF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-cyan-600 dark:text-[#00D2FF] shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide block">
                          Looking for the official printable resume?
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-[#8E97A0]">
                          Switch to the Official PDF tab to preview in light/dark paper or download the PDF directly.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewMode('pdf')}
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/20 text-xs font-mono font-bold text-slate-800 dark:text-white transition-all cursor-pointer"
                      >
                        VIEW RAW PDF ➔
                      </button>
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-black text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                      >
                        DOWNLOAD NOW
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ------------------------------------------------------------ */
                /* OPTION 2: FLOATING DYNAMIC ISLAND HIGH-RES PDF VIEWER        */
                /* ------------------------------------------------------------ */
                <div className="w-full h-full p-2 sm:p-3 relative flex flex-col bg-slate-200 dark:bg-[#05070B]">
                  {/* Floating Top Island for Mobile / Small Screens */}
                  <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-white dark:bg-[#0B0F17] rounded-lg border border-slate-300 dark:border-white/10 mb-2 text-xs">
                    <span className="text-cyan-700 dark:text-[#00D2FF] font-mono text-[11px] font-bold">PDF PREVIEW // A4</span>
                    <button
                      type="button"
                      onClick={() => setIsDarkPaper(!isDarkPaper)}
                      className="text-[11px] font-mono text-slate-700 dark:text-[#D7E2EA] hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {isDarkPaper ? <Moon className="w-3 h-3 text-[#00D2FF]" /> : <Sun className="w-3 h-3 text-amber-500" />}
                      <span>{isDarkPaper ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                  </div>

                  <div className="flex-1 w-full min-h-0 relative rounded-xl overflow-hidden border border-slate-300 dark:border-white/10 shadow-2xl bg-white dark:bg-[#090D14]">
                    <object
                      data={resumeUrl}
                      type="application/pdf"
                      className={`w-full h-full transition-all duration-300 ${
                        isDarkPaper
                          ? 'filter invert-[0.92] hue-rotate-180 contrast-[1.12] brightness-[0.92]'
                          : ''
                      }`}
                    >
                      {/* Fallback for browsers with disabled PDF plugins */}
                      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white dark:bg-[#080B11] text-slate-800 dark:text-[#D7E2EA]">
                        <FileText className="w-16 h-16 text-[#00D2FF] mb-4 animate-bounce" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase mb-1">
                          Direct PDF Preview Initialized
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8E97A0] max-w-md mb-6 leading-relaxed">
                          Your current browser configuration requires downloading or opening the official resume directly in a new window.
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleDownload}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Official Resume</span>
                          </button>
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                          >
                            <span>Open In New Tab</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </object>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
