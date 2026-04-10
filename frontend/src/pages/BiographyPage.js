import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reviews from "@/components/Reviews";
import WorldMap from "@/components/WorldMap";
import { ArrowLeft, Globe2, Award, TrendingUp, Users, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "20+", labelKey: "stats_years_label", icon: Award },
  { value: "150+", labelKey: "stats_projects_label", icon: TrendingUp },
  { value: "12", labelKey: "stats_countries_label", icon: Globe2 },
  { value: "200+", labelKey: "stats_clients_label", icon: Users },
];

const languages = [
  { name: "Italiano", level: "Native" },
  { name: "Español", level: "Fluent (C2)" },
  { name: "English", level: "Fluent (C1)" },
  { name: "Français", level: "Intermediate (B2)" },
];

const careerMilestones = {
  en: [
    { area: "Project Management & Operations", detail: "Over 150 projects managed across 12 countries, from startup launches to enterprise-scale digital transformations. Specialised in Agile, Waterfall and hybrid delivery." },
    { area: "Digital Marketing & Brand Strategy", detail: "Designed and executed brand strategies, digital marketing campaigns and web development projects for companies across multiple sectors." },
    { area: "Real Estate Investments & Advisory", detail: "Guided international investors through property acquisitions, portfolio management and market entry strategies in Europe, LATAM and the Middle East." },
    { area: "Business Development & Consulting", detail: "Founded Mauro Ferrante Consulting Studio, providing end-to-end strategic consulting to businesses, entrepreneurs and investors worldwide." },
  ],
  it: [
    { area: "Project Management & Operations", detail: "Oltre 150 progetti gestiti in 12 paesi, dal lancio di startup alle trasformazioni digitali enterprise. Specializzato in Agile, Waterfall e delivery ibrido." },
    { area: "Digital Marketing & Brand Strategy", detail: "Progettato ed eseguito strategie di brand, campagne di marketing digitale e progetti di sviluppo web per aziende di diversi settori." },
    { area: "Investimenti Immobiliari & Advisory", detail: "Guidato investitori internazionali in acquisizioni, gestione del portafoglio e strategie di ingresso in Europa, LATAM e Medio Oriente." },
    { area: "Business Development & Consulting", detail: "Fondato il Mauro Ferrante Consulting Studio, fornendo consulenza strategica end-to-end a imprese, imprenditori e investitori." },
  ],
};

const competencies = [
  "Agile & Scrum", "Lean Six Sigma", "PMO Setup", "Digital Strategy", "Brand Management",
  "Real Estate Advisory", "M&A Support", "Change Management", "Market Entry", "Team Leadership",
  "Data Analytics", "CRM & Automation", "Risk Management", "Stakeholder Engagement", "SEO/SEM",
];

export default function BiographyPage({ locale, setLocale }) {
  const milestones = careerMilestones[locale] || careerMilestones.en;

  return (
    <div className="min-h-screen bg-[#080808]" data-testid="biography-page">
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#080808]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors" data-testid="back-home-link">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#c9a84c]/15 via-transparent to-[#c9a84c]/10 rounded-2xl blur-xl" />
              <div className="relative overflow-hidden rounded-xl border border-[#c9a84c]/20">
                <img src="/images/mauro-ferrante.jpg" alt="Mauro Ferrante" className="w-full h-[550px] object-cover object-top" data-testid="bio-photo" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "about_page_hero_sub")}</span>
              <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold">{t(locale, "about_title")}</h1>
              <p className="text-[#c9a84c]/60 text-base font-medium">{t(locale, "about_subtitle")}</p>
              <p className="text-white/50 text-sm leading-relaxed">{t(locale, "about_p1")}</p>
              <p className="text-white/50 text-sm leading-relaxed">{t(locale, "about_p2")}</p>
              <p className="text-white/50 text-sm leading-relaxed">{t(locale, "about_p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.labelKey} className="text-center">
                <Icon className="w-5 h-5 text-[#c9a84c]/50 mx-auto mb-3" />
                <div className="text-3xl font-serif font-bold text-white">{stat.value}</div>
                <div className="text-white/30 text-[10px] tracking-[0.15em] uppercase mt-1">{t(locale, stat.labelKey)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Career Milestones */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-white font-bold text-center mb-12">
            {locale === "it" ? "Percorso Professionale" : "Career Path"}
          </h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-[#c9a84c]/20 pb-6" data-testid={`career-milestone-${i}`}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#c9a84c] border-4 border-[#080808]" />
                <h3 className="text-white font-semibold text-base mb-2">{m.area}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-serif text-white font-bold text-center mb-8">{t(locale, "about_page_competencies_label")}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {competencies.map((c) => (
              <span key={c} className="bg-white/5 text-white/50 text-xs tracking-wider px-4 py-2 rounded-full border border-white/5 hover:border-[#c9a84c]/30 hover:text-[#c9a84c]/70 transition-all">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-serif text-white font-bold text-center mb-8">{t(locale, "about_page_languages_label")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((l) => (
              <div key={l.name} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-white font-medium text-sm">{l.name}</div>
                <div className="text-[#c9a84c]/50 text-xs mt-1">{l.level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map */}
      <WorldMap locale={locale} />

      {/* All Reviews */}
      <Reviews locale={locale} />

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
