import { useParams, Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { caseStudies } from "@/lib/caseStudies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag } from "lucide-react";

export default function CaseStudyDetailPage({ locale, setLocale }) {
  const { id } = useParams();
  const cs = caseStudies.find((c) => c.id === id);

  if (!cs) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/40 mb-4">Case study not found</p>
        <Link to="/case-studies" className="text-[#c9a84c] underline">Back to Case Studies</Link>
      </div>
    </div>
  );

  const title = cs.titles[locale] || cs.titles.en;
  const challenge = cs.challenges[locale] || cs.challenges.en;
  const solution = cs.solutions[locale] || cs.solutions.en;
  const result = cs.results[locale] || cs.results.en;
  const client = cs.clients?.[locale] || cs.clients?.en || "";

  const related = caseStudies.filter((c) => c.service === cs.service && c.id !== cs.id).slice(0, 3);

  const serviceLabel = cs.service === "project-management" ? t(locale, "pm_title") : cs.service === "digital-marketing" ? t(locale, "digital_title") : t(locale, "re_title");

  return (
    <div className="min-h-screen bg-[#080808]" data-testid={`cs-detail-${cs.id}`}>
      <Header locale={locale} setLocale={setLocale} />

      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors" data-testid="back-case-studies">
            <ArrowLeft className="w-4 h-4" /> {t(locale, "cs_back")}
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link to={`/services/${cs.service}`} className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.2em] uppercase hover:text-[#c9a84c] transition-colors">{serviceLabel}</Link>
            <span className="text-white/15">|</span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs"><Calendar className="w-3 h-3" />{cs.year}</span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs"><MapPin className="w-3 h-3" />{cs.country}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">{title}</h1>

          {client && (
            <p className="text-white/30 text-sm mt-4 italic">{client}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-6">
            {cs.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-white/5 text-white/30 text-xs tracking-wider px-3 py-1.5 rounded-full border border-white/5">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div data-testid="cs-challenge-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-red-500/60 rounded-full" />
              <h2 className="text-lg font-serif text-white font-bold">{t(locale, "cs_challenge")}</h2>
            </div>
            <p className="text-white/50 text-base leading-relaxed pl-4 border-l border-white/5">{challenge}</p>
          </div>

          <div data-testid="cs-solution-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#c9a84c]/60 rounded-full" />
              <h2 className="text-lg font-serif text-white font-bold">{t(locale, "cs_solution")}</h2>
            </div>
            <p className="text-white/50 text-base leading-relaxed pl-4 border-l border-white/5">{solution}</p>
          </div>

          <div data-testid="cs-results-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-green-500/60 rounded-full" />
              <h2 className="text-lg font-serif text-white font-bold">{t(locale, "cs_results")}</h2>
            </div>
            <p className="text-white/60 text-base leading-relaxed pl-4 border-l border-[#c9a84c]/20 font-medium">{result}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif text-white font-bold mb-4">
            {locale === "it" ? "Vuoi Risultati Simili?" : locale === "es" ? "Quieres Resultados Similares?" : locale === "fr" ? "Vous Voulez des Resultats Similaires?" : locale === "de" ? "Wollen Sie Ahnliche Ergebnisse?" : "Want Similar Results?"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="https://wa.me/393491177007" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all" data-testid="cs-wa-eu">WhatsApp EUROPA & ASIA</a>
            <a href="https://wa.me/51964243686" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all" data-testid="cs-wa-latam">WhatsApp USA & LATAM</a>
            <a href="mailto:mauro@mauroferrante.com" className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 hover:bg-[#c9a84c]/20 px-6 py-3 rounded-lg text-sm font-medium transition-all">Email</a>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-serif text-white font-bold mb-8 text-center">{t(locale, "cs_related")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/case-studies/${r.id}`}
                  className="group bg-[#0f0f0f] border border-white/5 rounded-xl p-5 hover:border-[#c9a84c]/20 transition-all duration-500 block"
                  data-testid={`related-${r.id}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#c9a84c] text-xs">{r.year}</span>
                    <span className="text-white/15">|</span>
                    <span className="text-white/30 text-xs">{r.country}</span>
                  </div>
                  <h3 className="text-white text-sm font-semibold font-serif group-hover:text-[#c9a84c] transition-colors line-clamp-2">{r.titles[locale] || r.titles.en}</h3>
                  <span className="text-[#c9a84c]/50 text-xs flex items-center gap-1 mt-3 group-hover:text-[#c9a84c] transition-colors">
                    {t(locale, "learn_more")} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
