import React, { useState } from 'react';
import FadeIn from './FadeIn';
import { MapPin, Mail, Phone, Github, ArrowRight, ArrowUp, FileText } from 'lucide-react';
import ProjectInquiryModal from './ProjectInquiryModal';
import ResumeModal from './ResumeModal';

interface FooterSectionProps {
  onResumeClick?: () => void;
  onInquiryClick?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onResumeClick,
  onInquiryClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeLocalOpen, setIsResumeLocalOpen] = useState(false);

  const handleInquiryOpen = () => {
    if (onInquiryClick) {
      onInquiryClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleResumeOpen = () => {
    if (onResumeClick) {
      onResumeClick();
    } else {
      setIsResumeLocalOpen(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-12 border-t border-white/10 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Top Header & CTA Row */}
        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
            {/* Left Info */}
            <div className="flex flex-col">
              <span className="text-[#8E97A0] font-medium uppercase tracking-[0.2em] text-xs sm:text-sm">
                FULL STACK DEVELOPER &amp; SOFTWARE ENGINEER
              </span>
              <h3 className="text-white font-extrabold uppercase text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight mt-2.5">
                LET&apos;S BUILD SOMETHING GREAT.
              </h3>
              <h2 className="text-white font-black uppercase text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-none mt-1.5">
                PRIYANSHU PUNDIR
              </h2>
              <p className="text-[#8E97A0] font-normal text-xs sm:text-sm md:text-[15px] max-w-2xl mt-3.5 leading-relaxed">
                Crafting intelligent AI/RAG platforms, resilient full-stack web applications, and
                high-performance backend systems.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 shrink-0 self-start lg:self-center">
              <button
                type="button"
                id="footer-start-project-btn"
                onClick={handleInquiryOpen}
                className="rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 hover:bg-[#D7E2EA] transition-all duration-200 shadow-md hover:scale-[1.02] inline-flex items-center gap-2 cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="view-resume-footer-btn"
                type="button"
                onClick={handleResumeOpen}
                className="relative group overflow-hidden rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/5 text-[#D7E2EA] hover:text-white font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] px-6 py-3.5 hover:bg-[#00D2FF]/15 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2.5"
              >
                {/* Subtle scanline shimmer sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />

                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse shadow-[0_0_8px_#00D2FF]" />
                <FileText className="w-4 h-4 text-[#00D2FF] group-hover:drop-shadow-[0_0_6px_rgba(0,210,255,0.8)] transition-all" />
                <span>VIEW RESUME</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Middle Info Columns Grid (4 columns) */}
        <FadeIn delay={0.2} y={20}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start py-10 border-b border-white/10">
            {/* Column 1: LOCATION (4 cols) */}
            <div className="lg:col-span-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/35 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#F97316]" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#8E97A0] font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  LOCATION
                </h4>
                <p className="text-xs sm:text-sm text-[#D7E2EA] font-normal leading-relaxed">
                  Rawat Vihar, Nathuwawala, Dehradun,
                  <br />
                  248008, India
                </p>
              </div>
            </div>

            {/* Column 2: DIRECT CONTACT (3 cols) */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="text-[#8E97A0] font-bold uppercase tracking-wider text-[11px] mb-2">
                DIRECT CONTACT
              </h4>
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#D7E2EA] font-normal">
                <a
                  href="mailto:priyanshupundir36@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C084FC] shrink-0" />
                  <span>priyanshupundir36@gmail.com</span>
                </a>
                <a
                  href="tel:+919548014400"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>+91 9548014400</span>
                </a>
              </div>
            </div>

            {/* Column 3: PROFILES (2 cols) */}
            <div className="lg:col-span-2 flex flex-col">
              <h4 className="text-[#8E97A0] font-bold uppercase tracking-wider text-[11px] mb-2">
                PROFILES
              </h4>
              <div className="flex items-center gap-5 text-xs sm:text-sm text-[#D7E2EA] font-normal">
                <a
                  href="https://www.linkedin.com/in/priyanshupundir01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <div className="w-4 h-4 rounded-[3px] bg-[#0A66C2] flex items-center justify-center text-white text-[10px] font-bold leading-none shrink-0">
                    in
                  </div>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/PriyanshuPundir01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-white shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Column 4: AVAILABILITY BADGE (3 cols) */}
            <div className="lg:col-span-3 flex lg:justify-end items-start pt-0.5">
              <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#D7E2EA]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                </span>
                <span>AVAILABLE FOR SELECT PROJECTS</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Copyright, Credits & Back to Top Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E97A0] font-light">
          <p>© 2026 Priyanshu Pundir. All rights reserved.</p>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <p className="text-center sm:text-right">
              Designed &amp; Engineered with React, Framer Motion &amp; Tailwind CSS
            </p>
            <button
              onClick={scrollToTop}
              className="rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-3.5 py-1.5 text-[11px] uppercase font-medium tracking-wider inline-flex items-center gap-1.5 transition-all hover:border-white/40 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <ProjectInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeLocalOpen}
        onClose={() => setIsResumeLocalOpen(false)}
      />
    </footer>
  );
};

export default FooterSection;
