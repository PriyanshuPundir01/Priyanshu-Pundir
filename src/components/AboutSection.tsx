import React, { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import Floating3DElement from './Floating3DElement';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // High-performance spring-damped mouse coordinates for interactive 3D parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    rawMouseX.set(normX);
    rawMouseY.set(normY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  const aboutText =
    "Full Stack Developer skilled in Java, JavaScript (React, Angular), Python, and SQL with hands-on SDLC experience. I specialize in building Agentic AI & RAG architectures, MCP server integrations, secure backend systems, and responsive web applications. Let's build something incredible together!";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#F8FAFC] dark:bg-[#0C0C0C] overflow-hidden select-none transition-colors duration-300"
    >
      {/* Ambient 3D Depth Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-[#00D2FF]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[500px] h-[500px] bg-[#B600A8]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      {/* 4 Interactive Floating 3D Elements */}
      {/* 1. Top-left: Moon icon */}
      <Floating3DElement
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
        alt="Decorative 3D Moon"
        initialX={-90}
        initialY={0}
        entranceDelay={0.1}
        floatDuration={7.4}
        floatDistance={18}
        rotateRange={6}
        parallaxStrength={{ x: 34, y: 24 }}
        glowColor="rgba(0, 210, 255, 0.35)"
        mouseNormalizedX={smoothMouseX}
        mouseNormalizedY={smoothMouseY}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0"
        imgClassName="w-[120px] sm:w-[160px] md:w-[210px]"
      />

      {/* 2. Bottom-left: 3D geometric prism */}
      <Floating3DElement
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        alt="Decorative 3D Geometric Prism"
        initialX={-90}
        initialY={0}
        entranceDelay={0.25}
        floatDuration={6.0}
        floatDistance={15}
        rotateRange={8}
        parallaxStrength={{ x: 26, y: -22 }}
        glowColor="rgba(182, 0, 168, 0.35)"
        mouseNormalizedX={smoothMouseX}
        mouseNormalizedY={smoothMouseY}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0"
        imgClassName="w-[100px] sm:w-[140px] md:w-[180px]"
      />

      {/* 3. Top-right: 3D Lego icon */}
      <Floating3DElement
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
        alt="Decorative 3D Lego"
        initialX={90}
        initialY={0}
        entranceDelay={0.15}
        floatDuration={6.8}
        floatDistance={17}
        rotateRange={9}
        parallaxStrength={{ x: -30, y: 25 }}
        glowColor="rgba(255, 0, 122, 0.32)"
        mouseNormalizedX={smoothMouseX}
        mouseNormalizedY={smoothMouseY}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0"
        imgClassName="w-[120px] sm:w-[160px] md:w-[210px]"
      />

      {/* 4. Bottom-right: 3D sphere cluster */}
      <Floating3DElement
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        alt="Decorative 3D Spheres Cluster"
        initialX={90}
        initialY={0}
        entranceDelay={0.3}
        floatDuration={8.4}
        floatDistance={22}
        rotateRange={7}
        parallaxStrength={{ x: -38, y: -28 }}
        glowColor="rgba(0, 229, 255, 0.32)"
        mouseNormalizedX={smoothMouseX}
        mouseNormalizedY={smoothMouseY}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0"
        imgClassName="w-[130px] sm:w-[170px] md:w-[220px]"
      />

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center max-w-[560px] w-full mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading and text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="w-full mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text={aboutText} className="max-w-[560px] mx-auto" />
        </div>

        {/* Gap between text block and button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.4} y={20}>
            <ContactButton
              onClick={onContactClick}
              href={onContactClick ? undefined : '#contact'}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
