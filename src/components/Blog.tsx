/* RIYAN HEALTH LANDING 5/src/components/Blog.tsx */
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

/* --- blogPosts array unchanged (omitted here for brevity) --- */
/* Paste your existing blogPosts, getCategoryColor, BlogCard, etc. exactly as you had them above.
   For clarity I keep the same arrays and components — only the Join Now behavior and modal are added. */

const blogPosts = [
  {
    id: "001",
    title: '"Sick Care" vs. Health Care',
    category: "Wellness",
    date: "Nov 16, 2025",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364806/markus-winkler-xBiL0Hpulrk-unsplash_gdlo5n.jpg",
    excerpt:
      "A comparative discussion on proactive and reactive healt.",
    featured: false,
    articlelink:
      "https://www.linkedin.com/pulse/silent-killers-understanding-global-threat-ncds-who-ncd-ynacf",
  },
  {
    id: "002",
    title: "Ink-Stained Insights",
    category: "Lifestyle",
    date: "Oct 18, 2024",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364749/Global-annual-deaths-by-key-NCDs-source-World-Health-Organizations-World-Health_zpbyoz.png",
    excerpt:
      "How daily health routines can transform your wellbeing and longevity.",
    featured: false,
    articlelink:
      "https://www.linkedin.com/pulse/silent-killers-understanding-global-threat-ncds-who-ncd-ynacf",
  },
  {
    id: "003",
    title: "The 700% ROI: Health as an Economic Engine",
    category: "Featured",
    date: "Nov 17, 2025",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763364813/invest_in_health_mm4ddy.png",
    excerpt:
      "Health Isn't a Cost, but the Smartest Investment We Can Make.",
    featured: true,
    articlelink:
      "https://www.linkedin.com/pulse/health-isnt-cost-its-smartest-investment-we-can-make-riyanhealth-q8nkf",
  },
  {
    id: "004",
    title: "Community & Family Care",
    category: "Community",
    date: "Nov 15, 2025",
    image:
      "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY29tbXVuaXR5JTIwbWVldGluZ3xlbnwxfHx8fDE3NjMyMDMyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt:
      "Building healthcare communities that support and empower each other.",
    featured: false,
    articlelink:
      "https://www.linkedin.com/pulse/health-isnt-solo-sport-why-your-team-greatest-strength-riyanhealth-ysjef",
  },
  {
    id: "005",
    title: "Electronic health record system and service delivery",
    category: "Healthcare Delivery",
    date: "Oct 30, 2025",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763368954/Dr_Derrick_-_research1_sukchu.png",
    excerpt:
      "Building resilient healthcare infracstructure and delivery.",
    featured: false,
    articlelink:
      "https://journals.sagepub.com/doi/10.1177/20552076251393400",
  },
  {
    id: "006",
    title: "Healthy Returns",
    category: "EuroNews Debate",
    date: "Oct 07, 2025",
    image:
      "https://res.cloudinary.com/dtl9mw6kp/image/upload/v1763366908/healthcare_investment_u5thpg.webp",
    excerpt:
      "Why Europe must treat healthcare as an investment, not a cost.",
    featured: false,
    articlelink:
      "https://www.euronews.com/2025/10/07/healthy-returns-why-europe-must-treat-healthcare-as-an-investment-not-a-cost",
  },
];

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "financing":
      return "rgba(100, 149, 237, 0.85)"; // Cornflower blue
    case "lifestyle":
      return "rgba(100, 181, 246, 0.85)"; // Light blue
    case "community":
      return "rgba(129, 140, 143, 0.85)"; // Gray-green
    case "featured":
      return "rgba(var(--riyan-primary-accent-rgb), 0.85)";
    default:
      return "rgba(107, 114, 128, 0.85)";
  }
};

