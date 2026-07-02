"use client";

import { useState, FormEvent } from "react";
import { Mail, Link2, GitBranch, Phone, Send, Check, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/resume";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="px-6 sm:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Get In Touch"
          title="Contact"
          description="Open to research collaborations, internships, and interesting conversations."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[var(--text)] mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-[var(--muted)] mb-6">
                Whether you have a question, want to collaborate, or just want to say hi, 
                feel free to reach out. I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ContactCard
                icon={<Mail size={18} />}
                label="University Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactCard
                icon={<Mail size={18} />}
                label="Personal Email"
                value={profile.emailAlt}
                href={`mailto:${profile.emailAlt}`}
              />
              <ContactCard
                icon={<Phone size={18} />}
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone}`}
              />
              <ContactCard
                icon={<Link2 size={18} />}
                label="LinkedIn"
                value="rupak-ghosh-339847239"
                href={profile.linkedin}
                external
              />
            </div>

            <ContactCard
              icon={<GitBranch size={18} />}
              label="GitHub"
              value="rghosh12"
              href={profile.github}
              external
            />
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-[var(--text)] mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400" role="alert">
                  <Check size={18} aria-hidden="true" />
                  <span className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400" role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span className="text-sm">{errorMessage || "Failed to send message. Please try again."}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--accent)] transition-colors group"
    >
      <span className="text-[var(--accent)] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}
