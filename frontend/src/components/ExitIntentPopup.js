import { useState, useEffect, useCallback } from "react";
import { t } from "@/lib/i18n";
import { X, Gift, ArrowRight } from "lucide-react";
import CalendlyModal from "@/components/CalendlyModal";

const exitTexts = {
  en: {
    badge: "Before you go...",
    title: "Get a Free Strategy Session",
    subtitle: "30 minutes with Mauro Ferrante to analyze your business challenges and identify quick wins — no strings attached.",
    bullets: ["Personalized analysis of your current situation", "Actionable recommendations you can implement immediately", "Clear roadmap with priorities and timelines"],
    cta: "Book My Free Session",
    dismiss: "Maybe later",
  },
  it: {
    badge: "Prima di andare...",
    title: "Ottieni una Sessione Strategica Gratuita",
    subtitle: "30 minuti con Mauro Ferrante per analizzare le sfide del tuo business e identificare quick wins — senza impegno.",
    bullets: ["Analisi personalizzata della tua situazione attuale", "Raccomandazioni concrete da implementare subito", "Roadmap chiara con priorita e tempistiche"],
    cta: "Prenota la Sessione Gratuita",
    dismiss: "Forse dopo",
  },
  es: {
    badge: "Antes de irte...",
    title: "Obtiene una Sesion Estrategica Gratuita",
    subtitle: "30 minutos con Mauro Ferrante para analizar los desafios de tu negocio e identificar acciones rapidas — sin compromiso.",
    bullets: ["Analisis personalizado de tu situacion actual", "Recomendaciones concretas para implementar de inmediato", "Hoja de ruta clara con prioridades"],
    cta: "Reserva Mi Sesion Gratuita",
    dismiss: "Quizas despues",
  },
  fr: {
    badge: "Avant de partir...",
    title: "Obtenez une Session Strategique Gratuite",
    subtitle: "30 minutes avec Mauro Ferrante pour analyser vos defis et identifier des gains rapides — sans engagement.",
    bullets: ["Analyse personnalisee de votre situation actuelle", "Recommandations concretes a mettre en oeuvre immediatement", "Feuille de route claire avec priorites"],
    cta: "Reservez Ma Session Gratuite",
    dismiss: "Peut-etre plus tard",
  },
  de: {
    badge: "Bevor Sie gehen...",
    title: "Kostenlose Strategie-Session",
    subtitle: "30 Minuten mit Mauro Ferrante, um Ihre geschaftlichen Herausforderungen zu analysieren — unverbindlich.",
    bullets: ["Personalisierte Analyse Ihrer aktuellen Situation", "Konkrete Empfehlungen zur sofortigen Umsetzung", "Klare Roadmap mit Prioritaten und Zeitplanen"],
    cta: "Meine Kostenlose Session Buchen",
    dismiss: "Vielleicht spater",
  },
};

export default function ExitIntentPopup({ locale }) {
  const [visible, setVisible] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const handleExitIntent = useCallback((e) => {
    if (e.clientY <= 5 && !visible) {
      const dismissed = sessionStorage.getItem("mfc-exit-dismissed");
      const shown = sessionStorage.getItem("mfc-exit-shown");
      if (!dismissed && !shown) {
        setVisible(true);
        sessionStorage.setItem("mfc-exit-shown", "1");
      }
    }
  }, [visible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleExitIntent);
    }, 15000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [handleExitIntent]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("mfc-exit-dismissed", "1");
  };

  const openCalendly = () => {
    setVisible(false);
    setCalendlyOpen(true);
  };

  const txt = exitTexts[locale] || exitTexts.en;

  if (!visible && !calendlyOpen) return null;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" data-testid="exit-intent-popup">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={dismiss} />
          <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-[#c9a84c]/20 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(201,168,76,0.08)]">
            {/* Gold accent bar */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

            <button onClick={dismiss} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10" data-testid="exit-intent-close">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 pt-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
                  <Gift className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <span className="text-[#c9a84c]/70 text-xs font-medium tracking-[0.2em] uppercase">{txt.badge}</span>
              </div>

              <h2 className="text-white text-2xl font-serif font-bold leading-snug mb-3">{txt.title}</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{txt.subtitle}</p>

              <ul className="space-y-3 mb-8">
                {txt.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#c9a84c] text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-white/55 text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              <button onClick={openCalendly}
                className="w-full bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                data-testid="exit-intent-cta">
                {txt.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button onClick={dismiss} className="w-full text-white/25 hover:text-white/40 text-xs mt-4 py-2 transition-colors" data-testid="exit-intent-dismiss">
                {txt.dismiss}
              </button>
            </div>
          </div>
        </div>
      )}
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
