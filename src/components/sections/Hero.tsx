import { MapPin, Mail, Phone, Link2, GitBranch } from "lucide-react";
import { profile } from "@/data/resume";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[92vh] flex flex-col justify-center border-b border-white/10 px-6 sm:px-12 lg:px-24 py-24 relative"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Picture */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
              <Image
                src="/images/profile.png"
                alt={profile.name}
                width={288}
                height={288}
                priority
                className="relative rounded-full border-4 border-white/20 shadow-2xl shadow-blue-500/20 object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
              <span className="text-xs font-medium text-gray-300">Open to research & internship opportunities</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.05] drop-shadow-2xl">
              {profile.name}
            </h1>

            {/* Title */}
            <p className="text-lg sm:text-xl text-gray-300 mb-6 font-medium max-w-2xl leading-relaxed">
              Cell & Molecular Biology · Data Science · Research Software
            </p>

            {/* Summary */}
            <p className="text-base text-gray-400 max-w-2xl leading-relaxed mb-10">
              {profile.summary}
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-4 mb-10 text-sm text-gray-400">
              <ContactItem icon={<MapPin size={14} />} label={profile.location} />
              <ContactItem icon={<Phone size={14} />} label={profile.phone} href={`tel:${profile.phone}`} />
              <ContactItem icon={<Mail size={14} />} label={profile.email} href={`mailto:${profile.email}`} />
            </div>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                <Link2 size={15} />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all"
              >
                <GitBranch size={15} />
                GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
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
