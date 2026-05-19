import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { t } from "@/lib/i18n";
import CalendlyModal from "@/components/CalendlyModal";

export default function MobileStickyBar({ locale }) {
  const [visible, setVisible] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-[#080808]/95 backdrop-blur-xl border-t border-[#c9a84c]/20 px-4 py-3 safe-area-pb" data-testid="mobile-sticky-bar">
        <button
          onClick={() => setCalendlyOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-bold text-sm py-3 rounded-xl transition-all duration-300 shadow-[0_-4px_20px_rgba(201,168,76,0.25)]"
          data-testid="mobile-sticky-cta"
        >
          <Calendar className="w-4 h-4" />
          {t(locale, "hero_cta")}
        </button>
      </div>
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
