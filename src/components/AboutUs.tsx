/* RIYAN HEALTH LANDING 5/src/components/AboutUs.tsx */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"; // Standardized import
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* -------------------------
  Helpers & small utilities
  ------------------------- */

function formatInteger(n: number) {
  return new Intl.NumberFormat().format(Math.round(n));
}
function formatCompact(n: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(n);
}

/**
 * Smooth counter hook
 * - target: number to count to
 * - duration: seconds
 * - decimals: decimal places to show (0 for int)
 */
function useCountTo(target: number, { duration = 2.0, decimals = 0 } = {}) {
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const startVal = 0;
    const diff = target - startVal;
    const totalMs = Math.max(1, duration * 1000);

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / totalMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + diff * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(Number(target.toFixed(decimals)));
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, decimals]);

  return value;
}

/* -------------------------
  StatCard component
  ------------------------- */
type StatCardProps = {
  title: string;
  source?: string;
  target: number;
  duration?: number;
  format?: "integer" | "compact";
};
function StatCard({
  title,
  source,
  target,
  duration = 2.0,
  format = "integer",
}: StatCardProps) {
  const value = useCountTo(target, { duration, decimals: 0 });
  const display =
    format === "compact" ? formatCompact(value) : formatInteger(value);

  return (
    <div className="flex flex-col gap-3 px-4 py-6 mt-[0px] mr-[0px] mb-[0px] ml-[-10px]">
      <div
        role="status"
        aria-live="polite"
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(48px, 6vw, 72px)", // Made larger
          fontWeight: 700,
          color: "var(--riyan-primary-accent)", // Updated color
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
        }}
      >
        {display}
      </div>

      <div
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--riyan-text-primary)", // Updated color
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>

      {source && (
        <div
          style={{
            fontSize: 12,
            color: "var(--riyan-text-secondary)", // Updated color
          }}
        >
          {source}
        </div>
      )}
    </div>
  );
}

/* -------------------------
  PercentRangeCard component
  ------------------------- */
