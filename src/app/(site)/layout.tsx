import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main-content" className="pt-14 min-h-[calc(100vh-8rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
