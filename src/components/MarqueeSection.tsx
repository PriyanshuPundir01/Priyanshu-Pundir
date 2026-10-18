import React from 'react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  glowColor: string;
  icon: (color: string) => React.ReactNode;
}

const ROW_1_TECHS: TechItem[] = [
  {
    name: 'React.js',
    category: 'Frontend',
    color: '#00D8FF',
    glowColor: 'rgba(0, 216, 255, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill={c} />
        <g stroke={c} strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Language',
    color: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.9 14.542c-.085 1.54-1.222 2.607-2.905 2.607-1.183 0-2.096-.543-2.618-1.574l1.644-1.026c.264.55.626.83 1.07.83.473 0 .809-.264.809-.64 0-.462-.352-.66-.995-.94l-.568-.247c-1.408-.61-2.062-1.48-2.062-2.738 0-1.638 1.259-2.77 3.003-2.77 1.227 0 2.05.474 2.53 1.464l-1.574.96c-.227-.478-.544-.68-.956-.68-.426 0-.712.247-.712.568 0 .404.288.586.857.83l.568.247c1.558.675 2.215 1.488 2.215 2.75l-.266.332zm8.132-4.52h-2.585v7.01h-2.074v-7.01h-2.584V8.293h7.243v1.729z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Language',
    color: '#F7DF1E',
    glowColor: 'rgba(247, 223, 30, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.825-2.616-.833-.357-1.611-.692-1.611-1.341 0-.573.447-.947 1.218-.947.747 0 1.229.356 1.483.918l1.637-.99c-.439-.997-1.39-1.583-2.92-1.583-1.897 0-3.13 1.168-3.13 2.768 0 1.637 1.066 2.378 2.72 3.078 1.054.445 1.548.783 1.548 1.47 0 .61-.63 1.026-1.503 1.026-1.127 0-1.751-.557-2.096-1.364l-1.66 1.011c.54 1.264 1.748 1.994 3.556 1.994 2.232 0 3.32-1.282 3.32-3.003l-.237-.422zm-7.904-4.593h-1.993v4.618c0 1.082-.53 1.49-1.365 1.49-.691 0-1.157-.358-1.425-.865l-1.637.994c.544 1.139 1.546 1.776 3.062 1.776 1.96 0 3.358-.962 3.358-3.395V13.683z" />
      </svg>
    ),
  },
  {
    name: 'Java',
    category: 'Core & Enterprise',
    color: '#FF6500',
    glowColor: 'rgba(255, 101, 0, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M8.851 18.56s-.917.534.667.715c2.143.244 3.391.205 5.877-.249 0 0 .972.616 2.112.981-5.748 2.502-12.839-.14-8.656-1.447zm-1.077-3.197s-1.077.778.608.973c2.47.288 4.795.311 8.522-.381 0 0 .685.459 1.639.734-6.868 2.327-14.819.349-10.769-1.326zm8.857-5.07c1.078 1.168-1.086 2.451-1.086 2.451s2.784-1.448 1.503-3.111c-1.305-1.698-3.418-2.52-5.462-4.045-.589-.441-1.222-1.01-1.189-1.802.046-1.131.789-1.928.789-1.928s-1.89 1.139-1.815 2.899c.075 1.731 1.621 2.766 2.923 3.593 1.815 1.155 3.518 1.91 4.337 1.943zm-7.669 5.875c-3.194.814-1.096 1.724 1.745 1.743 3.652.025 6.438-.592 6.438-.592s-.657.404-1.536.657c-4.484 1.288-10.597.433-7.553-.945.719-.326.906-.863.906-.863zm7.042-3.866c1.867 1.833-.949 3.684-.949 3.684s3.784-1.986 1.808-4.444c-1.782-2.22-3.924-2.656-5.836-3.821-1.042-.635-1.332-1.39-1.168-2.072.316-1.318 1.975-2.075 1.975-2.075s-2.827.954-3.084 3.013c-.28 2.247 1.353 3.528 2.977 4.636 2.083 1.42 3.681 1.816 4.277 1.078z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Backend / AI',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M11.914 0C5.83 0 6.2 2.64 6.2 2.64l.006 2.735h5.81v.834H3.84S0 5.753 0 11.884c0 6.13 3.35 5.922 3.35 5.922h2V14.99s-.108-3.374 3.315-3.374h5.688s3.21.054 3.21-3.136V3.284S18.067 0 11.914 0zm-3.07 1.83a1.045 1.045 0 1 1 0 2.09 1.045 1.045 0 0 1 0-2.09zm3.242 22.17c6.084 0 5.714-2.64 5.714-2.64l-.006-2.735H11.98v-.834h8.176S24 18.247 24 12.116c0-6.13-3.35-5.922-3.35-5.922h-2v2.816s.108 3.374-3.315 3.374H9.647s-3.21-.054-3.21 3.136v5.202S5.933 24 12.086 24zm3.07-1.83a1.045 1.045 0 1 1 0-2.09 1.045 1.045 0 0 1 0 2.09z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Angular',
    category: 'Frontend',
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M12 0 1.605 3.697l1.585 13.726L12 24l8.81-6.577 1.585-13.726L12 0zm0 2.766 6.84 2.438-1.042 9.034L12 18.318l-5.798-4.08-1.042-9.034L12 2.766zm0 3.328-3.88 8.653h1.834l.808-1.998h2.476l.808 1.998h1.834L12 6.094zm0 2.923.86 2.158h-1.72L12 9.017z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    category: 'Animation',
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    category: 'Build Tool',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M22.095 2.508 12.87 23.32a.75.75 0 0 1-1.378-.01L2.093 3.513a.75.75 0 0 1 .949-.974l9.043 3.197 8.948-3.196a.75.75 0 0 1 1.062.968zM12 7.747 4.793 5.2 12 21.468 19.207 5.2 12 7.747z" />
      </svg>
    ),
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Web Core',
    color: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M1.5 0h21l-1.91 21.492L12 24l-8.59-2.508L1.5 0zm17.15 4.887H5.35l.4 4.502h11.75l-.46 5.176-5.04 1.398-5.04-1.398-.27-3.033H4.44l.49 5.518L12 19.066l7.07-1.961.58-12.218z" />
      </svg>
    ),
  },
];