type PercentRangeCardProps = {
  title: string;
  range?: [number, number];
  duration?: number;
};
function PercentRangeCard({
  title,
  range = [60, 80],
  duration = 2.0,
}: PercentRangeCardProps) {
  const [phase, setPhase] = useState(0);
  const value = useCountTo(range[phase], { duration: duration / 2, decimals: 0 });

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (phase === 0) setPhase(1);
    }, (duration * 1000) / 2);
    return () => window.clearTimeout(t);
  }, [phase, duration]);

  const finalText = `${range[0]}–${range[1]}%`;

  return (
    <div className="flex flex-col gap-3 px-4 py-6">
      <div
        role="status"
        aria-live="polite"
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(48px, 6vw, 72px)", // Made larger
          fontWeight: 700,
          color: "var(--riyan-primary-accent)", // Updated color
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
        }}
      >
        {`${Math.round(value)}%`}
      </div>

      <div
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--riyan-text-primary)", // Updated color
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "var(--riyan-text-secondary)", // Updated color
        }}
      >
        {finalText} WHO
      </div>

      <div style={{ marginTop: 8 }}>
        <div
          style={{
            height: 8,
            width: "100%",
            background: "rgba(var(--riyan-primary-accent-rgb), 0.1)", // Updated color
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, Math.max(0, range[0]))}%`,
              maxWidth: "100%",
              background: "var(--riyan-primary-accent)", // Updated color
              transition: "width 1s cubic-bezier(.22,1,.36,1)",
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------
  Main Component
  ------------------------- */

const leadershipTeam = [
  {
    name: 'Dr. Kwasi Antwi Donkor',
    title: 'MBCHB, MPH, CO-FOUNDER',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/Dr._Kwasi_b4zekr.jpg',
    bio: 'Medical practitioner and Surgical resident with an interest in solving health solutions on the community level.',
    affiliations: ['KNUST', "Kuntanase Gov't Hospital"]
  },
  {
    name: 'Fadillilah Alhassan',
    title: 'CO-FOUNDER',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763845634/IMG_0074_pqfeyo.jpg',
    bio: 'Head of Research & Analytics at RYN Solutions. Board-certified in Data Science. BSc Biological Sciences from KNUST. Passionate about creating intuitive data-centered healthcare solutions',
    affiliations: ['KNUST', 'RYN SOLUTIONS']
  },
  {
    name: 'Dr. Derrick Kwaku Oppong',
    title: 'MBCHB, MPH, CO-FOUNDER',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/DR_derrick_etcmpo.jpg',
    bio: 'Medical practitioner and Emergency Medicine Resident at KATH. Expertise in HealthCare financing, Quality-Improvement initiatives, and the impact of technology on healthcare delivery.',
    affiliations: ['KNUST', 'KATH', 'University of Washington']
  },
  {
    name: 'Etornam Kofitsey',
    title: 'CO-FOUNDER',
    image: 'https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631377/etornam_v1pqc8.jpg',
    bio: 'Quality control officer at Pharmanova. Bio-medical Scientist. Bsc Biochemistry from KNUST. Former Teaching and Research Assistant.',
    affiliations: ['KNUST', 'Pharmanova']
  },
];

const partners = [
  'University  of Geneva SDG Solution Space',
  'KNUST',
  'RYN Solutions',
  'Kumasi Hive',
];

export function AboutUs() {
  const [sectionsVisible, setSectionsVisible] = useState({
    story: false,
    whoWeAre: false,
    leadership: false,
    partners: false,
  });

  const storyRef = useRef<HTMLElement | null>(null);
  const whoWeAreRef = useRef<HTMLElement | null>(null);
  const leadershipRef = useRef<HTMLElement | null>(null);
  const partnersRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setSectionsVisible((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const refs: { ref: React.RefObject<HTMLElement | null>; id: string }[] = [
      { ref: storyRef, id: "story" },
      { ref: whoWeAreRef, id: "whoWeAre" },
      { ref: leadershipRef, id: "leadership" },
      { ref: partnersRef, id: "partners" },
    ];

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--riyan-bg-dark)" }}
    >
      {/* Hero Section */}
      <section className="relative px-7 pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(48px, 8vw, 99px)",
              fontWeight: 600,
              color: "var(--riyan-text-primary)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Our Mission is You.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.6,
            }}
          >
            RIYAN HEALTH was founded to change the narrative of chronic care. We
            are a Ghanaian-led global health company on a mission to transform
            the patient journey from one of anxiety and isolation into one of
            confidence, connection, and control.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(var(--riyan-text-primary-rgb), 0.1)", // Updated color
          }}
        />
      </div>

      {/* Our Story Section (with Stats first) */}
      <section
        ref={storyRef}
        data-section="story"
        className="relative px-7 py-24"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Top: live stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={
              sectionsVisible.story ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16" // Increased margin
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start mt-[0px] mr-[-30px] mb-[0px] ml-[-10px] py-[0px] px-[-10px]">
              <StatCard
                title="43 million deaths per year"
                source="WHO"
                target={43000000}
                duration={2.4}
                format="integer"
              />

              <StatCard
                title="Suffer risk factors worldwide"
                source="UNICEF (Children & Adolescents)"
                target={2100000000}
                duration={2.6}
                format="compact"
              />

              <PercentRangeCard
                title="60-80% of all deaths worldwide"
                range={[60, 80]}
                duration={2.2}
              />
            </div>
          </motion.div>

          {/* Story copy below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionsVisible.story ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="mb-6"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 600,
                color: "var(--riyan-text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Our Story
            </h2>
            <p
              className="max-w-4xl" // Allow text to be wider
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(16px, 1.5vw, 20px)", // Made text slightly larger
                color: "var(--riyan-text-primary)",
                lineHeight: 1.7,
              }}
            >
              Our story began with a critical observation: a healthcare system
              built on fragmented data and reactive visits, where patients are
              too often passengers in their own care. We knew that by
              architecting an intelligent, high-trust technology
              bridge—connecting patients, doctors, and families in
              real-time—we could build a proactive ecosystem. This ecosystem is
              designed to save costs, amplify clinical impact, and, most
              importantly, save lives. We started here in Ghana, forging a
              robust, scalable solution for the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(var(--riyan-text-primary-rgb), 0.1)",
          }}
        />
      </div>

      {/* Who We Are Section */}
      <section
        ref={whoWeAreRef}
        data-section="whoWeAre"
        className="relative px-7 py-24"
        style={{ backgroundColor: "var(--riyan-card-dark)" }} // Changed to white for contrast
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionsVisible.whoWeAre
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              color: "var(--riyan-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Who We Are
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionsVisible.whoWeAre
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.7,
            }}
          >
            We are a multidisciplinary team of clinicians, engineers, and
            public health strategists, united by a single, driving obsession:
            to build a trusted, scalable, and life-saving platform. We empower
            every user—from patients to providers—with sovereignty over
            their health and a direct, intelligent connection to the care
            they need, when they need it.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(var(--riyan-text-primary-rgb), 0.1)",
          }}
        />
      </div>

      {/* Leadership Section */}
      <section
        ref={leadershipRef}
        data-section="leadership"
        className="relative px-7 py-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionsVisible.leadership
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 uppercase tracking-wide"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 700,
              color: "var(--riyan-text-secondary)",
              letterSpacing: "0.15em",
            }}
          >
            MEET OUR LEADERSHIP
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {leadershipTeam.map((member, index) => (
              <motion.a
                key={member.name}
                href="/teams"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(
                    new CustomEvent("navigate", { detail: "/teams" })
                  );
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  sectionsVisible.leadership
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group cursor-pointer"
              >
                <div
                  className="relative mb-4 overflow-hidden"
                  style={{
                    aspectRatio: "1",
                    borderRadius: "12px",
                  }}
                >
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: "grayscale(100%)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(var(--riyan-secondary-accent-rgb), 0.2) 100%)", // Updated color
                    }}
                  />
                </div>

                <h3
                  className="mb-1"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "clamp(16px, 1.5vw, 20px)",
                    fontWeight: 600,
                    color: "var(--riyan-text-primary)",
                    transition: "color 0.3s",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(11px, 1vw, 12px)",
                    fontWeight: 500,
                    color: "var(--riyan-text-secondary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {member.title}
                </p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              sectionsVisible.leadership
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-center"
          >
            <a
              href="/teams"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "/teams" })
                );
              }}
              className="inline-flex items-center gap-2 group"
            >
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  fontWeight: 600,
                  color: "var(--riyan-primary-accent)",
                  letterSpacing: "0.05em",
                }}
              >
                Meet the Full Team
              </span>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
                <ArrowRight
                  size={18}
                  style={{ color: "var(--riyan-primary-accent)" }}
                />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(var(--riyan-text-primary-rgb), 0.1)",
          }}
        />
      </div>

      {/* Partners Section */}
      <section
        ref={partnersRef}
        data-section="partners"
        className="relative px-7 py-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionsVisible.partners
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 600,
                color: "var(--riyan-text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Our Partners & Supporters
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.3vw, 16px)",
                color: "var(--riyan-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              We are proud to build alongside leaders in healthcare, technology,
              and global impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  sectionsVisible.partners
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center justify-center p-6 transition-all duration-300 hover:scale-105"
                style={{
                  border: "1px solid var(--border)", // Updated color
                  borderRadius: "8px",
                  minHeight: "120px",
                }}
              >
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "clamp(11px, 1vw, 13px)",
                    fontWeight: 700,
                    color: "var(--riyan-text-secondary)",
                    letterSpacing: "0.05em",
                    opacity: 0.7,
                  }}
                >
                  {partner}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacer Removed */}
    </div>
  );
}