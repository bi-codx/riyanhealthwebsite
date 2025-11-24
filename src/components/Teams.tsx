import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const teamMembers = [
  {
    name: "Dr. Kwasi Antwi Donkor",
    title: "MBCHB, MPH, CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/Dr._Kwasi_b4zekr.jpg",
    bio: "Medical practitioner and Surgical resident with an interest in solving health solutions on the community level.",
    affiliations: ["KNUST", "Kuntanase Gov't Hospital"],
  },
  {
    name: "Fadillilah Alhassan",
    title: "CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763845634/IMG_0074_pqfeyo.jpg",
    bio: "Head of Research & Analytics at RYN Solutions. Board-certified in Data Science. BSc Biological Sciences from KNUST. Passionate about creating intuitive data-centered healthcare solutions",
    affiliations: ["KNUST", "RYN SOLUTIONS"],
  },
  {
    name: "Dr. Derrick Kwaku Oppong",
    title: "MBCHB, MPH, CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/DR_derrick_etcmpo.jpg",
    bio: "Medical practitioner and Emergency Medicine Resident at KATH. Expertise in HealthCare financing, Quality-Improvement initiatives, and the impact of technology on healthcare delivery.",
    affiliations: ["KNUST", "KATH", "University of Washington"],
  },
  {
    name: "Etornam Kofitsey",
    title: "CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631377/etornam_v1pqc8.jpg",
    bio: "Quality control officer at Pharmanova. Bio-medical Scientist. Bsc Biochemistry from KNUST. Former Teaching and Research Assistant.",
    affiliations: ["KNUST", "Pharmanova"],
  },
  {
    name: "Evans Owusu Tetteh",
    title: "CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/evans_nsxael.jpg",
    bio: "Msc Electronic Engineering at Hanbat National University. BSc Telecommunications Engineering from KNUST. Former Teaching and Research Assistant.",
    affiliations: ["KNUST", "Hanbat National University"],
  },
  {
    name: "Daniel Danso Boadi",
    title: "CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/danny_svjaea.jpg",
    bio: "Cancer Researcher at Stemfield Foundation. BSc. Biochemistry from KNUST. Former Teaching and Research Assistant. Interested in cancer research and discovery of novel therapeutic targets to improve the outcome of cancer patients.",
    affiliations: ["KNUST", "Stemfield Foundation"],
  },
  {
    name: "Osei-Poku Silas",
    title: "CO-FOUNDER",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763631378/silas_lcgvbi.jpg",
    bio: "Web Developer. BSc Telecommunications Engineering from KNUST. Former Teaching and Research Assistant. Expert in Wireless Communications & Networks.",
    affiliations: ["KNUST"],
  },
];

const advisoryMembers = [
  {
    name: "Prof. Samuel Asamoah Sakyi",
    title: "Advisory Board Member",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763830112/Prof_Sakyi_n50cjm.jpg",
    bio: "Professor, Department of Molecular Medicine, KNUST.",
    affiliations: ["KNUST"],
  },
];

const companyLogos = [
  {
    name: "Kwame Nkrumah University of Science and Technology",
    width: "w-20",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387427/knust-logo-png_seeklogo-618224_yjsytl.png",
  },
  {
    name: "RYN Solutions",
    width: "w-16",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763387338/ryn_solutions_logo_gu6add.png",
  },
  {
    name: "Komfo Anokye Teaching Hospital",
    width: "w-24",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763827617/KATH-LogoNEW_uzr2gs.png",
  },
  {
    name: "Kuntanase Government Hospital",
    width: "w-24",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763829591/Gemini_Generated_Image_2g0hxi2g0hxi2g0h-removebg-preview_h55zed.png",
  },
  {
    name: "University of Washington",
    width: "w-20",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763829731/University_of_Washington_seal.svg_terqm7.png",
  },
  {
    name: "Pharmanova",
    width: "w-28",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763830028/pharma_logo_curpu8.png",
  },
  {
    name: "Hanbat National University",
    width: "w-28",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763829929/HNU_logo-removebg-preview_gmgscm.png",
  },
  {
    name: "Stemfield Foundation",
    width: "w-28",
    logo: "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763829928/stem_field_foundation_logo-removebg-preview_mmk4by.png",
  },
];

