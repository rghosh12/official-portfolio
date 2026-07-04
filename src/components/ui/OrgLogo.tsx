import { orgLogoMeta, resolveOrgLogoKey } from "@/data/orgLogos";
import { cn } from "@/lib/utils";

interface OrgLogoProps {
  org: string;
  /** Square box size in px — LinkedIn uses ~48px */
  size?: number;
  className?: string;
}

/**
 * LinkedIn-style square company logo box:
 * fixed 1:1 aspect, light background, subtle border, crisp logo rendering.
 */
export function OrgLogo({ org, size = 48, className = "" }: OrgLogoProps) {
  const key = resolveOrgLogoKey(org);

  if (!key) {
    return (
      <div
        className={cn(
          "shrink-0 aspect-square rounded-[4px] bg-white border border-black/10",
          "flex items-center justify-center text-[11px] font-bold text-[#666]",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
          className
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {org.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  const meta = orgLogoMeta[key];
  const fit = meta.fit ?? "contain";
  const padding = meta.padding ?? "p-1.5";

  return (
    <div
      className={cn(
        "shrink-0 aspect-square rounded-[4px] overflow-hidden",
        "bg-white border border-black/10",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
        "flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={meta.src}
        alt={meta.alt}
        width={size}
        height={size}
        className={cn(
          "w-full h-full",
          fit === "cover" ? "object-cover" : "object-contain",
          fit === "contain" && padding
        )}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
