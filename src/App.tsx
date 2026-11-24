import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { AdvantageBentoSection } from "./components/AdvantageBentoSection";
import { ContactModal } from "./components/ContactModal";
import { HeroSection } from "./components/HeroSection";
import { ImageGallerySection } from "./components/ImageGallerySection";
import { ModelArenaSection } from "./components/ModelArenaSection";
import { Navbar } from "./components/Navbar";
import { SupportFooterSection } from "./components/SupportFooterSection";

export function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [requestedStage, setRequestedStage] = useState<{
    stage: "sol" | "astra";
    nonce: number;
  } | null>(null);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 450);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-[#14192E]">
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main>
        <HeroSection
          onOpenContact={() => setContactOpen(true)}
          onSelectArenaStage={(stage) =>
            setRequestedStage({ stage, nonce: Date.now() })
          }
        />
        <ModelArenaSection requestedStage={requestedStage} />
        <ImageGallerySection />
        <AdvantageBentoSection />
      </main>
      <SupportFooterSection onOpenContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
