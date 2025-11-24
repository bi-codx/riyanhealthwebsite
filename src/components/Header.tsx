/* RIYAN HEALTH LANDING 5/src/components/Header.tsx */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { RiyanLogo } from "./RiyanLogo";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 809);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  const menuLinks = [
    { label: "About Us", href: "/about" },
    { label: "Teams", href: "/teams" },
    { label: "Partners", href: "/partners" },
    { label: "Investors", href: "/investors" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },    
  ];

  return (
    <>
      <motion.header
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-7 border-b" // <-- DIVIDER ADDED HERE
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor:
            "rgba(var(--riyan-bg-dark-rgb), 0.7)",
          // The border color is inherited from var(--border) in globals.css
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-20">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(
                new CustomEvent("navigate", { detail: "/" }),
              );
            }}
            className="relative z-50"
            aria-label="Home"
          >
            <RiyanLogo />
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2 text-[var(--riyan-text-primary)] hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      {/* Menu Overlay — refined modern stack style */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-0 z-40"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                backgroundColor:
                  "rgba(var(--riyan-bg-dark-rgb), 0.86)",
              }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.aside
              key="menu-panel"
              initial={
                isMobile ? { y: "-100%" } : { x: "100%" }
              }
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: "-100%" } : { x: "100%" }}
              transition={{
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`fixed z-50 text-[#efeeec] ${
                isMobile
                  ? "top-0 left-0 right-0 w-full h-full"
                  : "top-0 right-0 h-full w-full max-w-lg"
              }`}
              style={{
                background:
                  "linear-gradient(165deg, rgba(var(--riyan-secondary-accent-rgb), 0.98) 0%, rgba(var(--riyan-bg-dark-rgb), 0.96) 100%)",
                fontFamily:
                  "'Manrope', 'Inter', system-ui, -apple-system, sans-serif",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Header with close */}
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(
                      new CustomEvent("navigate", { detail: "/" })
                    );
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3"
                  aria-label="Home"
                >
                  <div className="w-2 h-8 rounded-sm bg-gradient-to-b from-[#09f] to-blue-600"></div>
                  <span
                    className="text-sm uppercase tracking-widest font-medium"
                    style={{
                      color: "rgba(239,238,236,0.7)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    HOME
                  </span>
                </a>
              
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/5"
                  style={{
                    color: "rgba(239,238,236,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>


              {/* Nav stack */}
              <motion.nav
                className={`${
                  isMobile ? "px-5 py-6" : "px-6 py-8"
                } space-y-3`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {menuLinks.map((link, i) => {
                  const comingSoon =
                    !!link.comingSoon ||
                    link.href === "#" ||
                    link.href === "";
                  const isClickable =
                    !comingSoon && !!link.href;

                  return (
                    <motion.div
                      key={link.label + i}
                      className="group"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 * i,
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={
                          isClickable ? link.href : undefined
                        }
                        onClick={(e) => {
                          if (!isClickable) {
                            e.preventDefault();
                            return;
                          }
                          e.preventDefault();
                          setIsMenuOpen(false);
                          window.dispatchEvent(
                            new CustomEvent("navigate", {
                              detail: link.href,
                            }),
                          );
                        }}
                        className={`block rounded-lg px-5 py-5 transition-all duration-300 select-none relative overflow-hidden ${
                          isClickable
                            ? "cursor-pointer hover:bg-white/3 active:scale-[0.998]"
                            : "cursor-default"
                        }`}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                          boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.06),
                            0 4px 24px rgba(0,0,0,0.4),
                            0 1px 3px rgba(0,0,0,0.2)
                          `,
                          border:
                            "1px solid rgba(255,255,255,0.05)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                        aria-disabled={!isClickable}
                      >
                        {/* Hover glow effect */}
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at center, rgba(0,153,255,0.08) 0%, transparent 70%)",
                          }}
                        />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4">
                            {/* Accent indicator */}
                            <div
                              className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
                              style={{
                                background: comingSoon
                                  ? "rgba(158,158,158,0.4)"
                                  : "linear-gradient(135deg, #09f, #0077cc)",
                                boxShadow: comingSoon
                                  ? "none"
                                  : "0 0 8px rgba(0,153,255,0.4)",
                              }}
                            />

                            {/* Content */}
                            <div>
                              <div
                                style={{
                                  fontSize: isMobile
                                    ? "18px"
                                    : "20px",
                                  fontWeight: 600,
                                  letterSpacing: "-0.02em",
                                  lineHeight: "1.2",
                                  color: comingSoon
                                    ? "rgba(239,238,236,0.4)"
                                    : "#efeeec",
                                }}
                              >
                                {link.label}
                              </div>

                              {comingSoon && (
                                <div
                                  className="mt-1"
                                  style={{
                                    fontSize: "11px",
                                    color:
                                      "rgba(158,158,158,0.6)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    fontWeight: 500,
                                  }}
                                >
                                  Coming Soon
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Interactive indicator */}
                          {isClickable && (
                            <div className="transform transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                              >
                                <path
                                  d="M9 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Footer */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-6 text-center border-t border-white/5"
                style={{
                  background:
                    "linear-gradient(transparent, rgba(5,5,5,0.8))",
                  color: "rgba(239,238,236,0.5)",
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                }}
              >
                Join us in defining the new healthcare.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}