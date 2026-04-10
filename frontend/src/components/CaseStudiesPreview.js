import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { caseStudies } from "@/lib/caseStudies";
import { ArrowRight, MapPin } from "lucide-react";

const FEATURED_IDS = ["cs-pm-01", "cs-dm-02", "cs-re-01", "cs-pm-04", "cs-dm-05", "cs-re-03"];

export default function CaseStudiesPreview({ locale }) {
  const featured = FEATURED_IDS.map((id) => caseStudies.find((cs) => cs.id === id)).filter(Boolean);

  return (
    <section id="case-studies" className="relative py-24 bg-[#0a0a0a] overflow-hidden" data-testid="case-studies-preview">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "cs_label")}</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-4">{t(locale, "cs_title")}</h2>
          <p className="text-white/40 text-sm mt-3 max-w-2xl mx-auto">{t(locale, "cs_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cs) => {
            const title = cs.titles[locale] || cs.titles.en;
            const result = cs.results[locale] || cs.results.en;
            return (
              <Link key={cs.id} to={`/case-studies/${cs.id}`}
                className="group bg-[#0f0f0f] border border-white/5 rounded-xl p-6 hover:border-[#c9a84c]/30 transition-all duration-500 block"
                data-testid={`cs-preview-${cs.id}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#c9a84c] text-xs font-medium">{cs.year}</span>
                  <span className="text-white/15">|</span>
                  <span className="flex items-center gap-1 text-white/30 text-xs"><MapPin className="w-3 h-3" />{cs.country}</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3 font-serif group-hover:text-[#c9a84c] transition-colors line-clamp-2">{title}</h3>
                <p className="text-white/35 text-xs leading-relaxed line-clamp-3 mb-4">{result}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cs.tags.slice(0, 3).map((tag) => (
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

        <div className="text-center mt-12">
          <Link to="/case-studies" className="inline-flex items-center gap-2 bg-transparent border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 px-8 py-3.5 rounded-lg text-sm font-medium transition-all duration-300" data-testid="view-all-case-studies">
            {t(locale, "cs_view_all")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
