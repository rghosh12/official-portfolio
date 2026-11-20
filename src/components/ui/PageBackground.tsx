import { DotWorldBackground } from "@/components/ui/DotWorldBackground";

/**
 * Page backdrop: the animated dot world map (hidden on /fun, which has its
 * own map) with the theme's soft radial glow layered over it.
 */
export function PageBackground() {
  return (
    <>
      <DotWorldBackground />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(1100px 620px at 50% -12%, var(--page-glow), transparent 70%)",
        }}
      />
    </>
  );
}
