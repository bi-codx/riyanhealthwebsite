/* RIYAN HEALTH LANDING 5/src/components/Partners.tsx */
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const partners = [
  {
    name: 'SDG Solution Space',
    icon: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387303/SGD_Solution_Space_qhxd8s.png',
    description:
      'Our foundational partner, providing strategic guidance, mentorship, and the global network essential to scaling our vision from a Ghanaian solution to a global health leader.',
    color: 'var(--riyan-primary-accent)'
  },
  {
    name: 'KNUST',
    icon: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387427/knust-logo-png_seeklogo-618224_yjsytl.png',
    description:
      'Our institutional partner, providing resources, assistance and leading advisory members.',
    color: 'var(--riyan-primary-accent)'
  },
  {
    name: 'RYN Solutions',
    icon: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387285/Screenshot_2025-11-17_132538-removebg-preview_qtg6sd.png',
    description:
      'A key research consulting and services partner, partnering in product & market research to align our platform with global health goals & data, ensuring our technology supports public health data initiatives and contributes to a stronger, more resilient health system.',
    color: 'var(--riyan-primary-accent)'
  },
  {
    name: 'Kumasi Hive',
    icon: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387292/1200px-Kumasi_Hive_logo-removebg-preview_1_fzmgo7.png',
    description:
      'A key ecosystem partner, connecting us with the brightest minds and resources in the Pan-African maker landscape to accelerate our growth and innovation.',
    color: 'var(--riyan-primary-accent)'
  }
];


export function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--riyan-bg-dark)' }}>
      {/* Hero Section */}
      <section className="relative px-7 pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(48px, 8vw, 99px)',
              fontWeight: 600,
              color: 'var(--riyan-text-primary)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em'
            }}
          >
            Building a Healthier
            <br />
            Future, Together.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              color: 'var(--riyan-text-primary)',
              lineHeight: 1.6
            }}
          >
            We are proud to collaborate with leaders in healthcare, technology, and global
            impact who share our vision. Our partners are foundational to our mission of
            delivering proactive, accessible care.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div style={{ height: '1px', backgroundColor: 'rgba(var(--riyan-text-primary-rgb), 0.1)' }} />
      </div>

      {/* Partners Section */}
      <section ref={sectionRef} className="relative px-7 py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 uppercase tracking-wide"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 700,
              color: 'var(--riyan-text-secondary)',
              letterSpacing: '0.15em'
            }}
          >
            OUR PARTNERS
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {partners.map((partner, index) => {
              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    delay: 0.1 + index * 0.15,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group relative p-8 lg:p-10 transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--riyan-card-dark)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Logo Image */}
                  <div
                    className="mb-6 inline-flex p-4 transition-all duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(var(--riyan-secondary-accent-rgb), 0.1)',
                      borderRadius: '12px',
                      height: '80px',
                      width: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ImageWithFallback
                      src={partner.icon}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Partner Name */}
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 'clamp(20px, 2vw, 24px)',
                      fontWeight: 700,
                      color: 'var(--riyan-text-primary)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {partner.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      color: 'var(--riyan-text-secondary)',
                      lineHeight: 1.7
                    }}
                  >
                    {partner.description}
                  </p>

                  {/* Hover Accent Line */}
                  <div
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--riyan-primary-accent)',
                      borderRadius: '0 0 16px 16px'
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative px-7 py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center p-12 lg:p-16"
            style={{
              backgroundColor: 'var(--riyan-card-dark)',
              borderRadius: '20px',
              border: '1px solid var(--border)'
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 600,
                color: 'var(--riyan-text-primary)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em'
              }}
            >
              Interested in Partnering with Us?
            </h3>
            <p
              className="mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(15px, 1.3vw, 16px)',
                color: 'var(--riyan-text-secondary)',
                lineHeight: 1.6
              }}
            >
              We are always looking for strategic partners who share our commitment to
              transforming healthcare. Let's build the future together.
            </p>
            <motion.a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }));
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-4 transition-all duration-300"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--primary-foreground)',
                backgroundColor: 'var(--riyan-primary-accent)',
                borderRadius: '8px',
                letterSpacing: '0.02em'
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

{/* Removed the h-32 spacer div that was here */}
    </div>
  );
}