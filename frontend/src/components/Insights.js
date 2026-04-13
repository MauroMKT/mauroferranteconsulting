import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { insights, categoryColors } from "@/lib/insights";
import { Clock, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export default function Insights({ locale, limit = 3 }) {
  const { ref, visible } = useReveal();

  const displayed = insights.slice(0, limit);

  return (
    <section className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="insights-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "insights_label")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "insights_title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayed.map((insight, i) => {
            const title = insight.titles[locale] ?? insight.titles["en"];
            const excerpt = insight.excerpts[locale] ?? insight.excerpts["en"];
            const color = categoryColors[insight.category] ?? "#c9a84c";

            return (
              <Link key={insight.slug} to={`/blog/${insight.slug}`} className="group bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`insight-card-${i}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={insight.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  <div className="absolute top-3 left-3 text-[10px] font-medium tracking-wider px-2.5 py-1 rounded-full border" style={{ color, borderColor: `${color}40`, background: `${color}15` }}>
                    {insight.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-white/25 text-[10px] mb-3">
                    <span>{new Date(insight.date).toLocaleDateString(locale === "it" ? "it-IT" : "en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{insight.readMins} min</span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-3 line-clamp-2 group-hover:text-[#c9a84c] transition-colors">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-4">{excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#c9a84c]/60 text-xs font-medium group-hover:text-[#c9a84c] transition-colors">
                    {locale === "it" ? "Leggi l'articolo" : locale === "es" ? "Leer articulo" : locale === "fr" ? "Lire l'article" : locale === "de" ? "Artikel lesen" : "Read article"} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm font-medium transition-colors" data-testid="insights-view-all">
            {locale === "it" ? "Tutti gli articoli" : locale === "es" ? "Todos los articulos" : locale === "fr" ? "Tous les articles" : locale === "de" ? "Alle Artikel" : "All articles"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
