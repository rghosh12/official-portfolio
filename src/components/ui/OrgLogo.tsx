import Image from "next/image";
import { orgLogoMeta, resolveOrgLogoKey } from "@/data/orgLogos";

interface OrgLogoProps {
  org: string;
  size?: number;
  className?: string;
}

export function OrgLogo({ org, size = 44, className = "" }: OrgLogoProps) {
  const key = resolveOrgLogoKey(org);

  if (!key) {
    return (
      <div
        className={`shrink-0 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--muted)] ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {org.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  const meta = orgLogoMeta[key];
  const isSvg = meta.src.endsWith(".svg");

  return (
    <div
      className={`shrink-0 rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.src}
          alt={meta.alt}
          width={size}
          height={size}
          className="w-full h-full object-contain"
        />
      ) : (
        <Image
          src={meta.src}
          alt={meta.alt}
          width={size}
          height={size}
          className="object-contain p-1.5 w-full h-full"
        />
      )}
    </div>
  );
}
