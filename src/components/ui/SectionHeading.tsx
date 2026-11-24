interface SectionHeadingProps {
  title: string;
  description?: string;
}

/** Page/section title, with an optional one-line description. */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text)] mb-3">{title}</h2>
      {description && (
        <p className="text-[var(--muted)] text-base max-w-2xl">{description}</p>
      )}
    </div>
  );
}
