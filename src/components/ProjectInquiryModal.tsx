import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Layers,
  Code2,
  Cpu,
  Shield,
  Database,
  Send,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronDown,
  Hash,
  DollarSign,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { jsPDF } from 'jspdf';

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
    id: 'ai-rag-solutions',
    number: '03',
    title: 'AI & RAG Solutions',
    category: 'INTELLIGENCE PLATFORMS',
    shortDesc:
      'Deploying enterprise Retrieval-Augmented Generation (RAG) platforms using LangChain, Streamlit, NVIDIA embeddings, and ChromaDB vector search.',
    icon: Cpu,
    techTags: ['LangChain', 'ChromaDB', 'NVIDIA Embeddings', 'Vector Search', 'Python', 'Streamlit'],
  },
  {
    id: 'mobile-cyber-security',
    number: '04',
    title: 'Mobile & Cyber Security',
    category: 'SECURITY & MOBILE',
    shortDesc:
      'Building native Android apps with Biometric API authentication and implementing cryptographic security protocols including AES-256 encryption.',
    icon: Shield,
    techTags: ['Android', 'Kotlin', 'Java', 'Biometric API', 'AES-256', 'Cryptography'],
  },
  {
    id: 'software-testing-database-validation',
    number: '05',
    title: 'Software Testing and Database Validation',
    category: 'QUALITY ASSURANCE',
    shortDesc:
      'Automating SQL queries for data quality audits across production databases and executing rigorous functional and regression testing cycles.',
    icon: Database,
    techTags: ['SQL Audits', 'Database QA', 'Regression Testing', 'Postman', 'Quality Benchmarking'],
  },
];

