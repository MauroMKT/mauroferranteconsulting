import { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { reviews } from "@/lib/reviews";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight } from "lucide-react";

function PlatformBadge({ platform }) {
  const isGoogle = platform === "Google Reviews";
  const isLinkedIn = platform === "LinkedIn";
  const isTrustpilot = platform === "Trustpilot";
  const colorClass = isGoogle ? "border-blue-500/30 text-blue-400/70" : isLinkedIn ? "border-sky-500/30 text-sky-400/70" : isTrustpilot ? "border-emerald-500/30 text-emerald-400/70" : "border-[#c9a84c]/30 text-[#c9a84c]/60";

  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider transition-opacity hover:opacity-100 opacity-70 ${colorClass}`}>
      {platform}
    </span>
  );
}

function ReviewCard({ r, i }) {
  return (
    <div className="group bg-[#0f0f0f] border border-white/5 rounded-xl p-6 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`review-card-${i}`}>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, s) => (
          <svg key={s} className="w-4 h-4 text-[#c9a84c]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-4">"{r.text}"</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white text-sm font-medium">{r.name}</div>
          <div className="text-white/30 text-xs">{r.company}</div>
        </div>
        <a href={r.platformUrl} target="_blank" rel="noopener noreferrer" data-testid={`review-link-${i}`}>
          <PlatformBadge platform={r.platform} />
        </a>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-white/20 text-[10px]">{r.sector}</span>
        <span className="text-white/10 text-[10px]">{r.year}</span>
      </div>
    </div>
  );
}

const readMoreLabels = {
  en: "Read All Reviews",
  it: "Leggi Tutte le Recensioni",
  es: "Leer Todas las Reseñas",
  fr: "Lire Tous les Avis",
  de: "Alle Bewertungen Lesen",
};

export default function Reviews({ locale, limit, showAll = false }) {
  const displayed = showAll ? reviews : reviews.slice(0, limit || 6);
  const hasMore = !showAll && reviews.length > (limit || 6);
  const { ref: headerRef, visible: headerVisible } = useReveal();

  return (
    <section className="relative py-28 bg-[#080808] overflow-hidden" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "about_page_reviews_sub")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "about_page_reviews_title")}</h2>
          <p className="text-white/30 text-xs mt-3">{reviews.length} {locale === "it" ? "recensioni verificate" : locale === "es" ? "reseñas verificadas" : locale === "fr" ? "avis vérifiés" : locale === "de" ? "verifizierte Bewertungen" : "verified reviews"}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((r, i) => (
            <ReviewCard key={i} r={r} i={i} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center gap-3 bg-[#c9a84c]/10 text-[#c9a84c] hover:bg-[#c9a84c]/20 border border-[#c9a84c]/20 hover:border-[#c9a84c]/40 text-sm font-medium px-8 py-4 rounded-xl transition-all duration-300" data-testid="reviews-read-more">
              {readMoreLabels[locale] || readMoreLabels.en}
              <span className="bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-bold px-2.5 py-1 rounded-full">{reviews.length}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
