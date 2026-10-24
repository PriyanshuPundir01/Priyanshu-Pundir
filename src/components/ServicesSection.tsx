import React from 'react';
import FadeIn from './FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: 'Full Stack Web Development',
    description:
      'Engineering responsive, high-performance web applications using React.js, Angular, JavaScript (ES6+), HTML5, and modern CSS3 architectures.',
  },
  {
    number: '02',
    name: 'Backend & RESTful APIs',
    description:
      'Architecting secure backend services and RESTful APIs in Python, Java, and C++, integrated with relational MySQL databases and persistent storage.',
  },
  {
    number: '03',
    name: 'Agentic AI & RAG Architecture',
    description:
      'Deploying autonomous agentic workflows, multi-agent systems, and enterprise Retrieval-Augmented Generation (RAG) platforms using LangChain, LangGraph, NVIDIA embeddings, and ChromaDB vector search.',
  },
  {
    number: '04',
    name: 'Model Context Protocol (MCP) Server Integration',
    description:
      'Designing and deploying custom Model Context Protocol (MCP) servers and clients, bridging LLMs and autonomous agents securely with local tools, enterprise APIs, and contextual data sources.',
  },
  {
    number: '05',
    name: 'Mobile & Cyber Security',
    description:
      'Building native Android apps with Biometric API authentication and implementing cryptographic security protocols including AES-256 encryption.',
  },
  {
    number: '06',
    name: 'Software Testing and Database Validation',
    description:
      'Automating SQL queries for data quality audits across production databases and executing rigorous functional and regression testing cycles.',
  },
];

interface ServicesSectionProps {
  onServiceSelect?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServiceSelect }) => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0 border-t border-slate-200/60 dark:border-transparent shadow-xl dark:shadow-none transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service items list */}
        <div className="w-full flex flex-col">
          {servicesData.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              y={30}
              className={`w-full py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] ${
                index === 0 ? 'border-t' : ''
              }`}
            >
              <div
                onClick={() => onServiceSelect?.(item.name)}
                className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12 transition-all duration-200 ${
                  onServiceSelect ? 'cursor-pointer hover:bg-black/[0.02] -mx-4 px-4 rounded-2xl' : ''
                }`}
              >
                {/* Left: Number */}
                <span
                  className="font-black text-[#0C0C0C] leading-none select-none flex-shrink-0 min-w-[120px] sm:min-w-[160px] md:min-w-[200px] group-hover:text-[#B600A8] transition-colors"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </span>

                {/* Right: Name + Description + Inquiry trigger */}
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="font-medium uppercase text-[#0C0C0C] leading-tight group-hover:text-[#B600A8] transition-colors"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    >
                      {item.name}
                    </h3>

                    {onServiceSelect && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-black/60 group-hover:text-[#B600A8] transition-colors border border-black/15 group-hover:border-[#B600A8] px-3 py-1.5 rounded-full shrink-0">
                        <span>Inquire</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    )}
                  </div>

                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl mt-2 sm:mt-3"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                      opacity: 0.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