const ROW_2_TECHS: TechItem[] = [
  {
    name: 'LangChain',
    category: 'AI & RAG',
    color: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    name: 'ChromaDB',
    category: 'Vector Database',
    color: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
        <path d="m3.27 6.96 8.73 4.86 8.73-4.86" />
        <path d="M12 21.84V11.82" />
        <circle cx="12" cy="12" r="3" fill={c} fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Runtime / Backend',
    color: '#4ADE80',
    glowColor: 'rgba(74, 222, 128, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M12 0l10.392 6v12L12 24 1.608 18V6L12 0zm-.92 20.31c4.27 0 6.98-2.12 6.98-5.71 0-3.32-2.17-4.6-5.46-5.2l-1.63-.3c-1.6-.29-2.26-.8-2.26-1.75 0-1.12.98-1.87 2.68-1.87 1.67 0 2.58.62 2.8 1.83h2.38c-.25-2.28-1.98-3.6-5.18-3.6-3.8 0-6.42 2.02-6.42 5.51 0 3.09 2.01 4.54 5.25 5.12l1.62.29c1.78.32 2.45.89 2.45 1.87 0 1.25-1.14 1.99-2.94 1.99-2.02 0-3.03-.79-3.23-2.17H6.1c.21 2.62 2.07 3.99 4.98 3.99z" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'SQL Database',
    color: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    name: 'RESTful APIs',
    category: 'Architecture',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    ),
  },
  {
    name: 'C / C++',
    category: 'Systems Language',
    color: '#00599C',
    glowColor: 'rgba(0, 89, 156, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="m11.5 2.1-9 5.2v10.4l9 5.2 9-5.2V7.3l-9-5.2zm0 2.3 7 4-7 4-7-4 7-4zm-7 5.8 6 3.5v7l-6-3.5V10.2zm8 10.5v-7l6-3.5v7l-6 3.5z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational DB',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M12.025.006c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.025 5.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6.5 12.5h-9v-1.5h9v1.5zm1.5-3.5h-12v-1.5h12v1.5zm0-3.5h-12V9.5h12v1.51z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containerization',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .103.082.186.185.186m-2.953 0h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185H8.076a.185.185 0 0 0-.185.185v1.887c0 .103.083.186.185.186m-2.954 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.122a.185.185 0 0 0-.185.185v1.887c0 .103.083.186.185.186m5.907 2.714h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.953 0h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186H8.076a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.186.186 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.122a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.186.186 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H2.168a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m21.804 1.776c-.538-.368-1.576-.525-2.435-.453-.16-.99-.757-1.802-1.614-2.22l-.534-.26-.356.483c-.496.67-.788 1.488-.857 2.336-.37-.024-.741-.013-1.107.035H.416a.417.417 0 0 0-.416.417 8.01 8.01 0 0 0 2.213 5.48c2.193 2.316 5.46 3.535 9.043 3.535 7.153 0 11.83-4.72 12.716-8.988a3.9 3.9 0 0 0 0-.365z" />
      </svg>
    ),
  },
  {
    name: 'Git & GitHub',
    category: 'Version Control',
    color: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={c}>
        <path d="M2.6 10.59 10.6 2.6c.8-.8 2.08-.8 2.88 0l7.92 7.92c.8.8.8 2.08 0 2.88L13.48 21.4c-.8.8-2.08.8-2.88 0L2.6 13.48a2.03 2.03 0 0 1 0-2.89zm9.4 1.41V8.5a1.5 1.5 0 1 0-1 0v3.5a2.5 2.5 0 1 0 1 0z" />
      </svg>
    ),
  },
  {
    name: 'SQL & Queries',
    category: 'Database Engines',
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    icon: (c) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        <path d="M3 17v2c0 1.66 4 3 9 3s9-1.34 9-3v-2" />
      </svg>
    ),
  },
];

