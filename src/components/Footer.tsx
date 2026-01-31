import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Heart,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Teams", href: "/teams" },
    { label: "Partners", href: "/partners" },
    { label: "Investors", href: "/investors" },
    { label: "Blog", href: "/blog" },
  ];

  const services = [
    { label: "Proactive Health Monitoring", href: "#" },
    { label: "Condition Risk Assessment", href: "#" },
    { label: "Clinical Validation", href: "#" },
    { label: "Health Analytics", href: "#" },
  ];

  const handleNavigate =
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("navigate", { detail: href }),
      );
    };

  return (
    <footer
      className="relative mt-32 pt-16 pb-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(232, 252, 249, 0.5) 0%, rgba(225, 247, 249, 1) 100%)",
        borderTop: "1px solid rgba(41, 236, 168, 0.2)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="mb-4"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--riyan-text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              RIYAN HEALTH
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "var(--riyan-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Building the future of proactive healthcare.
              Empowering individuals and clinicians with premium
              health insights.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/company/riyanhealth/",
                  label: "LinkedIn",
                },
                {
                  icon: Twitter,
                  href: "https://x.com/riyanhealth",
                  label: "Twitter",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/profile.php?id=61584282834361",
                  label: "Facebook",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 transition-all duration-300"
                    style={{
                      backgroundColor:
                        "rgba(41, 236, 168, 0.1)",
                      border:
                        "1px solid rgba(41, 236, 168, 0.3)",
                      borderRadius: "8px",
                    }}
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: "var(--riyan-primary-accent)",
                      }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="mb-4 uppercase tracking-wide"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--riyan-text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavigate(link.href)}
                    className="group inline-flex items-center transition-colors duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "var(--riyan-text-secondary)",
                    }}
                  >
                    <span className="group-hover:text-[var(--riyan-primary-accent)] transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="mb-4 uppercase tracking-wide"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--riyan-text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="group inline-flex items-center transition-colors duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "var(--riyan-text-secondary)",
                    }}
                  >
                    <span className="group-hover:text-[var(--riyan-primary-accent)] transition-colors duration-300 no-underline">
                      {service.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              className="mb-4 uppercase tracking-wide"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--riyan-text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="mt-0.5"
                  style={{
                    color: "var(--riyan-primary-accent)",
                  }}
                >
                  <MapPin size={16} />
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "var(--riyan-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  Kumasi, Ghana
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="mt-0.5"
                  style={{
                    color: "var(--riyan-primary-accent)",
                  }}
                >
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:riyanhealth@protonmail.com"
                  className="hover:text-[var(--riyan-primary-accent)] transition-colors duration-300"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "var(--riyan-text-secondary)",
                  }}
                >
                  riyanhealth@protonmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="mt-0.5"
                  style={{
                    color: "var(--riyan-primary-accent)",
                  }}
                >
                  <Phone size={16} />
                </div>
                <a
                  href="tel:+233506928565"
                  className="hover:text-[var(--riyan-primary-accent)] transition-colors duration-300"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "var(--riyan-text-secondary)",
                  }}
                >
                  +233 50 692 8565
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(41, 236, 168, 0.3) 50%, transparent 100%)",
          }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "var(--riyan-text-muted)",
            }}
          >
            © {currentYear} RIYAN HEALTH. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "var(--riyan-text-muted)",
              }}
            ></span>
            <Heart
              size={14}
              style={{ color: "var(--riyan-primary-accent)" }}
              fill="var(--riyan-primary-accent)"
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "var(--riyan-text-muted)",
              }}
            >
              RYN SOLUTIONS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}