import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

export interface Floating3DElementProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  initialX?: number;
  initialY?: number;
  entranceDelay?: number;
  entranceDuration?: number;
  floatDuration?: number;
  floatDistance?: number;
  rotateRange?: number;
  parallaxStrength?: { x: number; y: number };
  glowColor?: string;
  mouseNormalizedX?: MotionValue<number>;
  mouseNormalizedY?: MotionValue<number>;
  onClick?: () => void;
}

export const Floating3DElement: React.FC<Floating3DElementProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  initialX = 0,
  initialY = 0,
  entranceDelay = 0.1,
  entranceDuration = 0.9,
  floatDuration = 6,
  floatDistance = 16,
  rotateRange = 6,
  parallaxStrength = { x: 25, y: 20 },
  glowColor = 'rgba(0, 210, 255, 0.25)',
  mouseNormalizedX,
  mouseNormalizedY,
  onClick,
}) => {
  // Compute smooth spring-damped parallax displacement based on mouse position
  const fallbackMotionValue = { get: () => 0 } as unknown as MotionValue<number>;
  const activeMouseX = mouseNormalizedX || fallbackMotionValue;
  const activeMouseY = mouseNormalizedY || fallbackMotionValue;

  const parallaxX = useTransform(activeMouseX, (val: number) => val * parallaxStrength.x);
  const parallaxY = useTransform(activeMouseY, (val: number) => val * parallaxStrength.y);

  return (
    /* 1. Viewport Scroll Entrance Layer */
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '80px', amount: 0.1 }}
      transition={{
        duration: entranceDuration,
        delay: entranceDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`pointer-events-auto cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* 2. Interactive Parallax Depth Layer */}
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full flex items-center justify-center relative group"
      >
        {/* Ambient Specular Neon Backlight Glow */}
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-full blur-2xl sm:blur-3xl opacity-35 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* 3. Infinite 3D Floating & Bobbing Physics Layer */}
        <motion.div
          animate={{
            y: [0, -floatDistance, 2, floatDistance * 0.7, 0],
            x: [0, floatDistance * 0.35, -floatDistance * 0.2, -floatDistance * 0.35, 0],
            rotateZ: [0, rotateRange, -rotateRange * 0.4, -rotateRange, 0],
            rotateX: [0, -rotateRange * 0.8, rotateRange * 0.3, rotateRange * 0.8, 0],
            rotateY: [0, rotateRange * 0.9, -rotateRange * 0.4, -rotateRange * 0.9, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.1,
            rotateZ: rotateRange * 1.5,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          whileTap={{
            scale: 0.94,
            transition: { duration: 0.15 },
          }}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          className="relative flex items-center justify-center"
        >
          <img
            src={src}
            alt={alt}
            className={`h-auto object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-105 transition-all duration-300 group-hover:drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] ${imgClassName}`}
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Floating3DElement;
