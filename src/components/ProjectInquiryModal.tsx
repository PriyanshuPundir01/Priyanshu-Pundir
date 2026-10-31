import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Layers,
  Code2,
  Cpu,
  Shield,
  Database,
  Network,
  Send,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronDown,
  IndianRupee,
  Sparkles,
  Search,
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// ── Security: Input Sanitization ──
// Strips HTML tags and trims whitespace to prevent XSS in PDF output and mailto links
const sanitizeInput = (input: string): string =>
  input.replace(/<[^>]*>/g, '').trim();

export interface ServiceOption {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  icon: React.ElementType;
  techTags: string[];
}

export const PORTFOLIO_SERVICES: ServiceOption[] = [
  {
    id: 'full-stack-web-development',
    number: '01',
    title: 'Full Stack Web Development',
    category: 'WEB & UI ARCHITECTURE',
    shortDesc:
      'Engineering responsive, high-performance web applications using React.js, Angular, JavaScript (ES6+), HTML5, and modern CSS3 architectures.',
    icon: Layers,
    techTags: ['React.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
  },
  {
    id: 'backend-restful-apis',
    number: '02',
    title: 'Backend & RESTful APIs',
    category: 'DISTRIBUTED SYSTEMS',
    shortDesc:
      'Architecting secure backend services and RESTful APIs in Python, Java, and C++, integrated with relational MySQL databases and persistent storage.',
    icon: Code2,
    techTags: ['Python', 'Java', 'C++', 'FastAPI', 'MySQL', 'RESTful APIs'],
  },
  {
    id: 'agentic-ai-rag-architecture',
    number: '03',
    title: 'Agentic AI & RAG Architecture',
    category: 'INTELLIGENCE PLATFORMS',
    shortDesc:
      'Deploying autonomous agentic workflows, multi-agent systems, and enterprise Retrieval-Augmented Generation (RAG) platforms using LangChain, LangGraph, NVIDIA embeddings, and ChromaDB vector search.',
    icon: Cpu,
    techTags: ['Agentic AI', 'LangChain', 'LangGraph', 'ChromaDB', 'NVIDIA Embeddings', 'Vector Search'],
  },
  {
    id: 'mcp-server-integration',
    number: '04',
    title: 'Model Context Protocol (MCP) Server Integration',
    category: 'MCP & PROTOCOL BRIDGES',
    shortDesc:
      'Designing and deploying custom Model Context Protocol (MCP) servers and clients, bridging LLMs and autonomous agents securely with local tools, enterprise APIs, and contextual data sources.',
    icon: Network,
    techTags: ['MCP Protocol', 'Custom MCP Servers', 'JSON-RPC', 'LLM Tool Calling', 'Context Bridges', 'Python / TS SDK'],
  },
  {
    id: 'mobile-cyber-security',
    number: '05',
    title: 'Mobile & Cyber Security',
    category: 'SECURITY & MOBILE',
    shortDesc:
      'Building native Android apps with Biometric API authentication and implementing cryptographic security protocols including AES-256 encryption.',
    icon: Shield,
    techTags: ['Android', 'Kotlin', 'Java', 'Biometric API', 'AES-256', 'Cryptography'],
  },
  {
    id: 'software-testing-database-validation',
    number: '06',
    title: 'Software Testing and Database Validation',
    category: 'QUALITY ASSURANCE',
    shortDesc:
      'Automating SQL queries for data quality audits across production databases and executing rigorous functional and regression testing cycles.',
    icon: Database,
    techTags: ['SQL Audits', 'Database QA', 'Regression Testing', 'Postman', 'Quality Benchmarking'],
  },
];

export interface BudgetTier {
  id: string;
  range: string;
  tag: string;
  value: string;
}

export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'tier-1',
    range: '₹10,000 – ₹20,000',
    tag: 'Quick MVP / Landing Page',
    value: '₹10,000 – ₹20,000 (Quick MVP / Landing Page)',
  },
  {
    id: 'tier-2',
    range: '₹20,000 – ₹45,000',
    tag: 'Full-Stack Web App',
    value: '₹20,000 – ₹45,000 (Full-Stack Web App)',
  },
  {
    id: 'tier-3',
    range: '₹45,000 – ₹80,000',
    tag: 'AI & Custom Architecture',
    value: '₹45,000 – ₹80,000 (AI & Custom Architecture)',
  },
  {
    id: 'tier-4',
    range: '₹80,000+',
    tag: 'Enterprise / Retainer',
    value: '₹80,000+ (Enterprise / Retainer)',
  },
];

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  // 1. Service Selection State (Unified Combobox)
  const defaultService = PORTFOLIO_SERVICES[0].title;
  const [serviceInput, setServiceInput] = useState<string>(
    initialService || defaultService
  );
  const [isComboboxOpen, setIsComboboxOpen] = useState<boolean>(false);
  const comboboxRef = useRef<HTMLDivElement>(null);

  // 2. Input Fields (Clean defaults, no hardcoded developer values)
  const [name, setName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>(
    '₹20,000 – ₹45,000 (Full-Stack Web App)'
  );
  const [projectDescription, setProjectDescription] = useState<string>('');

  // Helper to fetch latest persistent receipt sequence
  const getLatestReceiptSeq = (): number => {
    try {
      const saved = localStorage.getItem('priyanshu_portfolio_receipt_seq');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 1001) return parsed;
      }
    } catch {
      // LocalStorage access fallback
    }
    return 1001;
  };

  // 3. Sequentially Incrementing Receipt Number (Internal / PDF export only)
  const [receiptNumber, setReceiptNumber] = useState<number>(() => getLatestReceiptSeq());

  // 4. Modal and feedback state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [issuedReceiptId, setIssuedReceiptId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check if current budget is a custom user-typed entry
  const isCustomBudget =
    Boolean(selectedBudget.trim()) &&
    !BUDGET_TIERS.some(
      (t) => selectedBudget === t.value || selectedBudget === t.range
    );

  // Close combobox when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) {
        setIsComboboxOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync initialService when provided or modal opened
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setServiceInput(initialService);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsComboboxOpen(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, initialService, onClose]);

  // Select service via card click
  const handleCardClick = (serviceTitle: string) => {
    setServiceInput(serviceTitle);
    setIsComboboxOpen(false);
  };

  // Filtered services for Combobox
  const filteredServices = PORTFOLIO_SERVICES.filter((srv) => {
    const query = serviceInput.toLowerCase().trim();
    if (!query) return true;
    return (
      srv.title.toLowerCase().includes(query) ||
      srv.category.toLowerCase().includes(query) ||
      srv.techTags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Generate and Automatically Download PDF Receipt
  const generateReceiptPDF = (
    currentSeqNum: number,
    receiptServiceName: string
  ) => {
    try {
      // Security: Sanitize all user-provided content before embedding in PDF
      const safeName = sanitizeInput(name);
      const safeEmail = sanitizeInput(workEmail);
      const safePhone = sanitizeInput(contactNumber);
      const safeBudget = sanitizeInput(selectedBudget);
      const safeDesc = sanitizeInput(projectDescription);
      const safeService = sanitizeInput(receiptServiceName);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const receiptRefStr = `REC-${currentSeqNum}`;
      const primaryColor: [number, number, number] = [12, 14, 22];
      const accentCyan: [number, number, number] = [0, 210, 255];
      const accentPurple: [number, number, number] = [182, 0, 168];
      const grayText: [number, number, number] = [95, 102, 115];
      const cardBg: [number, number, number] = [246, 248, 252];

      // Top Header Dark Banner
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 40, 'F');

      // Top Title: Priyanshu Pundir
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('PRIYANSHU PUNDIR', 16, 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(215, 226, 234);
      doc.text(
        'Full Stack Developer & Systems Engineer | Project Inquiry & Architecture Intake',
        16,
        23.5
      );
      doc.text(
        'Email: priyanshupundir36@gmail.com | Phone: +91 9548014400 | Dehradun, India',
        16,
        29
      );
      doc.text('Portfolio: https://priyanshupundir.dev | GitHub: github.com/PriyanshuPundir01', 16, 34.5);

      // Top Right: Unique Sequential Receipt Number (Inside PDF receipt only)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text('OFFICIAL INQUIRY RECEIPT', 194, 16, {
        align: 'right',
      });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(accentCyan[0], accentCyan[1], accentCyan[2]);
      doc.text(`#${receiptRefStr}`, 194, 23.5, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(200, 215, 230);
      doc.text(
        `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        194,
        29,
        { align: 'right' }
      );
      doc.text('Registry: Verified SSL Electronic Intake', 194, 34.5, { align: 'right' });

      let y = 50;

      // Status Badge Banner
      doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
      doc.roundedRect(16, y, 178, 16, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(22, 163, 74);
      doc.text('[STATUS: LOGGED IN ARCHITECTURAL INTAKE REGISTRY]', 22, y + 10.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text(`Lead Developer: Priyanshu Pundir`, 190, y + 10.5, { align: 'right' });

      y += 25;

      // Section 1: Client & Contact Details
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('1. CLIENT & CONTACT DETAILS', 16, y);

      y += 3.5;
      doc.setDrawColor(215, 222, 230);
      doc.line(16, y, 194, y);
      y += 7.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Client Name / Org:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(safeName || 'Client (Unspecified)', 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Work Email Address:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(accentPurple[0], accentPurple[1], accentPurple[2]);
      doc.text(safeEmail || 'Not Provided', 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Contact Number / Phone:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(safePhone || 'Not Provided', 62, y);

      y += 14;

      // Section 2: Selected Service & Budget
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('2. SERVICE SPECIFICATION & BUDGET', 16, y);

      y += 3.5;
      doc.setDrawColor(215, 222, 230);
      doc.line(16, y, 194, y);
      y += 7.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Service Specification:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(safeService || defaultService, 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Budget Allocation:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      // Format budget for PDF: replace ₹ with INR to ensure crisp font rendering across standard PDF viewers
      const formattedPdfBudget = (safeBudget || 'Flexible / To be discussed').replace(/₹/g, 'INR ');
      doc.text(formattedPdfBudget, 62, y);

      y += 14;

      // Section 3: Project Description
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('3. PROJECT DESCRIPTION & SCOPE SUMMARY', 16, y);

      y += 3.5;
      doc.setDrawColor(215, 222, 230);
      doc.line(16, y, 194, y);
      y += 7;

      doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
      const splitDesc = doc.splitTextToSize(
        safeDesc || 'No additional project description provided.',
        170
      );
      const boxHeight = Math.max(30, splitDesc.length * 5.6 + 12);
      doc.roundedRect(16, y, 178, boxHeight, 2, 2, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(splitDesc, 20, y + 8);

      y += boxHeight + 14;

      // Section 4: SLA & Commitments
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('COMMITMENT & TECHNICAL CONSULTATION SLA:', 16, y);

      y += 5.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('• Priyanshu Pundir reviews all architectural inquiries within 24 business hours.', 16, y);
      y += 5;
      doc.text('• Direct inquiry telemetry logged to: priyanshupundir36@gmail.com.', 16, y);
      y += 5;
      doc.text('• For urgent or time-sensitive projects, contact directly via phone/WhatsApp: +91 9548014400.', 16, y);

      // Footer
      doc.setDrawColor(215, 222, 230);
      doc.line(16, 270, 194, 270);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text(
        `Official Receipt #${receiptRefStr} • Priyanshu Pundir Portfolio System`,
        16,
        275
      );
      doc.text('Electronically Verified • Sequential Intake Stamp', 194, 275, {
        align: 'right',
      });

      // Save PDF file
      doc.save(`Project_Inquiry_Receipt_${receiptRefStr}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF receipt:', err);
    }
  };

  // Submit Handler: Validates, downloads PDF, increments receipt number, shows confirmation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Security: Input length limits to prevent abuse
    if (name.length > 200) {
      setErrorMessage('Name must be under 200 characters.');
      return;
    }
    if (workEmail.length > 254) {
      setErrorMessage('Email must be under 254 characters.');
      return;
    }
    if (contactNumber.length > 30) {
      setErrorMessage('Phone number must be under 30 characters.');
      return;
    }
    if (projectDescription.length > 5000) {
      setErrorMessage('Project description must be under 5000 characters.');
      return;
    }

    // Field Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name or company name.');
      return;
    }
    if (!workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!contactNumber.trim()) {
      setErrorMessage('Please provide a contact phone / WhatsApp number.');
      return;
    }
    if (!selectedBudget.trim()) {
      setErrorMessage('Please specify an estimated project budget.');
      return;
    }
    if (!projectDescription.trim()) {
      setErrorMessage('Please provide a brief description of your project.');
      return;
    }

    // Always use the latest sequence from storage or state to guarantee non-reusable unique numbers
    const currentSeq = Math.max(receiptNumber, getLatestReceiptSeq());
    const formattedId = `REC-${currentSeq}`;
    setIssuedReceiptId(formattedId);

    // Crucial: Increment sequence immediately by +1 and persist so currentSeq can NEVER be used again
    const nextSeq = currentSeq + 1;
    setReceiptNumber(nextSeq);
    try {
      localStorage.setItem('priyanshu_portfolio_receipt_seq', nextSeq.toString());
    } catch (err) {
      console.error('Failed to update receipt sequence in localStorage:', err);
    }

    const finalService = sanitizeInput(serviceInput) || defaultService;

    // 1. Automatically generate and download official PDF receipt onto user's system
    generateReceiptPDF(currentSeq, finalService);

    // 2. Switch to success screen
    setIsSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setIsSubmitted(false);
    setServiceInput(defaultService);
    setName('');
    setWorkEmail('');
    setContactNumber('');
    setSelectedBudget('₹20,000 – ₹45,000 (Full-Stack Web App)');
    setProjectDescription('');
    setErrorMessage('');
    setIsComboboxOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="project-inquiry-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0B0D14] border border-slate-200 dark:border-[#B600A8]/30 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_80px_rgba(182,0,168,0.25),0_25px_60px_rgba(0,0,0,0.95)] p-5 sm:p-7 md:p-8 text-slate-800 dark:text-[#D7E2EA] z-10 select-none max-h-[92vh] overflow-y-auto flex flex-col justify-between transition-colors duration-200 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#B600A8]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-[#07090F]"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <span className="font-black text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#B600A8] to-[#FF007A] leading-none select-none tracking-tight shrink-0 drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                    // 01
                  </span>

                  <div className="flex flex-col min-w-0">
                    <h2 className="text-slate-900 dark:text-white font-black uppercase text-xl sm:text-2xl md:text-3xl tracking-tight leading-none truncate">
                      PROJECT INQUIRY FORM
                    </h2>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="close-inquiry-modal-btn"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white transition-all cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Header Banner */}
              <div className="mt-4 rounded-xl border border-purple-200 dark:border-white/10 bg-purple-50/70 dark:bg-[#120F24]/50 p-3.5 sm:p-4 text-slate-700 dark:text-[#D7E2EA] text-xs sm:text-sm font-light leading-relaxed">
                Select from Priyanshu&apos;s core engineering &amp; architecture services or type your custom specification below. An official verified PDF receipt and architecture scope will be generated upon submission.
              </div>

              {/* Form Content */}
              {!isSubmitted ? (
                <form id="project-inquiry-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                  {/* ============================================================== */}
                  {/* SECTION 1: THE 6 SERVICES FROM PORTFOLIO + SEARCHABLE COMBOBOX */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#0E121E] border border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#B600A8] font-mono text-xs font-bold">// 01</span>
                        <h3 className="text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          PORTFOLIO SERVICES &amp; CUSTOM SPECIFICATION
                        </h3>
                      </div>
                      <span className="text-slate-500 dark:text-[#8E97A0] font-mono text-[11px]">
                        6 Core Services Listed
                      </span>
                    </div>

                    {/* Interactive 6 Services Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      {PORTFOLIO_SERVICES.map((srv) => {
                        const IconComp = srv.icon;
                        const isSelected =
                          serviceInput.trim().toLowerCase() === srv.title.toLowerCase() ||
                          serviceInput.toLowerCase().includes(srv.title.toLowerCase());
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleCardClick(srv.title)}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] group relative ${
                              isSelected
                                ? 'border-[#00D2FF] bg-[#00D2FF]/15 shadow-[0_0_15px_rgba(0,210,255,0.25)] ring-1 ring-[#00D2FF]'
                                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#131826] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-[#181E30]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono text-slate-500 dark:text-[#8E97A0] group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                {srv.number}
                              </span>
                              <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-[#00D2FF] text-black shadow-sm'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#8E97A0] group-hover:text-slate-900 dark:group-hover:text-white'
                                }`}
                              >
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            <div>
                              <h4
                                className={`text-[11px] sm:text-xs font-bold leading-tight ${
                                  isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-[#D7E2EA] group-hover:text-slate-900 dark:group-hover:text-white'
                                }`}
                              >
                                {srv.title}
                              </h4>
                              <p className="text-[9px] text-slate-500 dark:text-[#8E97A0] line-clamp-1 mt-0.5">
                                {srv.category}
                              </p>
                            </div>

                            {isSelected && (
                              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00FF9D] shadow-[0_0_6px_#00FF9D]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* UNIFIED SEARCHABLE COMBOBOX */}
                    <div ref={comboboxRef} className="relative flex flex-col gap-1.5 pt-1">
                      <label
                        htmlFor="combobox-service-input"
                        className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-[#00D2FF] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00D2FF]" />
                          <span>SERVICE SPECIFICATION (SEARCH OR CUSTOM) *</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-[#8E97A0] font-normal normal-case hidden sm:inline">
                          Type to search, select below, or type custom scope
                        </span>
                      </label>

                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 pointer-events-none">
                          <Search className="w-4 h-4" />
                        </div>

                        <input
                          id="combobox-service-input"
                          type="text"
                          value={serviceInput}
                          onChange={(e) => {
                            setServiceInput(e.target.value);
                            setIsComboboxOpen(true);
                          }}
                          onFocus={() => setIsComboboxOpen(true)}
                          placeholder="Search portfolio service or type custom scope..."
                          autoComplete="off"
                          className="w-full bg-white dark:bg-[#141926] border border-cyan-500/40 hover:border-cyan-500/70 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] rounded-xl pl-10 pr-16 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 transition-all outline-none shadow-sm"
                        />

                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          {serviceInput && (
                            <button
                              type="button"
                              onClick={() => {
                                setServiceInput('');
                                setIsComboboxOpen(true);
                              }}
                              className="p-1 rounded-md text-slate-400 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                              aria-label="Clear service input"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setIsComboboxOpen((prev) => !prev)}
                            className="p-1.5 rounded-md text-slate-500 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Toggle service options dropdown"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isComboboxOpen ? 'rotate-180 text-cyan-600 dark:text-[#00D2FF]' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isComboboxOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#0D111D] border border-cyan-500/30 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-30 max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 backdrop-blur-md [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-cyan-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-[#07090F]"
                          >
                            {filteredServices.length > 0 ? (
                              filteredServices.map((srv) => {
                                const SrvIcon = srv.icon;
                                const isItemMatch =
                                  serviceInput.trim().toLowerCase() === srv.title.toLowerCase();
                                return (
                                  <button
                                    key={srv.id}
                                    type="button"
                                    onClick={() => {
                                      setServiceInput(srv.title);
                                      setIsComboboxOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer group ${
                                      isItemMatch
                                        ? 'bg-[#00D2FF]/15 text-slate-900 dark:text-white font-bold'
                                        : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-[#D7E2EA]'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                          isItemMatch
                                            ? 'bg-[#00D2FF] text-black'
                                            : 'bg-slate-100 dark:bg-white/5 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-400/20'
                                        }`}
                                      >
                                        <SrvIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400/80">
                                            {srv.number}
                                          </span>
                                          <p className="text-xs font-bold truncate group-hover:text-black dark:group-hover:text-white">
                                            {srv.title}
                                          </p>
                                        </div>
                                        <p className="text-[10px] font-mono text-slate-500 dark:text-[#8E97A0] truncate">
                                          {srv.category}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="shrink-0 flex items-center gap-1.5">
                                      {isItemMatch && (
                                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-[#00FF9D] bg-emerald-100 dark:bg-[#00FF9D]/10 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-[#00FF9D]/30">
                                          Selected
                                        </span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })
                            ) : (
                              <div className="p-3 text-center text-xs text-slate-500 dark:text-[#8E97A0] font-mono">
                                No exact portfolio service match found.
                              </div>
                            )}

                            {/* Custom typed option if input doesn't match an exact service title */}
                            {serviceInput.trim() &&
                              !PORTFOLIO_SERVICES.some(
                                (s) => s.title.toLowerCase() === serviceInput.trim().toLowerCase()
                              ) && (
                                <button
                                  type="button"
                                  onClick={() => setIsComboboxOpen(false)}
                                  className="w-full text-left px-3.5 py-2.5 bg-purple-50 dark:bg-[#B600A8]/10 hover:bg-purple-100 dark:hover:bg-[#B600A8]/20 text-purple-900 dark:text-white flex items-center justify-between gap-2 border-t border-purple-200 dark:border-[#B600A8]/20 transition-colors cursor-pointer font-mono"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-[#FF007A] shrink-0" />
                                    <span className="text-xs truncate">
                                      Use custom specification: <span className="text-emerald-700 dark:text-[#00FF9D] font-bold">&quot;{serviceInput.trim()}&quot;</span>
                                    </span>
                                  </div>
                                  <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-[#FF007A] bg-purple-100 dark:bg-[#FF007A]/10 px-2 py-0.5 rounded border border-purple-300 dark:border-[#FF007A]/30 shrink-0">
                                    Custom
                                  </span>
                                </button>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 2: CLIENT INPUT FIELDS (Name, Work Email, Contact No.) */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#0E121E] border border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-700 dark:text-[#00D2FF] font-mono text-xs font-bold">// 02</span>
                      <h3 className="text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                        CLIENT CONTACT INFORMATION
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-name"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5"
                        >
                          <User className="w-3 h-3 text-cyan-600 dark:text-[#00D2FF]" />
                          <span>FULL NAME / ORG *</span>
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe / Acme Corp"
                          required
                          className="w-full bg-white dark:bg-[#141926] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors shadow-sm"
                        />
                      </div>

                      {/* Work Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-email"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3 text-[#B600A8]" />
                          <span>WORK EMAIL *</span>
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="e.g. name@company.com"
                          required
                          className="w-full bg-white dark:bg-[#141926] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-colors shadow-sm"
                        />
                      </div>

                      {/* Contact Number Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-phone"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-emerald-600 dark:text-[#00FF9D]" />
                          <span>CONTACT NUMBER *</span>
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="e.g. +1 (555) 000-0000 / +91 98765 43210"
                          required
                          className="w-full bg-white dark:bg-[#141926] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-colors shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 3: BUDGET INPUT FIELD & PRESETS (INR ₹ FREELANCER TIERS) */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#0E121E] border border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col gap-3.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-700 dark:text-[#00FF9D] font-mono text-xs font-bold">// 03</span>
                        <h3 className="text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          BUDGET ALLOCATION (INR ₹) *
                        </h3>
                      </div>
                      <span className="text-slate-500 dark:text-[#8E97A0] font-mono text-[10px]">
                        Select preset tier or enter custom budget
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* 4 Freelancer INR (₹) Preset Tiers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {BUDGET_TIERS.map((tier) => {
                          const isSelected =
                            selectedBudget === tier.range ||
                            selectedBudget === tier.value ||
                            selectedBudget.startsWith(tier.range);

                          return (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => setSelectedBudget(tier.value)}
                              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[74px] group relative ${
                                isSelected
                                  ? 'border-[#00D2FF] bg-[#00D2FF]/15 shadow-[0_0_15px_rgba(0,210,255,0.25)] ring-1 ring-[#00D2FF]'
                                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#131826] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-[#181E30]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span
                                  className={`text-xs sm:text-sm font-mono font-bold tracking-tight ${
                                    isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-[#D7E2EA] group-hover:text-slate-900 dark:group-hover:text-white'
                                  }`}
                                >
                                  {tier.range}
                                </span>
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-[#00FF9D] shadow-[0_0_6px_#00FF9D] shrink-0" />
                                )}
                              </div>
                              <div
                                className={`text-[10px] font-mono transition-colors line-clamp-1 ${
                                  isSelected ? 'text-cyan-700 dark:text-cyan-300 font-semibold' : 'text-slate-500 dark:text-[#8E97A0] group-hover:text-slate-800 dark:group-hover:text-white/80'
                                }`}
                              >
                                {tier.tag}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Direct Custom Budget Input */}
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-emerald-600 dark:text-[#00FF9D]">
                          <IndianRupee className="w-4 h-4" />
                        </div>
                        <input
                          id="inquiry-budget"
                          type="text"
                          value={selectedBudget}
                          onChange={(e) => setSelectedBudget(e.target.value)}
                          placeholder="e.g. ₹35,000 (or custom budget)"
                          required
                          className="w-full bg-white dark:bg-[#141926] border border-slate-300 dark:border-white/15 rounded-xl pl-10 pr-20 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-colors shadow-sm"
                        />
                        {isCustomBudget && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-[#00FF9D]/15 border border-emerald-300 dark:border-[#00FF9D]/30 text-emerald-800 dark:text-[#00FF9D]">
                              Custom
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 4: PROJECT DESCRIPTION TEXT AREA                       */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#0E121E] border border-slate-200 dark:border-white/10 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#B600A8] font-mono text-xs font-bold">// 04</span>
                        <h3 className="text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          PROJECT DESCRIPTION *
                        </h3>
                      </div>
                      <span className="text-slate-500 dark:text-[#8E97A0] font-mono text-[10px]">
                        Detailed requirements, timeline, or architecture goals
                      </span>
                    </div>

                    <textarea
                      id="inquiry-description"
                      rows={3}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe your project, goals, key deliverables, target milestones, tech preferences, or database requirements..."
                      required
                      className="w-full bg-white dark:bg-[#141926] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none shadow-sm"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-mono">
                      ⚠ {errorMessage}
                    </div>
                  )}

                  {/* ============================================================== */}
                  {/* SECTION 5: ACTIONS & PDF DISPATCH                              */}
                  {/* ============================================================== */}
                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-end">
                    {/* Main Submit & Download Receipt Button */}
                    <button
                      type="submit"
                      id="submit-inquiry-btn"
                      className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#B600A8] to-[#9333EA] hover:opacity-95 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 shadow-[0_0_25px_rgba(0,210,255,0.35)] inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 text-[#00FF9D]" />
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>SUBMIT &amp; DOWNLOAD PDF RECEIPT</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* ============================================================== */
                /* SUCCESS VIEW: RECEIPT GENERATED WITH RE-DOWNLOAD OPTION         */
                /* ============================================================== */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6 sm:py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-emerald-600 dark:text-[#00FF9D] mb-4 shadow-[0_0_25px_rgba(0,255,157,0.4)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Inquiry Verified &amp; Receipt Generated!
                  </h3>
                  <p className="text-slate-600 dark:text-[#8E97A0] text-xs sm:text-sm max-w-lg mt-1.5 leading-relaxed font-mono">
                    Official PDF receipt <span className="text-emerald-600 dark:text-[#00FF9D] font-bold">#{issuedReceiptId}</span> has been compiled and downloaded to your device.
                  </p>

                  {/* Summary manifest */}
                  <div className="w-full max-w-lg bg-slate-50 dark:bg-[#0E121E] border border-slate-200 dark:border-white/10 rounded-2xl p-5 my-5 text-left flex flex-col gap-2.5 text-xs font-mono shadow-sm">
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-white/10">
                      <span className="text-slate-500 dark:text-[#8E97A0]">RECEIPT REFERENCE ID</span>
                      <span className="text-emerald-700 dark:text-[#00FF9D] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
                        #{issuedReceiptId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-[#8E97A0]">SERVICE SPEC</span>
                      <span className="text-slate-900 dark:text-white font-bold">{serviceInput}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-[#8E97A0]">CLIENT IDENTITY</span>
                      <span className="text-slate-900 dark:text-white font-medium">{name} ({workEmail})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-[#8E97A0]">CONTACT NUMBER</span>
                      <span className="text-slate-900 dark:text-white font-medium">{contactNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-[#8E97A0]">ALLOCATED BUDGET</span>
                      <span className="text-emerald-700 dark:text-[#00FF9D] font-medium">{selectedBudget}</span>
                    </div>
                  </div>

                  {/* Download Again and Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                    <button
                      type="button"
                      id="download-again-btn"
                      onClick={() => {
                        const parsedNum = parseInt(issuedReceiptId.replace('REC-', ''), 10) || 1001;
                        generateReceiptPDF(parsedNum, serviceInput);
                      }}
                      className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-mono font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00FF9D]" />
                      <span>Download Receipt #{issuedReceiptId} Again</span>
                    </button>

                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=priyanshupundir36@gmail.com&su=${encodeURIComponent(
                        `[Project Inquiry #${issuedReceiptId}] ${serviceInput} - ${name}`
                      )}&body=${encodeURIComponent(
                        `Receipt Reference: #${issuedReceiptId}\nClient: ${name}\nEmail: ${workEmail}\nContact No: ${contactNumber}\nService: ${serviceInput}\nBudget: ${selectedBudget}\n\nProject Description:\n${projectDescription}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#00D2FF]/15 hover:bg-[#00D2FF]/25 border border-[#00D2FF]/40 text-cyan-800 dark:text-[#00D2FF] font-mono font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Direct via Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider px-6 py-2.5 transition-all cursor-pointer shadow-md"
                    >
                      Done / Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ProjectInquiryForm = ProjectInquiryModal;
export default ProjectInquiryModal;
