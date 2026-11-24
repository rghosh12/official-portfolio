import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive hover button (21st.dev), themed for this site.
 *
 * At rest: an outlined pill with a small accent dot. On hover/focus the dot
 * expands to fill the pill, the label slides out to the right and returns
 * with an arrow in the fill colour. Ships as a <button> (matching the
 * original API: `text`, `className`, button props) and as a link variant,
 * since several of the site's calls to action navigate.
 */

type Variant = "default" | "primary";
type Size = "default" | "lg";

interface StyleProps {
  /** Button label. */
  text?: string;
  /** Optional icon shown before the label at rest. */
  icon?: React.ReactNode;
  /** Icon revealed with the label on hover (default: arrow). */
  trailingIcon?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Stretch to the container width. */
  block?: boolean;
}

export const interactiveHoverClasses = ({
  variant = "default",
  size = "default",
  block = false,
}: Pick<StyleProps, "variant" | "size" | "block">) =>
  cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border text-center cursor-pointer select-none whitespace-nowrap",
    "font-mono font-medium tracking-[0.02em] transition-colors duration-300",
    "bg-[var(--surface)] text-[var(--text)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--accent)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary"
      ? "border-[var(--accent)] text-[var(--accent)]"
      : "border-[var(--border-hover)] hover:border-[var(--accent)]",
    size === "lg" ? "min-h-[3.25rem] pl-11 pr-8 text-sm" : "min-h-[2.75rem] pl-9 pr-6 text-[0.8125rem]",
    block ? "flex w-full" : ""
  );

function HoverContent({
  text,
  icon,
  trailingIcon = <ArrowRight size={16} aria-hidden="true" />,
}: Pick<StyleProps, "text" | "icon" | "trailingIcon">) {
  return (
    <>
      {/* resting label: slides right and fades on hover */}
      <span className="relative z-20 inline-flex items-center gap-2 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 group-focus-visible:translate-x-12 group-focus-visible:opacity-0">
        {icon}
        {text}
      </span>
      {/* hover label: slides in from the right with the arrow, in the fill colour */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-20 flex items-center justify-center gap-2 translate-x-12 opacity-0 text-[var(--accent-foreground)] transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100"
      >
        <span>{text}</span>
        {trailingIcon}
      </span>
      {/* the dot that grows into the fill */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-[calc(50%-0.25rem)] z-10 h-2 w-2 scale-100 rounded-lg bg-[var(--accent)] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-focus-visible:left-0 group-focus-visible:top-0 group-focus-visible:h-full group-focus-visible:w-full group-focus-visible:scale-[1.8]"
      />
    </>
  );
}

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    StyleProps {}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  (
    { text = "Button", icon, trailingIcon, variant, size, block, className, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(interactiveHoverClasses({ variant, size, block }), className)}
        {...props}
      >
        <HoverContent text={text} icon={icon} trailingIcon={trailingIcon} />
      </button>
    );
  }
);
InteractiveHoverButton.displayName = "InteractiveHoverButton";

interface InteractiveHoverLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    StyleProps {
  href: string;
  /** Open in a new tab (external links). */
  external?: boolean;
}

function InteractiveHoverLink({
  href,
  external = false,
  text = "Link",
  icon,
  trailingIcon,
  variant,
  size,
  block,
  className,
  ...props
}: InteractiveHoverLinkProps) {
  const classes = cn(interactiveHoverClasses({ variant, size, block }), className);
  const content = <HoverContent text={text} icon={icon} trailingIcon={trailingIcon} />;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={{ textDecoration: "none" }} {...props}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={{ textDecoration: "none" }} {...props}>
      {content}
    </Link>
  );
}

export { InteractiveHoverButton, InteractiveHoverLink };