const SUGGESTED_BUDGETS = [
  '<$1,500 (Rapid MVP)',
  '$1,500 – $3,500 (Production System)',
  '$3,500 – $7,500 (Enterprise Scale)',
  '$7,500+ (Full Suite & Retainer)',
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
  // 1. Service Selection State (combines dropdown + editable field)
  const defaultService = PORTFOLIO_SERVICES[0].title;
  const [selectedDropdownService, setSelectedDropdownService] = useState<string>(
    initialService || defaultService
  );
  const [editableService, setEditableService] = useState<string>(
    initialService || defaultService
  );

  // 2. Input Fields
  const [name, setName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [budget, setBudget] = useState<string>('$1,500 – $3,500 (Production System)');
  const [projectDescription, setProjectDescription] = useState<string>('');

  // 3. Sequentially Incrementing Receipt Number
  const [receiptNumber, setReceiptNumber] = useState<number>(() => {
    const saved = localStorage.getItem('priyanshu_portfolio_receipt_seq');
    if (saved) {
      const parsed = parseInt(saved, 10);
      return !isNaN(parsed) && parsed >= 1001 ? parsed : 1001;
    }
    return 1001;
  });

  // 4. Modal and feedback state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [issuedReceiptId, setIssuedReceiptId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sync initialService when provided or modal opened
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setSelectedDropdownService(initialService);
        setEditableService(initialService);
      }
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
  }, [isOpen, initialService, onClose]);

  // Handle dropdown selection: updates both the dropdown state and editable field
  const handleDropdownChange = (serviceTitle: string) => {
    setSelectedDropdownService(serviceTitle);
    setEditableService(serviceTitle);
  };

  // Select service via card click
  const handleCardClick = (serviceTitle: string) => {
    setSelectedDropdownService(serviceTitle);
    setEditableService(serviceTitle);
  };

  // Generate and Download PDF Receipt
  const generateReceiptPDF = (
    currentSeqNum: number,
    receiptServiceName: string,
    isManualPreview = false
  ) => {
    try {
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

      // Top Right: Unique Sequential Receipt Number
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(isManualPreview ? 'INQUIRY RECEIPT (DRAFT PREVIEW)' : 'OFFICIAL INQUIRY RECEIPT', 194, 16, {
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
      doc.text(name.trim() || 'Client (Unspecified)', 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Work Email Address:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(accentPurple[0], accentPurple[1], accentPurple[2]);
      doc.text(workEmail.trim() || 'Not Provided', 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Contact Number / Phone:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(contactNumber.trim() || 'Not Provided', 62, y);

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
      doc.text(receiptServiceName || defaultService, 62, y);

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text('Budget Allocation:', 18, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(budget.trim() || 'Flexible / To be discussed', 62, y);

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
        projectDescription.trim() || 'No additional project description provided.',
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

    // Field Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name or company name.');
      return;
    }
    if (!workEmail.trim() || !workEmail.includes('@')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!contactNumber.trim()) {
      setErrorMessage('Please provide a contact phone / WhatsApp number.');
      return;
    }
    if (!budget.trim()) {
      setErrorMessage('Please specify an estimated project budget.');
      return;
    }
    if (!projectDescription.trim()) {
      setErrorMessage('Please provide a brief description of your project.');
      return;
    }

    const currentSeq = receiptNumber;
    const formattedId = `REC-${currentSeq}`;
    setIssuedReceiptId(formattedId);

    const finalService = editableService.trim() || selectedDropdownService || defaultService;

    // 1. Download official PDF receipt
    generateReceiptPDF(currentSeq, finalService, false);

    // 2. Increment sequential receipt number and persist in localStorage
    const nextSeq = currentSeq + 1;
    setReceiptNumber(nextSeq);
    localStorage.setItem('priyanshu_portfolio_receipt_seq', nextSeq.toString());

    // 3. Switch to success screen
    setIsSubmitted(true);
  };

  // Manual Draft Download (allows user to test PDF receipt right away)
  const handleManualDownloadPreview = () => {
    const finalService = editableService.trim() || selectedDropdownService || defaultService;
    generateReceiptPDF(receiptNumber, finalService, true);
  };

  // Reset form
  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedDropdownService(defaultService);
    setEditableService(defaultService);
    setName('');
    setWorkEmail('');
    setContactNumber('');
    setBudget('$1,500 – $3,500 (Production System)');
    setProjectDescription('');
    setErrorMessage('');
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
            className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
          />

          {/* Futuristic Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#0B0D14] border border-[#B600A8]/30 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(182,0,168,0.25),0_25px_60px_rgba(0,0,0,0.95)] p-5 sm:p-7 md:p-8 text-[#D7E2EA] z-10 select-none max-h-[92vh] overflow-y-auto flex flex-col justify-between [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#B600A8]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#07090F]"
          >
            <div>
              {/* Header with Live Sequential Receipt Badge */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <span className="font-black text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#B600A8] to-[#FF007A] leading-none select-none tracking-tight shrink-0 drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                    // 01
                  </span>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-white font-black uppercase text-xl sm:text-2xl md:text-3xl tracking-tight leading-none truncate">
                        PROJECT INQUIRY FORM
                      </h2>
                      {/* Sequential Receipt Chip */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 text-[#00D2FF] font-mono text-[10px] sm:text-xs font-bold tracking-wider shadow-sm">
                        <Hash className="w-3 h-3 text-[#00FF9D]" />
                        <span>NEXT RECEIPT #{receiptNumber}</span>
                      </span>
                    </div>
                    <span className="text-[#8E97A0] font-mono uppercase text-[10px] sm:text-xs tracking-[0.2em] mt-1 truncate">
                      SELECT FROM 5 PORTFOLIO SERVICES • EDITABLE SPECIFICATION • PDF RECEIPT
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="close-inquiry-modal-btn"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Header Banner */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#120F24]/60 p-4 sm:p-5 relative overflow-hidden shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF9D]" />
                    </span>
                    <span className="text-white font-bold uppercase tracking-wider">
                      SYSTEM READY // DIRECT INTAKE REGISTRY
                    </span>
                  </div>
                  <div className="text-[#00D2FF]">
                    SEQUENTIAL RECEIPT DISPATCH:{' '}
                    <span className="text-[#00FF9D] font-bold">#REC-{receiptNumber}</span>
                  </div>
                </div>
                <p className="text-[#D7E2EA] text-xs sm:text-sm font-light leading-relaxed">
                  Choose from Priyanshu&apos;s 5 core portfolio services via dropdown or select cards below. The service name will automatically populate the editable specification field. An official PDF receipt with sequential tracking number <strong className="text-[#00D2FF]">#REC-{receiptNumber}</strong> will be generated upon dispatch.
                </p>
              </div>

              {/* Form Content */}
              {!isSubmitted ? (
                <form id="project-inquiry-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
                  {/* ============================================================== */}
                  {/* SECTION 1: THE 5 SERVICES FROM PORTFOLIO (Grid + Dropdown + Input) */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-[#0E121E] border border-white/10 p-4 sm:p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#B600A8] font-mono text-xs font-bold">// 01</span>
                        <h3 className="text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          PORTFOLIO SERVICES SELECTION &amp; EDITABLE SPECIFICATION
                        </h3>
                      </div>
                      <span className="text-[#8E97A0] font-mono text-[11px]">
                        5 Core Services Listed
                      </span>
                    </div>

                    {/* Interactive 5 Services Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {PORTFOLIO_SERVICES.map((srv) => {
                        const IconComp = srv.icon;
                        const isSelected =
                          selectedDropdownService === srv.title ||
                          editableService.toLowerCase().includes(srv.title.toLowerCase());
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleCardClick(srv.title)}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] group relative ${
                              isSelected
                                ? 'border-[#00D2FF] bg-[#00D2FF]/15 shadow-[0_0_15px_rgba(0,210,255,0.25)] ring-1 ring-[#00D2FF]'
                                : 'border-white/10 bg-[#131826] hover:border-white/20 hover:bg-[#181E30]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono text-[#8E97A0] group-hover:text-cyan-300 transition-colors">
                                {srv.number}
                              </span>
                              <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-[#00D2FF] text-black shadow-sm'
                                    : 'bg-white/5 text-[#8E97A0] group-hover:text-white'
                                }`}
                              >
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            </div>

                            <div>
                              <h4
                                className={`text-[11px] sm:text-xs font-bold leading-tight ${
                                  isSelected ? 'text-white' : 'text-[#D7E2EA] group-hover:text-white'
                                }`}
                              >
                                {srv.title}
                              </h4>
                              <p className="text-[9px] text-[#8E97A0] line-clamp-1 mt-0.5">
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

                    {/* DUAL INTERACTION: Dropdown Selector + Editable Text Field */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {/* 1. Dropdown Selection populated with the 5 services */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="service-dropdown-select"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00D2FF] flex items-center gap-1.5"
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-[#00D2FF]" />
                          <span>CHOOSE SERVICE (DROPDOWN SELECTION):</span>
                        </label>
                        <div className="relative">
                          <select
                            id="service-dropdown-select"
                            value={selectedDropdownService}
                            onChange={(e) => handleDropdownChange(e.target.value)}
                            className="w-full bg-[#141926] border border-cyan-400/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors appearance-none cursor-pointer pr-10"
                          >
                            {PORTFOLIO_SERVICES.map((s) => (
                              <option key={s.id} value={s.title} className="bg-[#0B0D14] text-white">
                                {s.number}. {s.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-white/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* 2. Editable Text Field Populated With These Options */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="editable-service-input"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B600A8] flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#B600A8]" />
                          <span>EDITABLE SERVICE SPECIFICATION:</span>
                        </label>
                        <input
                          id="editable-service-input"
                          type="text"
                          value={editableService}
                          onChange={(e) => setEditableService(e.target.value)}
                          placeholder="Select from dropdown or customize service..."
                          className="w-full bg-[#141926] border border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 2: CLIENT INPUT FIELDS (Name, Work Email, Contact No.) */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-[#0E121E] border border-white/10 p-4 sm:p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono text-xs font-bold">// 02</span>
                      <h3 className="text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                        CLIENT CONTACT INFORMATION
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-name"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5"
                        >
                          <User className="w-3 h-3 text-[#00D2FF]" />
                          <span>FULL NAME / ORG *</span>
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Priyanshu Pundir"
                          required
                          className="w-full bg-[#141926] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors"
                        />
                      </div>

                      {/* Work Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-email"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3 text-[#B600A8]" />
                          <span>WORK EMAIL *</span>
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="client@organization.com"
                          required
                          className="w-full bg-[#141926] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-colors"
                        />
                      </div>

                      {/* Contact Number Input */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="inquiry-phone"
                          className="text-[11px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-[#00FF9D]" />
                          <span>CONTACT NUMBER *</span>
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="+91 9548014400"
                          required
                          className="w-full bg-[#141926] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 3: BUDGET INPUT FIELD & PRESETS                        */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-[#0E121E] border border-white/10 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00FF9D] font-mono text-xs font-bold">// 03</span>
                        <h3 className="text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          BUDGET ALLOCATION *
                        </h3>
                      </div>
                      <span className="text-[#8E97A0] font-mono text-[10px]">
                        Select preset tier or enter custom budget
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {/* Presets */}
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_BUDGETS.map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBudget(tier)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                              budget === tier
                                ? 'bg-gradient-to-r from-[#00D2FF] to-[#0284C7] text-black font-bold shadow-[0_0_12px_rgba(0,210,255,0.4)]'
                                : 'bg-[#141926] border border-white/10 text-[#D7E2EA] hover:border-white/20'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>

                      {/* Direct Budget Input */}
                      <div className="relative mt-1">
                        <DollarSign className="w-4 h-4 text-[#00FF9D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="inquiry-budget"
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g. $2,500, €3,000, ₹1,50,000, or Ongoing Retainer"
                          required
                          className="w-full bg-[#141926] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* SECTION 4: PROJECT DESCRIPTION TEXT AREA                       */}
                  {/* ============================================================== */}
                  <div className="rounded-2xl bg-[#0E121E] border border-white/10 p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#B600A8] font-mono text-xs font-bold">// 04</span>
                        <h3 className="text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                          PROJECT DESCRIPTION *
                        </h3>
                      </div>
                      <span className="text-[#8E97A0] font-mono text-[10px]">
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
                      className="w-full bg-[#141926] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-colors resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono">
                      ⚠ {errorMessage}
                    </div>
                  )}

                  {/* ============================================================== */}
                  {/* SECTION 5: ACTIONS & DOWNLOAD OPTION                           */}
                  {/* ============================================================== */}
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Developer Direct Contacts */}
                    <div className="flex items-center gap-3 text-xs font-mono text-[#8E97A0]">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>priyanshupundir36@gmail.com</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#00FF9D]" />
                        <span>+91 9548014400</span>
                      </div>
                    </div>

                    {/* Action Buttons: Preview PDF + Submit & Generate Receipt */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                      {/* Direct PDF Draft Download Button */}
                      <button
                        type="button"
                        id="download-preview-btn"
                        onClick={handleManualDownloadPreview}
                        className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider px-4 py-3 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        title="Download sample PDF receipt based on current inputs"
                      >
                        <Download className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>Download PDF Preview</span>
                      </button>

                      {/* Main Submit & Download Receipt Button */}
                      <button
                        type="submit"
                        id="submit-inquiry-btn"
                        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#B600A8] to-[#9333EA] hover:opacity-95 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 shadow-[0_0_25px_rgba(0,210,255,0.35)] inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Download className="w-4 h-4 text-[#00FF9D]" />
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>SUBMIT &amp; DOWNLOAD RECEIPT #{receiptNumber}</span>
                      </button>
                    </div>
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
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-[#00FF9D] mb-4 shadow-[0_0_25px_rgba(0,255,157,0.4)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Inquiry Verified &amp; Receipt Generated!
                  </h3>
                  <p className="text-[#8E97A0] text-xs sm:text-sm max-w-lg mt-1.5 leading-relaxed font-mono">
                    Official PDF receipt <span className="text-[#00FF9D] font-bold">#{issuedReceiptId}</span> has been compiled and downloaded to your device.
                  </p>

                  {/* Summary manifest */}
                  <div className="w-full max-w-lg bg-[#0E121E] border border-white/10 rounded-2xl p-5 my-5 text-left flex flex-col gap-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                      <span className="text-[#8E97A0]">RECEIPT REFERENCE ID</span>
                      <span className="text-[#00FF9D] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
                        #{issuedReceiptId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E97A0]">NEXT QUEUE ID</span>
                      <span className="text-[#00D2FF] font-bold">#REC-{receiptNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E97A0]">SERVICE SPEC</span>
                      <span className="text-white font-bold">{editableService}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E97A0]">CLIENT IDENTITY</span>
                      <span className="text-white font-medium">{name} ({workEmail})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E97A0]">CONTACT NUMBER</span>
                      <span className="text-white font-medium">{contactNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#8E97A0]">ALLOCATED BUDGET</span>
                      <span className="text-[#00FF9D] font-medium">{budget}</span>
                    </div>
                  </div>

                  {/* Download Again and Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                    <button
                      type="button"
                      id="download-again-btn"
                      onClick={() => {
                        const parsedNum = parseInt(issuedReceiptId.replace('REC-', ''), 10) || 1001;
                        generateReceiptPDF(parsedNum, editableService, false);
                      }}
                      className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00FF9D]" />
                      <span>Download Receipt #{issuedReceiptId} Again</span>
                    </button>

                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=priyanshupundir36@gmail.com&su=${encodeURIComponent(
                        `[Project Inquiry #${issuedReceiptId}] ${editableService} - ${name}`
                      )}&body=${encodeURIComponent(
                        `Receipt Reference: #${issuedReceiptId}\nClient: ${name}\nEmail: ${workEmail}\nContact No: ${contactNumber}\nService: ${editableService}\nBudget: ${budget}\n\nProject Description:\n${projectDescription}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#00D2FF]/20 hover:bg-[#00D2FF]/30 border border-[#00D2FF]/40 text-[#00D2FF] font-mono font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Direct via Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider px-6 py-2.5 hover:bg-gray-200 transition-all cursor-pointer shadow-md"
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

export default ProjectInquiryModal;
