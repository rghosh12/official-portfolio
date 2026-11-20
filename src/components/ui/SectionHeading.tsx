interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="label-mono text-[var(--accent)] mb-3">
        {label}
      </p>
      <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[var(--text)] mb-3">{title}</h2>
      {description && (
        <p className="text-[var(--muted)] text-base max-w-2xl">{description}</p>
      )}
    </div>
  );
}
