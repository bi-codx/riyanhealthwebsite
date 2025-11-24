/* RIYAN HEALTH LANDING 5/src/components/ContentSection.tsx */
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ContentSectionProps {
  heading: string;
  subheading?: string;
  paragraph: string;
  darkBg?: boolean;
  centered?: boolean;
  preHeadingContent?: React.ReactNode; // <-- ADDED THIS NEW PROP
}

export function ContentSection({ 
  heading, 
  subheading, 
  paragraph, 
  darkBg = false,
  centered = false,
  preHeadingContent // <-- ADDED THIS NEW PROP
}: ContentSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative px-7 py-16 md:py-32 ${darkBg ? 'bg-[var(--riyan-card-dark)]' : 'bg-[var(--riyan-bg-dark)]'}`}
    >
      <div className={`max-w-[1200px] mx-auto ${centered ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Render the pre-heading content (our stats) here */}
          {preHeadingContent && (
            <div className="mb-12">
              {preHeadingContent}
            </div>
          )}

          {/* Main Heading */}
          <h2
            className="uppercase tracking-tight text-[var(--riyan-text-primary)] mb-8"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(40px, 7vw, 84px)',
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-0.02em'
            }}
          >
            {heading}
          </h2>

          {/* Subheading (if provided) */}
          {subheading && (
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="uppercase tracking-wide mb-12"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                fontWeight: 700,
                color: 'var(--riyan-primary-accent)',
                letterSpacing: '0.1em'
              }}
            >
              {subheading}
            </motion.h3>
          )}

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`text-[var(--riyan-text-primary)] leading-relaxed ${centered ? 'mx-auto' : ''}`}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.333vw, 16px)',
              maxWidth: centered ? '800px' : '600px'
            }}
          >
            {paragraph}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}