export function Teams() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-7 pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1"
            >
              <h1
                className="uppercase tracking-tight text-[var(--riyan-text-primary)] mb-4"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(40px, 7vw, 84px)",
                  fontWeight: 600,
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                }}
              >
                BUILT BY WORLD CLASS
                <br />
                HEALTHCARE TALENT.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-start lg:items-end text-right"
            >
              <p
                className="uppercase tracking-wide mb-2"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  fontWeight: 600,
                  color: "var(--riyan-text-secondary)",
                  letterSpacing: "0.1em",
                }}
              >
                THE RIGHT PEOPLE.
              </p>
              <p
                className="uppercase tracking-wide"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  fontWeight: 600,
                  color: "var(--riyan-text-secondary)",
                  letterSpacing: "0.1em",
                }}
              >
                THE RIGHT TIME.
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 18px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.6,
            }}
          >
            Built by a team of top 0.1% engineers, doctors, and
            healthcare innovators from leading institutions. We
            combine deep clinical expertise with cutting-edge
            technology to transform healthcare delivery.
          </motion.p>
        </div>
      </section>

      {/* Divider Line */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(79, 179, 191, 0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Team Members Section */}
      <section ref={sectionRef} className="relative px-7 py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="uppercase tracking-wide mb-16"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 700,
              color: "var(--riyan-text-secondary)",
              letterSpacing: "0.15em",
            }}
          >
            CORE TEAM
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                {/* Image Container */}
                <div
                  className="relative mb-6 overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(100%)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(41, 236, 168, 0.15) 100%)",
                    }}
                  />
                </div>

                {/* Member Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 600,
                        color: "var(--riyan-text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="uppercase mb-4"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(11px, 1vw, 13px)",
                        fontWeight: 700,
                        color: "var(--riyan-primary-accent)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {member.title}
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(13px, 1.1vw, 15px)",
                        color: "var(--riyan-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {member.bio}
                    </p>

                    {/* Affiliations */}
                    <div className="flex flex-wrap gap-3">
                      {member.affiliations.map(
                        (affiliation) => (
                          <span
                            key={affiliation}
                            className="px-3 py-1"
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "11px",
                              fontWeight: 600,
                              color:
                                "var(--riyan-text-secondary)",
                              border:
                                "1px solid rgba(142, 142, 147, 0.3)",
                              borderRadius: "4px",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {affiliation}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ArrowUpRight
                      size={24}
                      style={{
                        color: "var(--riyan-primary-accent)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(79, 179, 191, 0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Advisory Board Section */}
      <section className="relative px-7 py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-wide mb-16"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 700,
              color: "var(--riyan-text-secondary)",
              letterSpacing: "0.15em",
            }}
          >
            ADVISORY BOARD
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
            {advisoryMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                {/* Image Container */}
                <div
                  className="relative mb-6 overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(100%)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(41, 236, 168, 0.15) 100%)",
                    }}
                  />
                </div>

                {/* Member Info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 600,
                        color: "var(--riyan-text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="uppercase mb-4"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(11px, 1vw, 13px)",
                        fontWeight: 700,
                        color: "var(--riyan-primary-accent)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {member.title}
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "clamp(13px, 1.1vw, 15px)",
                        color: "var(--riyan-text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {member.bio}
                    </p>

                    {/* Affiliations */}
                    <div className="flex flex-wrap gap-3">
                      {member.affiliations.map(
                        (affiliation) => (
                          <span
                            key={affiliation}
                            className="px-3 py-1"
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "11px",
                              fontWeight: 600,
                              color:
                                "var(--riyan-text-secondary)",
                              border:
                                "1px solid rgba(142, 142, 147, 0.3)",
                              borderRadius: "4px",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {affiliation}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ArrowUpRight
                      size={24}
                      style={{
                        color: "var(--riyan-primary-accent)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(79, 179, 191, 0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Company Logos Section */}
      <section className="relative px-7 py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {companyLogos.map((company) => (
              <div
                key={company.name}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "grayscale(100%)" }}
              >
                <ImageWithFallback
                  src={company.logo}
                  alt={company.name}
                  className={`${company.width} h-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Removed the h-32 spacer div that was here */}
    </div>
  );
}