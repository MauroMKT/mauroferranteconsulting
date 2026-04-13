import { useState, useEffect, useRef } from "react";
import { t } from "@/lib/i18n";
import { reviews } from "@/lib/reviews";
import { useReveal } from "@/hooks/use-reveal";
import { Play, Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const sectionText = {
  en: { label: "Client Stories", title: "What Our Clients Say", sub: "Real testimonials from real projects across 13 countries" },
  it: { label: "Storie dei Clienti", title: "Cosa Dicono i Nostri Clienti", sub: "Testimonianze reali da progetti in 13 paesi" },
  es: { label: "Historias de Clientes", title: "Lo Que Dicen Nuestros Clientes", sub: "Testimonios reales de proyectos en 13 paises" },
  fr: { label: "Temoignages Clients", title: "Ce Que Disent Nos Clients", sub: "Temoignages reels de projets dans 13 pays" },
  de: { label: "Kundenstimmen", title: "Was Unsere Kunden Sagen", sub: "Echte Testimonials aus Projekten in 13 Landern" },
};

const featured = [0, 4, 13, 16, 12, 3];

export default function VideoTestimonials({ locale }) {
  const { ref, visible } = useReveal();
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const txt = sectionText[locale] || sectionText.en;
  const featuredReviews = featured.map((i) => reviews[i]).filter(Boolean);

  const goTo = (idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const next = () => goTo((active + 1) % featuredReviews.length);
  const prev = () => goTo((active - 1 + featuredReviews.length) % featuredReviews.length);

  useEffect(() => {
    const goNext = () => goTo((active + 1) % featuredReviews.length);
    intervalRef.current = setInterval(goNext, 8000);
    return () => clearInterval(intervalRef.current);
  }, [active, featuredReviews.length]);

  const current = featuredReviews[active];
  if (!current) return null;

  const initials = current.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const platformColor = current.platform === "Google Reviews" ? "#4285f4" : current.platform === "LinkedIn" ? "#0a66c2" : current.platform === "Trustpilot" ? "#00b67a" : "#c9a84c";

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden" data-testid="video-testimonials-section">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a84c]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#c9a84c]/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{txt.label}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{txt.title}</h2>
          <p className="text-white/30 text-sm mt-3">{txt.sub}</p>
        </div>

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className={`relative bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`} data-testid="video-testimonial-card">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
            
            <div className="p-8 md:p-12">
              {/* Quote icon */}
              <div className="mb-8">
                <Quote className="w-10 h-10 text-[#c9a84c]/15" />
              </div>

              {/* Testimonial text */}
              <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light italic mb-10" data-testid="testimonial-text">
                "{current.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar with initials */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/20 flex items-center justify-center">
                    <span className="text-[#c9a84c] font-serif font-bold text-lg">{initials}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base">{current.name}</div>
                    <div className="text-white/30 text-sm">{current.company} — {current.sector}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
                    ))}
                  </div>
                  {/* Platform badge */}
                  <a href={current.platformUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-opacity hover:opacity-100 opacity-70"
                    style={{ color: platformColor, borderColor: `${platformColor}40` }}
                    data-testid="testimonial-platform-badge">
                    {current.platform}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all" data-testid="testimonial-prev">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {featuredReviews.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[#c9a84c] w-6" : "bg-white/15 hover:bg-white/30"}`}
                  data-testid={`testimonial-dot-${i}`} />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all" data-testid="testimonial-next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail preview */}
          <div className="flex justify-center gap-3 mt-6">
            {featuredReviews.map((r, i) => {
              const ini = r.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
              return (
                <button key={i} onClick={() => goTo(i)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-300 ${i === active ? "border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#c9a84c]" : "border-white/10 bg-white/5 text-white/30 hover:border-white/20"}`}
                  data-testid={`testimonial-thumb-${i}`}>
                  {ini}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
