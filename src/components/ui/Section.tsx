import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Renders a bottom divider using the shared border token. */
  divider?: boolean;
  /** Removes the centered max-width constraint (rarely needed). */
  fluid?: boolean;
}

/**
 * Single source of truth for section rhythm across the site:
 * one centered container width, one horizontal padding scale,
 * one vertical padding scale, and one optional divider treatment.
 */
export function Section({ id, children, className, divider, fluid }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 sm:px-12 lg:px-24 py-20 md:py-24",
        divider && "border-b border-[var(--border)]",
        className
      )}
    >
      <div className={cn(!fluid && "max-w-6xl mx-auto")}>{children}</div>
    </section>
  );
}
