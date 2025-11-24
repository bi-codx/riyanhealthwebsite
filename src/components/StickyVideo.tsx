// components/StickyVideo.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * Cloudinary transformation string to enforce aspect ratio + responsive delivery
 * - c_fill: fills container while cropping
 * - ar_16:9: locks aspect ratio
 * - g_auto: auto gravity (smart crop)
 * - w_auto: auto width
 * - dpr_auto: auto device pixel ratio
 * - f_auto: auto format (webp/avif when possible)
 */
const CLOUDINARY_TRANSFORM = 'c_fill,ar_16:9,g_auto,w_auto,dpr_auto,f_auto';

const videoSections = [
  {
    id: 'PATIENTS',
    label: 'FOR PATIENTS: For the smiles we look for™',
    image:
      'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763464950/photo-1694286080811-e5e416f4fdb1_pa98fb.jpg'
  },
  {
    id: 'CLINICIANS',
    label: 'FOR HEALTH PERSONNELS: For the smiles we help create',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763365162/doctoe_smile_n6zcwg.jpg'
  },
  {
    id: 'PARTNERS',
    label: 'FOR PARTNERS & INVESTORS: For the millions of smiles to come',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364771/int_globe_hv8fcn.jpg'
  }
];

/**
 * If the URL is a Cloudinary "upload" URL, inject the transformation string immediately after /image/upload/
 * Otherwise return the original URL unchanged.
 */
function applyCloudinaryTransform(url: string) {
  try {
    // only alter Cloudinary upload URLs
    const marker = '/image/upload/';
    if (url.includes('res.cloudinary.com') && url.includes(marker)) {
      return url.replace(marker, `${marker}${CLOUDINARY_TRANSFORM}/`);
    }
    return url;
  } catch (err) {
    // on any error return original URL
    return url;
  }
}

export function StickyVideo() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      // clamp between 0 and 1
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      const newSection = Math.floor(scrollProgress * videoSections.length);
      const clampedSection = Math.max(0, Math.min(newSection, videoSections.length - 1));
      setActiveSection(clampedSection);
    };

    // initial check (in case user loaded mid-scroll)
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          {videoSections.map((section, index) => {
            const src = applyCloudinaryTransform(section.image);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeSection === index ? 1 : 0 }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={src}
                  alt={section.label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Vertical Labels */}
        <div className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col gap-12">
          {videoSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(index)}
              className="group relative py-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              aria-label={`Jump to ${section.id}`}
            >
              {/* Vertical Text */}
              <div className="relative">
                <span
                  className="block transition-all duration-300"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: activeSection === index ? '#EFEFEF' : '#8E8E93',
                    opacity: activeSection === index ? 1 : 0.4
                  }}
                >
                  {section.id}
                </span>

                {/* Active Indicator */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activeSection === index ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 w-0.5 bg-[var(--riyan-primary-accent)]"
                  style={{ transformOrigin: 'top' }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Content Label (Optional) */}
        {videoSections[activeSection] && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-24 left-7 right-7 max-w-[1200px] mx-auto"
          >
            <h2
              className="text-white tracking-tight"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 600,
                lineHeight: 1.1
              }}
            >
              {videoSections[activeSection].label}
            </h2>
          </motion.div>
        )}
      </div>
    </div>
  );
}