// Double list for 100% gapless continuous marquee loop
const row1Items = [...ROW_1_TECHS, ...ROW_1_TECHS];
const row2Items = [...ROW_2_TECHS, ...ROW_2_TECHS];

export const MarqueeSection: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="relative bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-24 overflow-hidden w-full select-none"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00D2FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#B600A8]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16 text-center flex flex-col items-center">
        {/* Futuristic Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2FF]" />
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#A0AEC0]">
            TECH STACK MATRIX // PRODUCTION TOOLKIT
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
          Technologies &amp; Frameworks
        </h2>

        {/* Subtitle */}
        <p className="text-[#8E97A0] max-w-xl text-sm sm:text-base font-light tracking-wide">
          Engineered for scale, security, and velocity across modern web platforms, full-stack architectures, and AI-driven vector workflows.
        </p>
      </div>

      {/* Marquee Wrapper with Seamless Edge Fade Masks */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 sm:gap-6">
        {/* Left & Right Soft Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-48 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-48 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-20" />

        {/* ============================================================== */}
        {/* ROW 1: Scrolling Left (Frontend, Core Languages, Web)          */}
        {/* ============================================================== */}
        <div className="flex animate-marquee-left gap-4 sm:gap-5">
          {row1Items.map((tech, idx) => (
            <div
              key={`r1-${tech.name}-${idx}`}
              className="group relative flex items-center gap-3.5 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[#13161C]/80 hover:bg-[#1A1F29] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex-shrink-0 cursor-default shadow-lg hover:shadow-2xl hover:-translate-y-1"
              style={{
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`,
              }}
            >
              {/* Dynamic Glow Halo on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${tech.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Icon Container with subtle brand tint */}
              <div
                className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${tech.color}15`,
                  borderColor: `${tech.color}40`,
                }}
              >
                {tech.icon(tech.color)}
              </div>

              {/* Text & Category Pill */}
              <div className="relative z-10 flex flex-col items-start pr-1">
                <span className="font-['Kanit',sans-serif] font-bold text-white text-base sm:text-lg tracking-wide group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md border mt-0.5"
                  style={{
                    backgroundColor: `${tech.color}10`,
                    borderColor: `${tech.color}30`,
                    color: tech.color,
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* ROW 2: Scrolling Right (AI, RAG, Backend, DBs, DevOps)         */}
        {/* ============================================================== */}
        <div className="flex animate-marquee-right gap-4 sm:gap-5">
          {row2Items.map((tech, idx) => (
            <div
              key={`r2-${tech.name}-${idx}`}
              className="group relative flex items-center gap-3.5 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[#13161C]/80 hover:bg-[#1A1F29] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex-shrink-0 cursor-default shadow-lg hover:shadow-2xl hover:-translate-y-1"
              style={{
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`,
              }}
            >
              {/* Dynamic Glow Halo on Hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${tech.glowColor} 0%, transparent 70%)`,
                }}
              />

              {/* Icon Container with subtle brand tint */}
              <div
                className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${tech.color}15`,
                  borderColor: `${tech.color}40`,
                }}
              >
                {tech.icon(tech.color)}
              </div>

              {/* Text & Category Pill */}
              <div className="relative z-10 flex flex-col items-start pr-1">
                <span className="font-['Kanit',sans-serif] font-bold text-white text-base sm:text-lg tracking-wide group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md border mt-0.5"
                  style={{
                    backgroundColor: `${tech.color}10`,
                    borderColor: `${tech.color}30`,
                    color: tech.color,
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
