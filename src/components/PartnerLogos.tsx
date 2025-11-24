/* RIYAN HEALTH LANDING 5/src/components/PartnerLogos.tsx */
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const partners = [
  'University  of Geneva SDG Solution Space',
  'KNUST',
  'RYN Solutions',
  'Kumasi Hive',
];

const partnerlogo: Record<string, string> = {
  'University  of Geneva SDG Solution Space': 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387303/SGD_Solution_Space_qhxd8s.png',
  'KNUST': 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387427/knust-logo-png_seeklogo-618224_yjsytl.png',
  'RYN Solutions': 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387285/Screenshot_2025-11-17_132538-removebg-preview_qtg6sd.png',
  'Kumasi Hive': 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387292/1200px-Kumasi_Hive_logo-removebg-preview_1_fzmgo7.png',
};

export function PartnerLogos() {
  // Duplicate the array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="overflow-hidden py-12">
      <motion.div
        className="flex gap-12"
        animate={{
          x: [0, -1 * (partners.length * 240)],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{
          width: 'fit-content',
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner}-${index}`}
            className="flex flex-col items-center justify-center px-8 py-6"
            style={{
              minWidth: '220px',
              border: '1px solid rgba(var(--riyan-text-primary-rgb), 0.08)',
              borderRadius: '12px',
              backgroundColor: 'rgba(var(--riyan-card-dark-rgb), 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Logo */}
            {partnerlogo[partner] && (
              <div className="mb-4 flex items-center justify-center" style={{ height: '60px' }}>
                <ImageWithFallback
                  src={partnerlogo[partner]}
                  alt={partner}
                  className="max-h-full w-auto object-contain"
                  style={{ maxWidth: '140px' }}
                />
              </div>
            )}
            
            {/* Partner Name */}
            <p
              className="text-center"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--riyan-text-secondary)',
                letterSpacing: '0.05em',
                opacity: 0.8,
              }}
            >
              {partner}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}