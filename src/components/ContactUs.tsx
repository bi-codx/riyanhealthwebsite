// File path: RIYAN HEALTH LANDING 5/src/components/ContactUs.tsx
// This is the original ContactUs component with minimal backend integration added.
// Changes: adds SCRIPT_URL constant, hidden iframe target, and iframe load listener to show toast
// and reset the form after Apps Script responds. UI, styles and markup are preserved exactly.

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  MapPin,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // ====== BACKEND CONFIG ======
  // Replace this with your deployed Apps Script Web App /exec URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDZaUrhmyePd_Ku1P5JLw7z7Rt-al5v5z2Djwvx24KHjCyRE78NBBk4gVgoMvc0rhP/exec"; // <-- set this
  // ============================

  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Listen for iframe load event to know when Apps Script responded
  useEffect(() => {
    const iframe = document.getElementById("contactTarget") as HTMLIFrameElement | null;
    if (!iframe) return;

    function onLoad() {
      // Called when the iframe finishes loading (server returned HTML)
      setSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form state
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Optional: focus the first input again
      const first = formRef.current?.querySelector<HTMLInputElement>("input[name='fullName']");
      first?.focus();
    }

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  // Note: we DO NOT prevent default on submit so the browser posts the form to the hidden iframe.
  // This avoids CORS issues and keeps the UI intact. We only set submitting state here for button.
  const handleSubmit = (e: React.FormEvent) => {
    // keep default behaviour so form posts to iframe (no CORS)
    setSubmitting(true);

    // Basic client-side validation (keeps UX intact)
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill the required fields.");
      setSubmitting(false);
      e.preventDefault();
      return;
    }

    // allow form to submit; iframe load listener will display success and reset
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
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
            Get in Touch.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--riyan-text-primary)",
              lineHeight: 1.6,
            }}
          >
            Whether you are a patient with a question, a
            clinician interested in our platform, or a potential
            partner, we would love to hear from you. Let's
            connect.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-7">
        <div
          style={{
            height: "1px",
            backgroundColor:
              "rgba(var(--riyan-text-primary-rgb), 0.1)",
          }}
        />
      </div>

      {/* Contact Grid Section */}
      <section className="relative px-7 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2
                className="mb-8"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(24px, 3vw, 30px)",
                  fontWeight: 700,
                  color: "var(--riyan-text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                Send Us a Message
              </h2>

              {/* Hidden iframe target for posting (avoids CORS) */}
              <iframe
                id="contactTarget"
                name="contactTarget"
                style={{ display: "none" }}
                title="contact-target"
              />

              <form
                ref={formRef}
                action={SCRIPT_URL}
                method="POST"
                encType="multipart/form-data"
                target="contactTarget"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Honeypot (hidden) to reduce spam */}
                <input type="text" name="hp_contact" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all duration-300 focus:outline-none"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "var(--riyan-text-primary)",
                      backgroundColor:
                        "rgba(var(--riyan-secondary-accent-rgb), 0.1)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--riyan-primary-accent)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--border)";
                    }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all duration-300 focus:outline-none"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "var(--riyan-text-primary)",
                      backgroundColor:
                        "rgba(var(--riyan-secondary-accent-rgb), 0.1)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--riyan-primary-accent)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--border)";
                    }}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all duration-300 focus:outline-none"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "var(--riyan-text-primary)",
                      backgroundColor:
                        "rgba(var(--riyan-secondary-accent-rgb), 0.1)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--riyan-primary-accent)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor =
                        "var(--border)";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2"
                    style={{
                      fontFamily: "Inter, sans-fsans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "var(--riyan-text-primary)",
                      backgroundColor:
                        "rgba(var(--riyan-secondary-accent-rgb), 0.1)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        "var(--riyan-primary-accent)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        "var(--border)";
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 transition-all duration-300"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--primary-foreground)",
                    backgroundColor:
                      "var(--riyan-primary-accent)",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                  }}
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Submit Message"}
                </motion.button>
              </form>
            </motion.div>

            {/* Right Column - Map & Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              {/* Map
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1876.233090390196!2d-1.5699839205399577!3d6.671304782789679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sgh!4v1763589841661!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RYN Solutions Location"
                />
              </div>  */}

              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <h3
                    className="mb-4 uppercase tracking-wide"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    CONTACT DETAILS
                  </h3>

                  <div className="space-y-4">
                    {/* Email */}
                    <a
                      href="mailto:info@riyanhealth.com"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="p-2"
                        style={{
                          backgroundColor:
                            "rgba(var(--riyan-secondary-accent-rgb), 0.15)",
                          borderRadius: "6px",
                        }}
                      >
                        <Mail
                          size={20}
                          style={{
                            color:
                              "var(--riyan-primary-accent)",
                          }}
                        />
                      </div>
                      <span
                        className="transition-colors duration-300 group-hover:text-[var(--riyan-secondary-accent)]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          color: "var(--riyan-text-primary)",
                        }}
                      >
                        info@riyanhealth.com
                      </span>
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+233203349361"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="p-2"
                        style={{
                          backgroundColor:
                            "rgba(var(--riyan-secondary-accent-rgb), 0.15)",
                          borderRadius: "6px",
                        }}
                      >
                        <Phone
                          size={20}
                          style={{
                            color:
                              "var(--riyan-primary-accent)",
                          }}
                        />
                      </div>
                      <span
                        className="transition-colors duration-300 group-hover:text-[var(--riyan-secondary-accent)]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          color: "var(--riyan-text-primary)",
                        }}
                      >
                        +233 20 334 9361
                      </span>
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3
                    className="mb-4 uppercase tracking-wide"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--riyan-text-secondary)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    FOLLOW US
                  </h3>

                  <div className="flex gap-4">
                    {[
                      {
                        icon: Linkedin,
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/company/riyanhealth/",
                      },
                      {
                        icon: Twitter,
                        label: "Twitter",
                        href: "https://x.com/riyanhealth",
                      },
                      {
                        icon: Facebook,
                        label: "Facebook",
                        href: "https://www.facebook.com/profile.php?id=61584282834361",
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
                          className="p-3 transition-all duration-300"
                          style={{
                            backgroundColor:
                              "rgba(var(--riyan-secondary-accent-rgb), 0.1)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "var(--riyan-primary-accent)";
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "rgba(var(--riyan-secondary-accent-rgb), 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "var(--border)";
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "rgba(var(--riyan-secondary-accent-rgb), 0.1)";
                          }}
                        >
                          <Icon
                            size={20}
                            style={{
                              color:
                                "var(--riyan-text-secondary)",
                            }}
                          />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      {/* Removed the h-32 spacer div that was here */}
    </div>
  );
}
