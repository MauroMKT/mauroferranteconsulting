import { useState, useEffect } from "react";
import { t } from "@/lib/i18n";
import { X } from "lucide-react";

export default function CookieBanner({ locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mfc-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mfc-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mfc-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500" data-testid="cookie-banner">
      <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 rounded-xl p-5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-white/50 text-sm leading-relaxed flex-1">{t(locale, "cookie_message")}</p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={handleDecline}
            className="px-5 py-2.5 text-white/40 hover:text-white text-xs font-medium tracking-wider uppercase border border-white/10 hover:border-white/20 rounded-lg transition-all"
            data-testid="cookie-decline">
            {t(locale, "cookie_decline")}
          </button>
          <button onClick={handleAccept}
            className="px-5 py-2.5 bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
            data-testid="cookie-accept">
            {t(locale, "cookie_accept")}
          </button>
        </div>
        <button onClick={handleDecline} className="absolute top-3 right-3 sm:hidden text-white/30 hover:text-white" data-testid="cookie-close">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
