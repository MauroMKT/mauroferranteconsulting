import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";
import { ArrowDown } from "lucide-react";
import { useParallax } from "@/lib/hooks";

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useTypewriter(phrases, typingSpeed = 70, deletingSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);
  return displayed;
}

export default function Hero({ locale }) {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => { const t1 = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t1); }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const yearsCount = useCountUp(20, 1400, statsVisible);
  const countriesCount = useCountUp(13, 1200, statsVisible);
  const projectsCount = useCountUp(150, 1600, statsVisible);

  const typewriterText = useTypewriter([t(locale, "hero_typewriter_1"), t(locale, "hero_typewriter_2"), t(locale, "hero_typewriter_3")]);

  const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const parallaxRef = useParallax();

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const shown = "opacity-100 translate-y-0";

  return (
    <section id="home" data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img ref={parallaxRef} src="https://images.unsplash.com/photo-1677508266628-1eb612e55cb4?w=1920&q=80&fit=crop" alt="Dubai skyline at night" className="w-full h-full object-cover opacity-30 scale-110 parallax-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#c9a84c]/5 to-transparent" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Text */}
          <div className="space-y-8">
            <div className={`${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "100ms" }}>
              <span className="text-[#c9a84c]/70 text-xs font-medium tracking-[0.3em] uppercase">Consulting Studio</span>
            </div>

            <div className={`h-8 ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "200ms" }}>
              <span className="text-[#c9a84c] text-lg font-light tracking-wide">{typewriterText}<span className="animate-pulse">|</span></span>
            </div>

            <h1 className={`${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "300ms" }}>
              <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-bold leading-[1.05] tracking-tight">
                Mauro<span className="text-shimmer ml-4">Ferrante</span>
              </span>
            </h1>

            <p className={`text-white/40 text-sm leading-relaxed max-w-lg sr-only ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "400ms" }}>
              {t(locale, "hero_tagline")}
            </p>

            <div className={`flex flex-wrap items-center gap-4 ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "500ms" }}>
              <button onClick={scrollToContact} className="bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]" data-testid="hero-cta-btn">
                {t(locale, "hero_cta")}
              </button>

              <div className="flex items-center gap-2 text-xs">
                <button onClick={() => window.open("https://wa.me/393491177007", "_blank")} className="text-[#25D366]/60 hover:text-[#25D366] font-medium transition-colors cursor-pointer" data-testid="wa-eu-btn">
                  {locale === "it" ? "Europa / Asia" : "Europe / Asia"}
                </button>
                <span className="text-white/20">·</span>
                <button onClick={() => window.open("https://wa.me/51964243686", "_blank")} className="text-[#25D366]/60 hover:text-[#25D366] font-medium transition-colors cursor-pointer" data-testid="wa-latam-btn">
                  LATAM / USA
                </button>
              </div>
            </div>

            <div className={`text-white/30 text-xs ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "550ms" }}>
              30 min · {locale === "it" ? "senza impegno" : locale === "es" ? "sin compromiso" : locale === "fr" ? "sans engagement" : locale === "de" ? "unverbindlich" : "no commitment"}
            </div>

            {/* Stats */}
            <div ref={statsRef} className={`flex gap-10 pt-4 ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "650ms" }} data-testid="hero-stats">
              {[{ val: statsVisible ? yearsCount : 0, suffix: "+", label: t(locale, "stats_years_label") },
                { val: statsVisible ? countriesCount : 0, suffix: "", label: t(locale, "stats_countries_label") },
                { val: statsVisible ? projectsCount : 0, suffix: "+", label: t(locale, "stats_projects_label") }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white font-serif">{s.val}{s.suffix}</div>
                  <div className="text-white/30 text-[10px] tracking-wider uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Photo */}
          <div className={`relative hidden lg:block ${base} ${visible ? shown : hidden}`} style={{ transitionDelay: "400ms" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#c9a84c]/20 via-transparent to-[#c9a84c]/10 rounded-2xl blur-xl" />
              <div className="relative overflow-hidden rounded-xl border border-[#c9a84c]/20">
                <img src="/images/mauro-ferrante.jpg" alt="Mauro Ferrante" className="w-full h-[580px] object-cover object-top" data-testid="hero-photo" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#111] border border-[#c9a84c]/30 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <div className="text-[#c9a84c] text-2xl font-serif font-bold">1997</div>
                <div className="text-white/40 text-[10px] tracking-wider uppercase">{locale === "it" ? "da" : locale === "es" ? "desde" : "since"}</div>
              </div>
              <div className="absolute -top-3 -left-3 bg-[#0a0a0a]/90 border border-[#c9a84c]/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-white/60 text-[10px] tracking-wider">{locale === "it" ? "Disponibile" : "Available"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/20" />
      </div>
    </section>
  );
}
