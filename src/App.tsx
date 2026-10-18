import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';
import ResumeModal from './components/ResumeModal';
import ProjectInquiryModal from './components/ProjectInquiryModal';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedInquiryService, setSelectedInquiryService] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (serviceName?: string) => {
    setSelectedInquiryService(serviceName);
    setIsInquiryModalOpen(true);
  };

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen selection:bg-[#B600A8]/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section */}
      <HeroSection
        onResumeClick={() => setIsResumeModalOpen(true)}
        onContactClick={() => handleOpenInquiry()}
      />

      {/* 2. Tech Stack Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={() => handleOpenInquiry()} />

      {/* 4. Services Section with Direct Inquire Trigger */}
      <ServicesSection onServiceSelect={(serviceName) => handleOpenInquiry(serviceName)} />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Footer / Contact Anchor */}
      <FooterSection
        onResumeClick={() => setIsResumeModalOpen(true)}
        onInquiryClick={() => handleOpenInquiry()}
      />

      {/* Interactive In-Portfolio Resume Modal with Download */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Interactive Project Inquiry Form Modal with PDF Receipt */}
      <ProjectInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialService={selectedInquiryService}
      />
    </div>
  );
};

export default App;
