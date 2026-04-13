import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { caseStudies } from "@/lib/caseStudies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { ArrowLeft, ArrowRight, MapPin, Filter } from "lucide-react";
import { useState } from "react";

const SERVICE_FILTERS = [
  { key: "all", labelKey: null },
  { key: "project-management", labelKey: "pm_title" },
  { key: "digital-marketing", labelKey: "digital_title" },
  { key: "real-estate", labelKey: "re_title" },
];

export default function CaseStudiesPage({ locale, setLocale }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? caseStudies : caseStudies.filter((cs) => cs.service === filter);

  const allLabel = locale === "it" ? "Tutti" : locale === "es" ? "Todos" : locale === "fr" ? "Tous" : locale === "de" ? "Alle" : "All";

  return (
    <div className="min-h-screen bg-[#080808]" data-testid="case-studies-page">
      <SEO title={t(locale, "cs_title")} description={t(locale, "cs_subtitle")} path="/case-studies" />
      <Header locale={locale} setLocale={setLocale} />

      <section className="relative pt-32 pb-16 bg-[#080808]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors" data-testid="back-home">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="block text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase mb-3">{t(locale, "cs_label")}</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold">{t(locale, "cs_title")}</h1>
          <p className="text-white/40 text-base mt-4 max-w-3xl">{t(locale, "cs_subtitle")}</p>
        </div>
      </section>

      <section className="py-8 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3" data-testid="cs-filters">
            <Filter className="w-4 h-4 text-white/30" />
            {SERVICE_FILTERS.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all ${filter === f.key ? "bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30" : "bg-white/5 text-white/40 border border-white/5 hover:border-white/10"}`}
                data-testid={`filter-${f.key}`}>
                {f.labelKey ? t(locale, f.labelKey) : allLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((cs) => {
              const title = cs.titles[locale] || cs.titles.en;
              const challenge = cs.challenges[locale] || cs.challenges.en;
              const result = cs.results[locale] || cs.results.en;
              return (
                <Link key={cs.id} to={`/case-studies/${cs.id}`}
                  className="group bg-[#0f0f0f] border border-white/5 rounded-xl p-7 hover:border-[#c9a84c]/20 transition-all duration-500 block"
                  data-testid={`cs-card-${cs.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#c9a84c] text-xs font-medium">{cs.year}</span>
                    <span className="text-white/15">|</span>
                    <span className="flex items-center gap-1 text-white/30 text-xs"><MapPin className="w-3 h-3" />{cs.country}</span>
                    <span className="ml-auto text-white/20 text-[10px] tracking-wider uppercase">
                      {cs.service === "project-management" ? "PM" : cs.service === "digital-marketing" ? "Marketing" : "Real Estate"}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3 font-serif group-hover:text-[#c9a84c] transition-colors">{title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-3">{challenge}</p>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4 font-medium">{result}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="bg-white/5 text-white/25 text-[9px] tracking-wider px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <span className="text-[#c9a84c]/60 text-xs font-medium flex items-center gap-1 group-hover:text-[#c9a84c] transition-colors">
                    {t(locale, "learn_more")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
