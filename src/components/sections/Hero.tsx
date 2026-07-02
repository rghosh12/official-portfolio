import { MapPin, Mail, Phone, Link2, GitBranch } from "lucide-react";
import { profile } from "@/data/resume";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[92vh] flex flex-col justify-center border-b border-white/10 px-6 sm:px-12 lg:px-24 py-24 relative overflow-hidden"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Picture */}
          <div className="flex-shrink-0 order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              {/* Animated gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              <Image
                src="/images/profile.png"
                alt={profile.name}
                width={288}
                height={288}
                priority
                className="relative rounded-full border-4 border-white/20 shadow-2xl shadow-blue-500/30 object-cover w-full h-full ring-4 ring-white/10 ring-offset-4 ring-offset-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in-up border border-white/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-lg shadow-emerald-400/50"></span>
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

            {/* CTA links with enhanced effects */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link2 size={15} className="relative z-10" />
                <span className="relative z-10">LinkedIn</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all hover:scale-105 hover:-translate-y-0.5 border border-white/20 text-white"
              >
                <GitBranch size={15} />
                GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/5 backdrop-blur-sm transition-all hover:scale-105 hover:-translate-y-0.5"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
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
