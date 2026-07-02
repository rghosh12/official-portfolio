import { MapPin, Mail, Phone, Link2, GitBranch } from "lucide-react";
import { profile } from "@/data/resume";
import Image from "next/image";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[92vh] flex flex-col justify-center border-b border-white/10 px-6 sm:px-12 lg:px-24 py-24 relative overflow-hidden"
    >
      {/* Removed decorative gradient blobs for cleaner, more professional appearance */}
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Picture */}
          <div className="flex-shrink-0 order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              <Image
                src="/images/profile.png"
                alt="Profile picture of Rupak Ghosh"
                width={288}
                height={288}
                priority
                className="relative rounded-full border-4 border-white/20 shadow-2xl shadow-[var(--accent)]/20 object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Status pill - Refined */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in-up border border-white/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success-light)]"></span>
              </span>
              <span className="text-xs font-medium text-gray-200">Open to research & internship opportunities</span>
            </div>

            {/* Name with gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-[1.05] animate-fade-in-up text-gradient-cosmic" style={{ animationDelay: '0.1s' }}>
              {profile.name}
            </h1>

            {/* Title */}
            <p className="text-lg sm:text-xl text-gray-300 mb-6 font-medium max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Cell & Molecular Biology · Data Science · Research Software
            </p>

            {/* Summary */}
            <p className="text-base text-gray-400 max-w-2xl leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {profile.summary}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4 mb-10 text-sm text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <ContactItem icon={<MapPin size={14} />} label={profile.location} />
              <ContactItem icon={<Phone size={14} />} label={profile.phone} href={`tel:${profile.phone}`} />
              <ContactItem icon={<Mail size={14} />} label={profile.email} href={`mailto:${profile.email}`} />
            </div>

            {/* CTA links with refined effects */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-lg text-sm font-semibold transition-all shadow-lg overflow-hidden min-h-[48px]"
              >
                <Link2 size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-card px-8 py-4 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all border border-white/20 text-white min-h-[48px]"
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-white/5 backdrop-blur-sm transition-all min-h-[48px]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  );
  if (href)
    return (
      <a href={href} className="hover:text-[var(--accent)] transition-colors">
        {inner}
      </a>
    );
  return <span>{inner}</span>;
}
