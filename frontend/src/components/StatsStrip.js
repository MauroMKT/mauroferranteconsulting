import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";

function useCountUp(target, suffix, duration = 1400, start = false) {
  const [display, setDisplay] = useState(`0${suffix}`);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.floor(eased * target)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, suffix, duration]);
  return display;
}

const stats = [
  { value: 20, suffix: "+", labelKey: "stats_years_label", note: "1997" },
  { value: 150, suffix: "+", labelKey: "stats_projects_label", note: "Projects" },
  { value: 13, suffix: "", labelKey: "stats_countries_label", note: "Countries" },
  { value: 92, suffix: "%", labelKey: "stats_strip_repeat", note: "Rate" },
];

function StatItem({ value, suffix, labelKey, note, locale, start, index }) {
  const display = useCountUp(value, suffix, 1400 + index * 100, start);
  return (
    <div className="flex items-center gap-6" data-testid={`stat-item-${index}`}>
      {index > 0 && <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent" />}
      <div className="text-center min-w-[80px]">
        <div className="text-3xl sm:text-4xl font-serif font-bold text-white">{display}</div>
        <div className="text-white/40 text-[10px] tracking-[0.15em] uppercase mt-1">{t(locale, labelKey)}</div>
        <div className="text-[#c9a84c]/30 text-[9px] tracking-wider mt-0.5">{note}</div>
      </div>
    </div>
  );
}

export default function StatsStrip({ locale }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 bg-[#0a0a0a] overflow-hidden" data-testid="stats-strip">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "stats_strip_label")}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {stats.map((s, i) => (
            <StatItem key={i} value={s.value} suffix={s.suffix} labelKey={s.labelKey} note={s.note} locale={locale} start={visible} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <span className="text-white/15 text-[10px] tracking-[0.2em] uppercase">
            {locale === "it" ? "Dati aggiornati · Verificabili · Basati su progetti reali" : "Updated data · Verifiable · Based on real projects"}
          </span>
        </div>
      </div>
    </section>
  );
}
