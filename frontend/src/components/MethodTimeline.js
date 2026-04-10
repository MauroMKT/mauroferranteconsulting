import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";
import { Search, Lightbulb, Rocket, BarChart2, RefreshCw } from "lucide-react";

const STEPS = [
  { icon: Search, key: "method_1", colorClass: "text-[#c9a84c]" },
  { icon: Lightbulb, key: "method_2", colorClass: "text-[#c9a84c]" },
  { icon: Rocket, key: "method_3", colorClass: "text-[#c9a84c]" },
  { icon: BarChart2, key: "method_4", colorClass: "text-[#c9a84c]" },
  { icon: RefreshCw, key: "method_5", colorClass: "text-[#c9a84c]" },
];

export default function MethodTimeline({ locale }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = null;
        const duration = 1800;
        const animate = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setProgress(p);
          setActiveStep(Math.floor(p * (STEPS.length + 0.5)) - 1);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="method-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a84c]/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "method_label")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "method_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "method_subtitle")}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-white/5 rounded-full">
            <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#c9a84c]/60 rounded-full transition-all duration-100"
              style={{ width: `${progress * 100}%`, boxShadow: progress > 0 ? "0 0 8px rgba(201,168,76,0.6)" : "none" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= activeStep;
              return (
                <div key={i} className={`text-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4"}`} data-testid={`method-step-${i}`}>
                  <div className={`w-24 h-24 mx-auto rounded-2xl border-2 flex items-center justify-center mb-6 transition-all duration-500 ${
                    isActive ? "border-[#c9a84c]/60 bg-[#c9a84c]/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]" : "border-white/10 bg-white/[0.02]"
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-500 ${isActive ? "text-[#c9a84c]" : "text-white/20"}`} />
                  </div>
                  <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${isActive ? "text-[#c9a84c]/60" : "text-white/15"}`}>{i + 1}</span>
                  <h3 className="text-white font-semibold text-sm mt-2 mb-2">{t(locale, `${step.key}_title`)}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{t(locale, `${step.key}_desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
