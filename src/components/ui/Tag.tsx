import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 font-mono text-xs tracking-[-0.01em]",
        variant === "default" && "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)]",
        variant === "accent" && "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25",
        variant === "muted" && "bg-[var(--surface-2)] text-[var(--muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
