// File: RIYAN HEALTH LANDING 5/src/components/InvestorsPartners.tsx
// Minimal backend integration added. UI, styles and animations preserved exactly.
// IMPORTANT: replace SCRIPT_URL below with your deployed Apps Script Web App (the /exec URL).

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { LiveStats } from "./LiveStats";
import { Partners } from "./Partners";
import { toast } from 'sonner@2.0.3';

export function InvestorsPartners() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    inquiryType: 'Venture Investment',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    hero: false,
    stats: false,
    form: false,
  });

  const heroRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLElement | null>(null);
  const formElementRef = useRef<HTMLFormElement | null>(null);

  // ====== CONFIG: set this to your deployed Apps Script /exec URL ======
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3dRwN3-jFaYwMrINyOer7gvSgxoRytgnW_T5jsS3IIQaZoLhFYuljbQKom7zSASLq/exec";
  // ===================================================================

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
      { ref: heroRef, id: "hero" },
      { ref: statsRef, id: "stats" },
      { ref: formRef, id: "form" },
    ];

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // iframe load listener to detect Apps Script response
  useEffect(() => {
    const iframe = document.getElementById('investorTarget') as HTMLIFrameElement | null;
    if (!iframe) return;

    function onLoad() {
      // When Apps Script responds, iframe loads the small HTML — treat as success
      setIsSubmitting(false);
      toast.success("Thank you! We'll be in touch soon.");

      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        inquiryType: 'Venture Investment',
        message: ''
      });

      // focus first field
      const first = formElementRef.current?.querySelector<HTMLInputElement>("input[name='companyName']");
      first?.focus();
    }

    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    // client validation
    if (!formData.companyName || !formData.contactName || !formData.email) {
      e.preventDefault();
      toast.error('Please fill in all required fields');
      return;
    }

    // Set submitting state and allow browser to POST the form to the hidden iframe (no fetch/CORS)
    setIsSubmitting(true);
    // DO NOT call e.preventDefault() here so the form will submit normally to SCRIPT_URL target.
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--riyan-bg-dark)" }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        data-section="hero"
        className="relative px-7 pt-32 pb-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={sectionsVisible.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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
            Partner with Us to
            <br />
            Transform Healthcare.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={sectionsVisible.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.6,
            }}
          >
            RIYAN HEALTH is building the future of proactive, data-driven care. We're looking for strategic partners and investors who share our vision to make healthcare accessible, intelligent, and life-saving.
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

      {/* Stats Section - The Opportunity */}
      <section
        ref={statsRef}
        data-section="stats"
        className="relative px-7 py-24"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={sectionsVisible.stats ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 uppercase tracking-wide"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 700,
              color: "var(--riyan-primary-accent)",
              letterSpacing: "0.15em",
            }}
          >
            THE OPPORTUNITY
          </motion.h2>

          <LiveStats />

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={sectionsVisible.stats ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-4xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.7,
            }}
          >
            We are addressing a global crisis. With our clinical-grade technology, intelligent platform, and scalable model, we are uniquely positioned to save lives and transform the healthcare industry—starting in Ghana, scaling globally.
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

      {/* Embedded Partners Component */}
      <Partners />

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(var(--riyan-text-primary-rgb), 0.1)",
          }}
        />
      </div>

      {/* Contact Form Section */}
      <section
        ref={formRef}
        data-section="form"
        className="relative px-7 py-24"
        style={{ backgroundColor: "var(--riyan-card-dark)" }}
      >
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={sectionsVisible.form ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="mb-4 text-center"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 600,
                color: "var(--riyan-text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Let's Build Together
            </h2>

            <p
              className="mb-12 text-center max-w-2xl mx-auto"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.3vw, 16px)",
                color: "var(--riyan-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Whether you're interested in venture investment, clinical partnerships, or distribution opportunities, we'd love to hear from you.
            </p>

            {/* Hidden iframe target for posting */}
            <iframe id="investorTarget" name="investorTarget" style={{ display: 'none' }} title="investor-target" />

            <form ref={formElementRef} action={SCRIPT_URL} method="POST" encType="multipart/form-data" target="investorTarget" onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot to reduce spam */}
              <input type="text" name="hp_investor" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="companyName"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--riyan-text-primary)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Company Name *
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      backgroundColor: "var(--riyan-bg-dark)",
                      color: "var(--riyan-text-primary)",
                      border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--riyan-primary-accent)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactName"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--riyan-text-primary)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Contact Name *
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      backgroundColor: "var(--riyan-bg-dark)",
                      color: "var(--riyan-text-primary)",
                      border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--riyan-primary-accent)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--riyan-text-primary)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      backgroundColor: "var(--riyan-bg-dark)",
                      color: "var(--riyan-text-primary)",
                      border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--riyan-primary-accent)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--riyan-text-primary)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      backgroundColor: "var(--riyan-bg-dark)",
                      color: "var(--riyan-text-primary)",
                      border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--riyan-primary-accent)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiryType"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--riyan-text-primary)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    backgroundColor: "var(--riyan-bg-dark)",
                    color: "var(--riyan-text-primary)",
                    border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLSelectElement).style.borderColor = 'var(--riyan-primary-accent)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLSelectElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                  }}
                >
                  <option value="Venture Investment">Venture Investment</option>
                  <option value="Clinical Partnership">Clinical Partnership</option>
                  <option value="Distribution">Distribution</option>
                  <option value="Strategic Partnership">Strategic Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--riyan-text-primary)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    backgroundColor: "var(--riyan-bg-dark)",
                    color: "var(--riyan-text-primary)",
                    border: "1px solid rgba(var(--riyan-text-primary-rgb), 0.15)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = 'var(--riyan-primary-accent)';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(var(--riyan-text-primary-rgb), 0.15)';
                  }}
                  placeholder="Tell us about your interest in partnering with RIYAN HEALTH..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-lg transition-all duration-300"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--primary-foreground)",
                  backgroundColor: "var(--riyan-primary-accent)",
                  border: "none",
                  letterSpacing: "0.02em",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
