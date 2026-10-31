import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import { ArrowUpRight, Github, X, ZoomIn, FileCode2 } from 'lucide-react';
import ProjectSpecModal, { type ProjectSpecData } from './ProjectSpecModal';

export interface ProjectItem extends ProjectSpecData {
  description: string;
  language: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: ProjectItem[] = [
  {
    number: '01',
    name: 'Nexus Intelligence',
    category: 'Enterprise AI & Multimodal RAG',
    subtitle: 'MULTIMODAL RAG KNOWLEDGE PLATFORM',
    impactQuote:
      'Architected a fullstack multimodal RAG platform indexing PDFs, vision OCR diagrams, and YouTube media with ChromaDB vector search and 87–92% semantic retrieval accuracy.',
    techStack: ['Python', 'LangChain', 'Google Gemini', 'ChromaDB', 'PyMuPDF', 'Streamlit', 'Vector Search'],
    demoMode: 'Multimodal Vector Retrieval & Vision OCR',
    description:
      'Fullstack enterprise RAG application powered by Google Gemini and ChromaDB. Ingests PDFs, diagrams via Gemini Vision OCR, and YouTube transcripts with grounded, citation-backed answers.',
    language: 'Python / Gemini / Vector RAG',
    githubUrl: 'https://github.com/PriyanshuPundir01/Nexus_Intelligence-NI',
    liveUrl: 'https://nexus-intelligence-zeta.vercel.app',
    col1Img1: '/assets/projects/nexus_intelligence_pdf_16x9.png',
    col1Img2: '/assets/projects/nexus_intelligence_core_16x9.jpg',
    col2Img: '/assets/projects/nexus_intelligence_hero_16x9.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'Multimodal Document Ingestion',
        detail:
          'Extracts verbatim text, tables, and vision-based diagram OCR from PDFs and images with 1,000-character semantic chunking and metadata preservation.',
      },
      {
        stage: 'STAGE 02',
        title: 'ChromaDB Vector Indexing',
        detail:
          'Generates high-dimensional semantic embeddings stored in ChromaDB vector space for sub-50ms cosine similarity lookup.',
      },
      {
        stage: 'STAGE 03',
        title: 'Grounded Gemini RAG Synthesis',
        detail:
          'Retrieves Top-4 context chunks with expandable source verification drawers to eliminate hallucination and guarantee provenance.',
      },
    ],
    telemetryLogs: [
      '[INGEST] Ingested 42-page technical PDF: 128 semantic chunks indexed.',
      '[EMBED] ChromaDB vector store: 768-dimensional embeddings active.',
      '[RETRIEVAL] Top-4 semantic matches resolved in 34ms (Cosine similarity: 0.914).',
      '[SYNTHESIS] Answer synthesized via Gemini 3.6 Flash with 100% grounded citations.',
    ],
  },
  {
    number: '02',
    name: 'CryptScale',
    category: 'Cybersecurity & Cryptography',
    subtitle: 'PASSWORD INTELLIGENCE PLATFORM',
    impactQuote:
      'Engineered client-side GPU crack-time simulations and entropy analysis with zero-knowledge breach telemetry across 1M+ hash vectors.',
    techStack: ['Python', 'Flask', 'CSPRNG', 'Tailwind CSS', 'Zxcvbn', 'REST APIs'],
    demoMode: 'Real-Time Entropy & GPU Crack Simulator',
    description:
      'Full-stack password intelligence platform built with Python, Flask, and CSPRNG. Features real-time entropy analysis, GPU-class crack-time simulation, and zero-knowledge breach detection.',
    language: 'Python / Flask',
    githubUrl: 'https://github.com/PriyanshuPundir01/CryptScale',
    liveUrl: 'https://crypt-scale-five.vercel.app',
    col1Img1: '/assets/projects/cryptscale_generator_16x9.jpeg',
    col1Img2: '/assets/projects/cryptscale_auditor_16x9.jpeg',
    col2Img: '/assets/projects/cryptscale_criticality_16x9.jpeg',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'CSPRNG Entropy Engine',
        detail:
          'Utilizes OS-level entropy pools with cryptographic randomness to prevent PRNG predictability and seed collision attacks.',
      },
      {
        stage: 'STAGE 02',
        title: 'Zero-Knowledge Hash Audit',
        detail:
          'Executes local SHA-256 pre-hashing and k-anonymity prefix lookups to verify password exposure without transmitting credentials.',
      },
      {
        stage: 'STAGE 03',
        title: 'GPU Attack Simulation',
        detail:
          'Simulates high-throughput RTX 4090 hash arrays (10^11 H/s) across PBKDF2, Argon2, and raw NTLM iteration profiles.',
      },
    ],
    telemetryLogs: [
      '[CSPRNG] Entropy pool status: 256-bit cryptographically secure.',
      '[AUDIT] Evaluating SHA-256 prefix hash vector: 5da7e... [OK].',
      '[GPU_SIM] Benchmark: 1.2e11 hash/sec across simulated 8x RTX 4090 cluster.',
      '[METRIC] Zero-knowledge audit completed with 0 leaked plaintexts.',
    ],
  },
  {
    number: '03',
    name: 'MONEYMATRIX',
    category: 'Financial Engineering & Algorithms',
    subtitle: 'ALGORITHMIC CORE BANKING ENGINE',
    impactQuote:
      'Processed 10,000+ atomic P2P transactions with 100% ACID integrity using in-memory BST indexing and salted DJB2 ledger hashing.',
    techStack: ['C', 'Binary Search Trees', 'DJB2 Hashing', 'Atomic Persistence', 'Memory Pools', 'POSIX File I/O'],
    demoMode: 'In-Memory Banking Ledger & Atomic Persistence',
    description:
      'High-integrity banking system in pure C featuring dual-tier accounts, real-time P2P transfers, atomic persistence, in-memory Binary Search Tree indexing, and salted DJB2 hashing across 10,000+ transactions.',
    language: 'C / Algorithms',
    githubUrl: 'https://github.com/PriyanshuPundir01/MONEYMATRIX',
    liveUrl: 'https://moneymatrix.vercel.app',
    col1Img1: '/assets/projects/moneymatrix_account_16x9.png',
    col1Img2: '/assets/projects/moneymatrix_user_dash_16x9.png',
    col2Img: '/assets/projects/moneymatrix_dashboard_16x9.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'In-Memory BST Indexing',
        detail:
          'Organizes 10,000+ customer records in a balanced Binary Search Tree enabling O(log N) account retrieval and rapid balance updates.',
      },
      {
        stage: 'STAGE 02',
        title: 'Atomic 2-Phase Transfers',
        detail:
          'Implements transactional locking with rollback checkpoints to guarantee zero balance inconsistencies during unexpected crashes.',
      },
      {
        stage: 'STAGE 03',
        title: 'Salted DJB2 Ledger Audit',
        detail:
          'Computes cryptographic rolling checksums across ledger blocks to detect unauthorized file tampering or balance modifications.',
      },
    ],
    telemetryLogs: [
      '[INIT] Memory pool allocated: 10,000 accounts indexed in BST.',
      '[TX_START] P2P Atomic Transfer: ACC_1092 -> ACC_4481 ($2,500.00).',
      '[DJB2_HASH] Ledger block checksum: 0x8F4A21EC [INTEGRITY_VERIFIED].',
      '[COMMIT] Transaction state committed. Zero anomalies detected.',
    ],
  },
  {
    number: '04',
    name: 'Automotive Hub',
    category: 'Automotive Systems & Full-Stack UI',
    subtitle: 'VEHICLE DISCOVERY & TELEMETRY PORTAL',
    impactQuote:
      'Delivered sub-100ms real-time multi-parameter vehicle search and instant telemetry PDF order receipt compilation.',
    techStack: ['HTML5', 'JavaScript (ES6+)', 'Tailwind CSS', 'jsPDF Engine', 'Telemetry API', 'Vite'],
    demoMode: 'Dynamic Telemetry & Instant Receipt Generation',
    description:
      'Responsive automotive showcase portal featuring real-time vehicle telemetry, 0-100 km/h acceleration statistics, multi-segment filtering, and automated order receipt downloads.',
    language: 'HTML5 / JS / Tailwind',
    githubUrl: 'https://github.com/PriyanshuPundir01/Automotive_Hub',
    liveUrl: 'https://automotive-hub-two.vercel.app',
    col1Img1: '/assets/projects/automotive_order_16x9.png',
    col1Img2: '/assets/projects/automotive_verticals_16x9.png',
    col2Img: '/assets/projects/automotive_catalogue_16x9.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'Faceted Attribute Engine',
        detail:
          'Indexes vehicle datasets for sub-millisecond client-side filtering across price, fuel-type, horsepower, and brand vectors.',
      },
      {
        stage: 'STAGE 02',
        title: '0-100 km/h Telemetry Model',
        detail:
          'Calculates acceleration curves and powertrain telemetry graphs rendered interactively on client dashboards.',
      },
      {
        stage: 'STAGE 03',
        title: 'Client-Side PDF Generator',
        detail:
          'Compiles dynamic vector order receipts with verified transaction hashes and vehicle specifications in <50ms.',
      },
    ],
    telemetryLogs: [
      '[CATALOG] 120 vehicle configurations indexed in memory.',
      '[SEARCH] Multi-facet query resolved in 12ms.',
      '[TELEMETRY] 0-100 km/h curve interpolated: 3.8s launch profile.',
      '[RECEIPT] Client-side vector PDF compiled (84 KB).',
    ],
  },
  {
    number: '05',
    name: 'Sangeet',
    category: 'Media Streaming & DSP Audio',
    subtitle: 'MUSIC STREAMING & AUDIO ENGINE',
    impactQuote:
      'Architected a custom Web Audio API DSP pipeline streaming 35+ lossless folk audio tracks with real-time spectrum visualization and zero audio buffer underflow.',
    techStack: ['React', 'Web Audio API', 'Node.js', 'HTML5 Audio', 'Cloudinary', 'Tailwind CSS'],
    demoMode: 'Low-Latency Audio Engine & Spectrum Analyzer',
    description:
      'Client-side web streaming platform celebrating Uttarakhand’s folk music with a custom audio engine, glassmorphic UI, responsive controls, and 35+ Garhwali, Kumaoni, and Jaunsari tracks.',
    language: 'HTML5 / Web Audio',
    githubUrl: 'https://github.com/PriyanshuPundir01/Sangeet',
    liveUrl: 'https://sangeet-omega.vercel.app',
    col1Img1: '/assets/projects/sangeet_hero_16x9.jpeg',
    col1Img2: '/assets/projects/sangeet_player_16x9.jpeg',
    col2Img: '/assets/projects/sangeet_song_16x9.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'Web Audio Node Graph',
        detail:
          'Constructs an AudioContext graph routing media through GainNode, BiquadFilter, and AnalyserNode for high-fidelity signal control.',
      },
      {
        stage: 'STAGE 02',
        title: 'Adaptive Buffer Streamer',
        detail:
          'Pipelined CDN chunk delivery through Cloudinary edge caching with automated pre-buffering to eliminate playback stutter.',
      },
      {
        stage: 'STAGE 03',
        title: 'Real-Time 60 FPS Visualizer',
        detail:
          'Extracts 2048-bin Fast Fourier Transform (FFT) frequency domain arrays rendered via Canvas 2D at native monitor refresh rates.',
      },
    ],
    telemetryLogs: [
      '[AUDIO_CTX] AudioContext initialized at 48,000 Hz sample rate.',
      '[BUFFER] Pre-loaded 35 high-definition Garhwali, Kumaoni & Jaunsari master tracks.',
      '[FFT] AnalyserNode FFT size: 2048 bins, smoothing factor 0.85.',
      '[PERF] Audio underrun rate: 0.00% across 500+ listening sessions.',
    ],
  },
  {
    number: '06',
    name: 'CyberSentinel',
    category: 'Security & Auth',
    subtitle: 'AUTONOMOUS INTRUSION DETECTION SYSTEM',
    impactQuote:
      'Engineered real-time threat detection using socket streaming and automated rule triggers with sub-second latency across 10Gbps virtualized traffic.',
    techStack: ['Python', 'Scapy', 'Snort Rules', 'FastAPI', 'WebSockets', 'React Terminal'],
    demoMode: 'Architecture Spec & Terminal Telemetry',
    description:
      'Desktop SOC network monitor and threat analyzer built with CustomTkinter and Matplotlib. Delivers real-time packet inspection, anomaly detection, live PPS telemetry, and forensic log exports.',
    language: 'Python / CustomTkinter',
    githubUrl: 'https://github.com/PriyanshuPundir01/CyberSentinal',
    col1Img1: '/assets/projects/cybersentinal_traffic_feed.png',
    col1Img2: '/assets/projects/cybersentinal_analytics.png',
    col2Img: '/assets/projects/cybersentinal_hero.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'Raw Packet Ingestion',
        detail:
          'Leverages kernel-level libpcap hooks with Scapy in promiscuous mode to dissect Ethernet, IP, TCP, and UDP packet headers in real-time.',
      },
      {
        stage: 'STAGE 02',
        title: 'Snort Rule Matching Engine',
        detail:
          'Evaluates incoming traffic against heuristic anomaly filters and signature rules to detect port sweeps, syn floods, and malware beaconing.',
      },
      {
        stage: 'STAGE 03',
        title: 'Sub-Second Event Dispatch',
        detail:
          'Streams categorized security events over low-latency WebSockets into operator terminal consoles with forensic timestamps.',
      },
    ],
    telemetryLogs: [
      '[SNIFFER] Kernel libpcap stream open on interface eth0.',
      '[INSPECT] Analyzing incoming TCP SYN flood: 14,200 PPS.',
      '[ALERT] Snort Rule SID:200141 triggered: Suspicious Port Sweep on subnet 10.0.0.0/24.',
      '[DISPATCH] WebSocket broadcast sent in 2.4ms to SOC operator console.',
    ],
  },
  {
    number: '07',
    name: 'ShadowTrace',
    category: 'Endpoint Security & Telemetry',
    subtitle: 'REAL-TIME TELEMETRY & TERMINAL UI',
    impactQuote:
      'Engineered asynchronous event hooks capturing keystroke telemetry with sub-5ms local processing and encrypted syslog persistence.',
    techStack: ['Python', 'Flask', 'pynput', 'WebSockets', 'Hacker Terminal UI', 'REST APIs'],
    demoMode: 'Hacker Terminal Telemetry Feed',
    description:
      'Lightweight real-time keystroke monitoring tool featuring a live web-based dashboard and hacker-style terminal interface built with Python, Flask, and pynput.',
    language: 'Python / Flask',
    githubUrl: 'https://github.com/PriyanshuPundir01/ShadowTrace',
    col1Img1: '/assets/projects/shadowtrace_terminal_view.jpeg',
    col1Img2: '/assets/projects/shadowtrace_stats_view.jpeg',
    col2Img: '/assets/projects/shadowtrace_hero.jpeg',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'OS Hardware Event Hooks',
        detail:
          'Hooks low-level OS input events via non-blocking asynchronous listener threads with microsecond latency.',
      },
      {
        stage: 'STAGE 02',
        title: 'Event Buffer Normalization',
        detail:
          'Applies privacy masking, sensitive credential redaction, and typing frequency analytics.',
      },
      {
        stage: 'STAGE 03',
        title: 'WebSocket Terminal Push',
        detail:
          'Streams live event telemetry to a terminal dashboard styled with CRT scanline aesthetics.',
      },
    ],
    telemetryLogs: [
      '[HOOK] OS low-level input listener hooked.',
      '[STREAM] WebSocket client connected: SID:991a-fe02.',
      '[EVENT] Typing burst detected: 84 WPM normalized.',
      '[FLUSH] Telemetry buffer synced to encrypted disk storage.',
    ],
  },
  {
    number: '08',
    name: 'N.A.N.U',
    category: 'Multi-Model AI Infrastructure',
    subtitle: 'AI ASSISTANT & MODEL SWITCHER PLATFORM',
    impactQuote:
      'Architected dynamic multi-model routing (Gemini, Qwen) with voice dictation, multimodal file ingest, and reasoning trace streaming.',
    techStack: ['JavaScript', 'Node.js', 'Gemini API', 'Web Speech API', 'Tailwind CSS', 'Express'],
    demoMode: 'Multi-Model Routing & Streaming Engine',
    description:
      'Fast, modern AI chat application with real-time streaming, quick model switcher (Gemini, Qwen), voice dictation, multimodal file attachments, and deep thinking mode.',
    language: 'JavaScript / Node.js',
    githubUrl: 'https://github.com/PriyanshuPundir01/N.A.N.U',
    liveUrl: 'https://n-a-n-u.vercel.app',
    col1Img1: '/assets/projects/nanu_interaction_16x9.png',
    col1Img2: '/assets/projects/nanu_auth_16x9.png',
    col2Img: '/assets/projects/nanu_home_16x9.png',
    architectureStages: [
      {
        stage: 'STAGE 01',
        title: 'Multi-Model Router',
        detail:
          'Classifies query intent and dynamically routes requests between Gemini 1.5 Pro and Qwen models for optimal speed versus reasoning depth.',
      },
      {
        stage: 'STAGE 02',
        title: 'Speech-to-Text Pipeline',
        detail:
          'Integrates Web Speech API with real-time speech recognition, noise suppression, and continuous microphone audio streaming.',
      },
      {
        stage: 'STAGE 03',
        title: 'Multimodal Payload Encoder',
        detail:
          'Parses and encodes image attachments and PDF documents into base64 visual tokens for zero-loss vision analysis.',
      },
    ],
    telemetryLogs: [
      '[ROUTER] Intent classified: Complex reasoning -> Routed to Gemini 1.5 Pro.',
      '[SPEECH] Voice recognition audio chunk transcribed with 98.4% confidence.',
      '[PAYLOAD] Multimodal document parsed: 12 images, 1.4 MB context payload.',
      '[REASONING] Deep reasoning trace generated in 340ms.',
    ],
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onPreviewImage: (url: string, title: string) => void;
  onOpenSpec: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  onPreviewImage,
  onOpenSpec,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (totalCards - 1 - index) * 0.025;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[88vh] min-h-[660px] max-h-[940px] flex items-center justify-center sticky w-full max-w-6xl mx-auto"
      style={{
        top: `calc(4.5rem + ${index * 16}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full h-full rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-slate-300/80 dark:border-[#D7E2EA] bg-white dark:bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-xl dark:shadow-2xl flex flex-col justify-between overflow-hidden transition-colors duration-300"
      >
        {/* Top Header Row: Number + Title (Subtitle) + Tech Stack + Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-black/10 dark:border-white/15 shrink-0">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
              {/* Glowing Purple Number */}
              <span
                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#B600A8] leading-none select-none tracking-tight drop-shadow-[0_0_15px_rgba(192,132,252,0.35)] shrink-0"
                style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)' }}
              >
                {project.number}
              </span>

              {/* Title & Subtitle in parentheses */}
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <h3 className="text-slate-900 dark:text-white uppercase font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none transition-colors">
                  {project.name}
                </h3>
                <span className="text-slate-500 dark:text-[#8E97A0] uppercase font-mono text-xs sm:text-sm tracking-wider">
                  ({project.subtitle})
                </span>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-[#141822] text-slate-700 dark:text-[#8E97A0] border border-slate-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons: GITHUB + LIVE PROJECT + SPEC */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start lg:self-center">
            {/* GITHUB Button */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-800 dark:text-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs uppercase font-semibold tracking-wider transition-all duration-200 inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 opacity-80" />
              <span>GITHUB</span>
            </a>

            {/* LIVE PROJECT Button (Purple filled) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white hover:opacity-90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs uppercase font-bold tracking-wider transition-all duration-200 inline-flex items-center gap-1.5 shadow-md shadow-purple-900/30"
              >
                <span>LIVE PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* SPEC Button */}
            <button
              type="button"
              onClick={() => onOpenSpec(project)}
              className="rounded-full border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs uppercase font-mono font-bold tracking-wider transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              title={`View ${project.name} Architecture Spec & Live Telemetry`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              <span>SPEC</span>
            </button>
          </div>
        </div>

        {/* Bottom row: Exactly 3 images filling the tall card area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 pt-3.5 sm:pt-5 w-full flex-1 min-h-0 items-stretch">
          {/* Left Column (5 of 12 columns): 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3.5 sm:gap-5 md:gap-6 h-full min-h-0 justify-between">
            <div
              onClick={() => onPreviewImage(project.col1Img1, `${project.name} - View 1`)}
              className="relative overflow-hidden rounded-[22px] sm:rounded-[28px] md:rounded-[34px] border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-[#141414] flex-1 min-h-0 group cursor-pointer shadow-lg"
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="p-2 sm:p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </div>
            </div>

            <div
              onClick={() => onPreviewImage(project.col1Img2, `${project.name} - View 2`)}
              className="relative overflow-hidden rounded-[22px] sm:rounded-[28px] md:rounded-[34px] border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-[#141414] flex-1 min-h-0 group cursor-pointer shadow-lg"
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="p-2 sm:p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (7 of 12 columns): 1 prominent hero image matching left column height */}
          <div
            onClick={() => onPreviewImage(project.col2Img, `${project.name} - Main View`)}
            className="md:col-span-7 relative overflow-hidden rounded-[26px] sm:rounded-[32px] md:rounded-[40px] border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-[#141414] h-full min-h-0 group cursor-pointer shadow-2xl flex items-center justify-center"
          >
            <img
              src={project.col2Img}
              alt={`${project.name} hero preview`}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="p-2.5 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white">
                <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [selectedSpecProject, setSelectedSpecProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="bg-[#F1F5F9] dark:bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32 transition-colors duration-300"
    >
      {/* Heading: "Project" */}
      <FadeIn delay={0} y={40} className="w-full text-center mb-14 sm:mb-18 md:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* 8 Sticky Stacking Project Cards */}
      <div className="relative flex flex-col gap-12 sm:gap-16 pb-20">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projectsData.length}
            onPreviewImage={(url, title) => setPreviewImage({ url, title })}
            onOpenSpec={(proj) => setSelectedSpecProject(proj)}
          />
        ))}
      </div>

      {/* Fullscreen Image Preview Lightbox */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full bg-[#111] rounded-[24px] sm:rounded-[32px] border border-white/20 p-2 sm:p-4 shadow-2xl flex flex-col items-center cursor-default"
            >
              <div className="w-full flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
                <span className="text-white text-sm sm:text-base font-medium tracking-wide">
                  {previewImage.title}
                </span>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[18px] sm:rounded-[24px] bg-[#0c0c0c] flex items-center justify-center">
                <img
                  src={previewImage.url}
                  alt={previewImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Architecture & Live Telemetry Spec Modal */}
      <ProjectSpecModal
        project={selectedSpecProject}
        onClose={() => setSelectedSpecProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;