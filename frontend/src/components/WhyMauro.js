import { useReveal } from "@/hooks/use-reveal";
import { t } from "@/lib/i18n";
import { Globe2, Layers, TrendingUp, MessageCircle } from "lucide-react";

const pillars = [
  { icon: Globe2, num: "01", titleKey: "why_1_title", descKey: "why_1_desc", delay: "0ms" },
  { icon: Layers, num: "02", titleKey: "why_2_title", descKey: "why_2_desc", delay: "120ms" },
  { icon: TrendingUp, num: "03", titleKey: "why_3_title", descKey: "why_3_desc", delay: "240ms" },
  { icon: MessageCircle, num: "04", titleKey: "why_4_title", descKey: "why_4_desc", delay: "360ms" },
];

export default function WhyMauro({ locale }) {
  const { ref: headerRef, visible: headerVisible } = useReveal();

  return (
    <section id="why" className="relative py-28 bg-[#080808] overflow-hidden" data-testid="why-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "why_label")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "why_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "why_sub")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.num} className="group relative bg-[#0f0f0f] border border-white/5 rounded-xl p-8 hover:border-[#c9a84c]/30 transition-all duration-500 overflow-hidden" data-testid={`why-card-${p.num}`}
                ref={(el) => {
                  if (!el) return;
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.style.transitionDelay = p.delay; el.classList.add("opacity-100", "translate-y-0"); el.classList.remove("opacity-0", "translate-y-8"); obs.disconnect(); }
                  }, { threshold: 0.1 });
                  obs.observe(el);
                }}
                style={{ transitionDuration: "700ms" }}
              >
                <span className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/[0.03] select-none">{p.num}</span>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/40 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="w-8 h-8 text-[#c9a84c]/70 mb-6 group-hover:text-[#c9a84c] transition-colors" />
                <h3 className="text-white font-semibold text-base mb-3">{t(locale, p.titleKey)}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{t(locale, p.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
