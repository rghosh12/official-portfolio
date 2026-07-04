/**
 * Static, restrained page backdrop.
 * Replaces the animated WebGL starfield with a single, barely-perceptible
 * radial glow driven by theme tokens. No animation, so it is inherently
 * safe for `prefers-reduced-motion` users.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(1100px 620px at 50% -12%, var(--page-glow), transparent 70%)",
      }}
    />
  );
}