function BlogCard({
  post,
  featured = false,
}: {
  post: (typeof blogPosts)[0];
  featured?: boolean;
}) {
  const handleClick = () => {
    if (post.articlelink) {
      window.open(
        post.articlelink,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: "24px",
        height: featured ? "600px" : "320px",
        position: "relative",
      }}
    >
      {/* Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient overlay - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      {/* Top Badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        {/* Category Badge - Transparent */}
        <span
          className="px-3 py-1.5 backdrop-blur-md"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#FFFFFF",
            backgroundColor: getCategoryColor(post.category),
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            letterSpacing: "0.02em",
          }}
        >
          {post.category}
        </span>

        {/* Date Badge - Transparent */}
        <span
          className="px-3 py-1.5 backdrop-blur-md"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            letterSpacing: "0.02em",
          }}
        >
          {post.date}
        </span>
      </div>

      {/* Post Number - Top Right */}
      <div
        className="absolute top-4 right-4 z-10"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.5)",
          letterSpacing: "0.05em",
        }}
      >
        {post.id}
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-end justify-between gap-4">
          {/* Title */}
          <h3
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: featured
                ? "clamp(24px, 2.5vw, 32px)"
                : "clamp(16px, 1.5vw, 20px)",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {post.title}
          </h3>

          {/* Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 inline-flex items-center justify-center backdrop-blur-md transition-all duration-300"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
            }}
            aria-label={`Read ${post.title}`}
          >
            <ArrowUpRight size={20} style={{ color: "#FFFFFF" }} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const sidebarPosts = blogPosts.filter((post) => !post.featured);

  // ===== newsletter modal state & config =====
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [isSubSubmitting, setIsSubSubmitting] = useState(false);
  const subFormRef = useRef<HTMLFormElement | null>(null);

  // PLEASE set this to your deployed Apps Script /exec URL:
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzOETlO4yzmDCMOyjwaPQC-9Q6gPaE3txAxVN5AAohl5rc_6njllvPiU93_oEj9R61e/exec";

  // iframe load => treat as successful submit
  useEffect(() => {
    const iframe = document.getElementById("newsletterTarget") as HTMLIFrameElement | null;
    if (!iframe) return;

    function onLoad() {
      // iframe loaded — we assume Apps Script returned success HTML
      setIsSubSubmitting(false);
      toast.success("Thanks — you've been subscribed.");
      setSubEmail("");
      setShowSubscribe(false);
      // reset focus to Join Now button after modal close (optional)
    }

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  const handleSubscribeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // validate email quickly
    if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      e.preventDefault();
      toast.error("Please enter a valid email address.");
      return;
    }

    // allow normal form POST to hidden iframe (no fetch) to avoid CORS
    setIsSubSubmitting(true);
    // do NOT call e.preventDefault() — letting browser post to SCRIPT_URL target
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--riyan-bg-dark)" }}>
      {/* Hero Section */}
      <section className="relative px-7 pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1
              className="mb-6"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(48px, 7vw, 84px)",
                fontWeight: 600,
                color: "var(--riyan-text-primary)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              Insights & Stories
            </h1>
            <p className="max-w-2xl" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(16px, 1.5vw, 18px)", color: "var(--riyan-text-secondary)", lineHeight: 1.6 }}>
              Welcome to our blog: A realm of reflection, inspiration, and discovery. Where words illuminate paths of meaning and thoughts unravel the mysteries of life's spectrum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Grid */}
      <section className="relative px-7 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar - 2 Posts Stacked */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {sidebarPosts.slice(0, 2).map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            {/* Center Featured Post */}
            {featuredPost && (
              <motion.div className="lg:col-span-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <BlogCard post={featuredPost} featured={true} />
              </motion.div>
            )}

            {/* Right Sidebar - Welcome Card + Post */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* Welcome Card */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="p-6" style={{ borderRadius: "24px", backgroundColor: "var(--riyan-card-dark)", border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.08)" }}>
                <p className="mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "var(--riyan-text-secondary)", lineHeight: 1.7 }}>
                  Welcome to RIYAN Health's Blog: A Realm of Reflection, Inspiration, and Discovery. Where Words Illuminate Paths of Meaning and Thoughts unravel actionable advice, stories of empowerment, and clarity you need to understand your health to live a fuller, healthier life.
                </p>

                {/* Join Button - now opens the subscribe modal */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 mb-6 transition-all duration-300"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    backgroundColor: "#000000",
                    borderRadius: "12px",
                    border: "none",
                    letterSpacing: "0.02em",
                  }}
                  onClick={() => setShowSubscribe(true)}
                >
                  Join Now
                </motion.button>

                {/* Social Icons */}
                <div className="flex justify-center gap-3">
                  {[
                    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584282834361", label: "Facebook" },
                    { icon: Linkedin, href: "https://linkedin.com/company/riyanhealth/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/riyanhealth", label: "Twitter" },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} className="p-2.5 transition-all duration-300" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.1)", borderRadius: "10px" }} aria-label={social.label}>
                        <Icon size={16} style={{ color: "var(--riyan-text-primary)" }} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Additional Post */}
              {sidebarPosts[2] && (
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                  <BlogCard post={sidebarPosts[2]} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* More Articles Section (unchanged) */}
      <section className="relative px-7 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-12 uppercase tracking-wide" style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "var(--riyan-primary-accent)", letterSpacing: "0.15em" }}>
            More Insights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...blogPosts, ...blogPosts].slice(0, 6).map((post, index) => (
              <motion.div key={`${post.id}-${index}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                <BlogCard post={{ ...post, featured: false }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Newsletter Modal ---- */}
      {/* Hidden iframe target for form POST to avoid CORS */}
      <iframe id="newsletterTarget" name="newsletterTarget" title="newsletter-target" style={{ display: "none" }} />

      {showSubscribe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => { if (!isSubSubmitting) setShowSubscribe(false); }} />

          {/* Modal */}
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }} className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--riyan-text-primary)" }}>Subscribe to our newsletter</h3>
              <button aria-label="Close" onClick={() => { if (!isSubSubmitting) setShowSubscribe(false); }} className="text-gray-500 hover:text-gray-900">✕</button>
            </div>

            <p className="text-sm text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Get monthly insights, stories, and announcements from RIYAN Health. Unsubscribe anytime.
            </p>

            <form ref={subFormRef} action={SCRIPT_URL} method="POST" target="newsletterTarget" encType="multipart/form-data" onSubmit={handleSubscribeSubmit} className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="hp_news" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              <div>
                <label htmlFor="subEmail" className="block text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Email address *</label>
                <input id="subEmail" name="email" type="email" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border" style={{ outline: "none" }} />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={isSubSubmitting} className="flex-1 py-3 rounded-lg" style={{ backgroundColor: "var(--riyan-primary-accent)", color: "var(--primary-foreground)", fontWeight: 600 }}>
                  {isSubSubmitting ? "Subscribing…" : "Subscribe"}
                </button>
                <button type="button" onClick={() => { if (!isSubSubmitting) setShowSubscribe(false); }} className="py-3 px-4 rounded-lg border">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
