import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  const wordStartIndices = React.useMemo(() => {
    const indices: number[] = [];
    let current = 0;
    for (let i = 0; i < words.length; i++) {
      indices.push(current);
      current += words[i].length + 1;
    }
    return indices;
  }, [words]);

  return (
    <p
      ref={containerRef}
      className={`text-center font-medium leading-relaxed ${className}`}
      style={{
        color: '#D7E2EA',
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const wordStartIndex = wordStartIndices[wordIdx];

        return (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIdx) => {
                const charGlobalIndex = wordStartIndex + charIdx;
                const start = charGlobalIndex / totalCharacters;
                const end = Math.min(1, start + 1 / totalCharacters);

                return (
                  <Character
                    key={charIdx}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIdx < words.length - 1 && (
              <span className="relative inline-block">
                <span className="opacity-0 select-none">&nbsp;</span>
                <span className="inline-block">&nbsp;</span>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;
