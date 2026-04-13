import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { caseStudies } from "@/lib/caseStudies";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reviews from "@/components/Reviews";
import WorldMap from "@/components/WorldMap";
import CaseStudiesPreview from "@/components/CaseStudiesPreview";
import SEO from "@/components/SEO";
import { ArrowLeft, Globe2, Award, TrendingUp, Users, CheckCircle2, Swords, Target, Zap } from "lucide-react";

const stats = [
  { value: "20+", labelKey: "stats_years_label", icon: Award },
  { value: "150+", labelKey: "stats_projects_label", icon: TrendingUp },
  { value: "13", labelKey: "stats_countries_label", icon: Globe2 },
  { value: "200+", labelKey: "stats_clients_label", icon: Users },
];

const languages = [
  { name: "Italiano" },
  { name: "Espanol" },
  { name: "English" },
  { name: "Francais" },
];

const careerMilestones = {
  en: [
    { area: "Project Management & Operations", detail: "Over 150 projects managed across 13 countries, from startup launches to enterprise-scale digital transformations. Specialised in Agile, Waterfall and hybrid delivery." },
    { area: "Digital Marketing & Brand Strategy", detail: "Designed and executed brand strategies, digital marketing campaigns and web development projects for companies across multiple sectors." },
    { area: "Real Estate Investments & Advisory", detail: "Guided international investors through property acquisitions, portfolio management and market entry strategies in Europe, LATAM and the Middle East." },
    { area: "Business Development & Consulting", detail: "Founded Mauro Ferrante Consulting Studio, providing end-to-end strategic consulting to businesses, entrepreneurs and investors worldwide." },
  ],
  it: [
    { area: "Project Management & Operations", detail: "Oltre 150 progetti gestiti in 13 paesi, dal lancio di startup alle trasformazioni digitali enterprise. Specializzato in Agile, Waterfall e delivery ibrido." },
    { area: "Digital Marketing & Brand Strategy", detail: "Progettato ed eseguito strategie di brand, campagne di marketing digitale e progetti di sviluppo web per aziende di diversi settori." },
    { area: "Investimenti Immobiliari & Advisory", detail: "Guidato investitori internazionali in acquisizioni, gestione del portafoglio e strategie di ingresso in Europa, LATAM e Medio Oriente." },
    { area: "Business Development & Consulting", detail: "Fondato il Mauro Ferrante Consulting Studio, fornendo consulenza strategica end-to-end a imprese, imprenditori e investitori." },
  ],
  es: [
    { area: "Project Management & Operations", detail: "Mas de 150 proyectos gestionados en 13 paises, desde lanzamientos de startups hasta transformaciones digitales a escala empresarial." },
    { area: "Digital Marketing & Brand Strategy", detail: "Disenado y ejecutado estrategias de marca, campanas de marketing digital y proyectos de desarrollo web para empresas de multiples sectores." },
    { area: "Inversiones Inmobiliarias & Advisory", detail: "Guiado a inversores internacionales en adquisiciones, gestion de portafolio y estrategias de entrada en Europa, LATAM y Medio Oriente." },
    { area: "Business Development & Consulting", detail: "Fundado Mauro Ferrante Consulting Studio, brindando consultoria estrategica integral a empresas, emprendedores e inversores." },
  ],
  fr: [
    { area: "Project Management & Operations", detail: "Plus de 150 projets geres dans 13 pays, des lancements de startups aux transformations digitales a l'echelle de l'entreprise." },
    { area: "Digital Marketing & Brand Strategy", detail: "Conception et execution de strategies de marque, campagnes de marketing digital et projets de developpement web pour des entreprises multi-secteurs." },
    { area: "Investissements Immobiliers & Advisory", detail: "Accompagnement d'investisseurs internationaux dans les acquisitions, la gestion de portefeuille et les strategies d'entree en Europe, LATAM et Moyen-Orient." },
    { area: "Business Development & Consulting", detail: "Fondation du Mauro Ferrante Consulting Studio, conseil strategique de bout en bout pour entreprises, entrepreneurs et investisseurs." },
  ],
  de: [
    { area: "Project Management & Operations", detail: "Uber 150 Projekte in 13 Landern geleitet, von Startup-Starts bis hin zu digitalen Transformationen im Unternehmensmassstab." },
    { area: "Digital Marketing & Brand Strategy", detail: "Markenstrategien, digitale Marketingkampagnen und Webentwicklungsprojekte fur Unternehmen verschiedener Branchen konzipiert und umgesetzt." },
    { area: "Immobilieninvestitionen & Beratung", detail: "Internationale Investoren bei Akquisitionen, Portfoliomanagement und Markteintrittsstrategien in Europa, LATAM und dem Nahen Osten begleitet." },
    { area: "Business Development & Consulting", detail: "Grundung des Mauro Ferrante Consulting Studio, End-to-End strategische Beratung fur Unternehmen, Unternehmer und Investoren." },
  ],
};

const philosophyTexts = {
  en: {
    label: "Philosophy & Discipline",
    title: "Where Strategy Meets Discipline",
    intro: "My approach to consulting is forged not only through decades of professional experience and formal training, but also through the solid principles of martial arts discipline that have shaped my mindset and work ethic.",
    kaizen_title: "Kaizen",
    kaizen_sub: "Continuous Improvement",
    kaizen_desc: "The Japanese philosophy of constant, incremental improvement. Every project, every process, every interaction is an opportunity to refine and elevate. I apply Kaizen to ensure that results don't just meet expectations — they exceed them, consistently.",
    ikigai_title: "Ikigai",
    ikigai_sub: "Purpose & Passion",
    ikigai_desc: "The intersection of what you love, what you're good at, what the world needs, and what you can be paid for. I help my clients find their strategic Ikigai — that sweet spot where business potential meets personal fulfilment and market demand.",
    lean_title: "Lean Six Sigma",
    lean_sub: "Operational Excellence",
    lean_desc: "A data-driven methodology to eliminate waste, reduce variation, and optimise processes. I integrate Lean Six Sigma principles into every engagement, ensuring measurable efficiency gains and sustainable quality improvements.",
    martial_note: "These principles, rooted in the discipline of martial arts, form the foundation of a work method that is rigorous, respectful, and results-oriented.",
  },
  it: {
    label: "Filosofia & Disciplina",
    title: "Dove la Strategia Incontra la Disciplina",
    intro: "Il mio approccio alla consulenza e forgiato non solo da decenni di esperienza professionale e formazione continua, ma anche dai solidi principi della disciplina delle arti marziali che hanno plasmato la mia mentalita e la mia etica di lavoro.",
    kaizen_title: "Kaizen",
    kaizen_sub: "Miglioramento Continuo",
    kaizen_desc: "La filosofia giapponese del miglioramento costante e incrementale. Ogni progetto, ogni processo, ogni interazione e un'opportunita per perfezionare e migliorare. Applico il Kaizen per assicurare che i risultati non solo soddisfino le aspettative, ma le superino costantemente.",
    ikigai_title: "Ikigai",
    ikigai_sub: "Scopo & Passione",
    ikigai_desc: "L'intersezione tra cio che ami, cio in cui eccelli, cio di cui il mondo ha bisogno e cio per cui puoi essere pagato. Aiuto i miei clienti a trovare il loro Ikigai strategico — quel punto dove il potenziale di business incontra la realizzazione personale e la domanda di mercato.",
    lean_title: "Lean Six Sigma",
    lean_sub: "Eccellenza Operativa",
    lean_desc: "Una metodologia data-driven per eliminare gli sprechi, ridurre la variabilita e ottimizzare i processi. Integro i principi Lean Six Sigma in ogni progetto, garantendo guadagni di efficienza misurabili e miglioramenti di qualita sostenibili.",
    martial_note: "Questi principi, radicati nella disciplina delle arti marziali, costituiscono le fondamenta di un metodo di lavoro rigoroso, rispettoso e orientato ai risultati.",
  },
  es: {
    label: "Filosofia & Disciplina",
    title: "Donde la Estrategia Encuentra la Disciplina",
    intro: "Mi enfoque de consultoria esta forjado no solo por decadas de experiencia profesional y formacion continua, sino tambien por los solidos principios de la disciplina de las artes marciales que han moldeado mi mentalidad y etica de trabajo.",
    kaizen_title: "Kaizen",
    kaizen_sub: "Mejora Continua",
    kaizen_desc: "La filosofia japonesa de mejora constante e incremental. Cada proyecto, cada proceso, cada interaccion es una oportunidad para refinar y elevar. Aplico el Kaizen para asegurar que los resultados no solo cumplan las expectativas, sino que las superen consistentemente.",
    ikigai_title: "Ikigai",
    ikigai_sub: "Proposito & Pasion",
    ikigai_desc: "La interseccion entre lo que amas, en lo que eres bueno, lo que el mundo necesita y por lo que puedes ser remunerado. Ayudo a mis clientes a encontrar su Ikigai estrategico — ese punto donde el potencial del negocio encuentra la realizacion personal.",
    lean_title: "Lean Six Sigma",
    lean_sub: "Excelencia Operativa",
    lean_desc: "Una metodologia basada en datos para eliminar desperdicios, reducir variabilidad y optimizar procesos. Integro los principios Lean Six Sigma en cada proyecto, garantizando ganancias de eficiencia medibles.",
    martial_note: "Estos principios, enraizados en la disciplina de las artes marciales, forman la base de un metodo de trabajo riguroso, respetuoso y orientado a resultados.",
  },
  fr: {
    label: "Philosophie & Discipline",
    title: "La ou la Strategie Rencontre la Discipline",
    intro: "Mon approche du conseil est forgee non seulement par des decennies d'experience professionnelle et de formation continue, mais aussi par les principes solides de la discipline des arts martiaux qui ont faconne ma mentalite et mon ethique de travail.",
    kaizen_title: "Kaizen",
    kaizen_sub: "Amelioration Continue",
    kaizen_desc: "La philosophie japonaise d'amelioration constante et incrementale. Chaque projet, chaque processus, chaque interaction est une opportunite de perfectionner et d'elever. J'applique le Kaizen pour garantir que les resultats depassent systematiquement les attentes.",
    ikigai_title: "Ikigai",
    ikigai_sub: "But & Passion",
    ikigai_desc: "L'intersection entre ce que vous aimez, ce en quoi vous excellez, ce dont le monde a besoin et ce pour quoi vous pouvez etre paye. J'aide mes clients a trouver leur Ikigai strategique — ce point ou le potentiel commercial rencontre l'epanouissement personnel.",
    lean_title: "Lean Six Sigma",
    lean_sub: "Excellence Operationnelle",
    lean_desc: "Une methodologie data-driven pour eliminer le gaspillage, reduire la variabilite et optimiser les processus. J'integre les principes Lean Six Sigma dans chaque mission, garantissant des gains d'efficacite mesurables.",
    martial_note: "Ces principes, enracines dans la discipline des arts martiaux, constituent le fondement d'une methode de travail rigoureuse, respectueuse et orientee resultats.",
  },
  de: {
    label: "Philosophie & Disziplin",
    title: "Wo Strategie auf Disziplin trifft",
    intro: "Mein Beratungsansatz ist nicht nur durch Jahrzehnte professioneller Erfahrung und kontinuierlicher Weiterbildung gepragt, sondern auch durch die soliden Prinzipien der Kampfkunst-Disziplin, die meine Denkweise und Arbeitsethik geformt haben.",
    kaizen_title: "Kaizen",
    kaizen_sub: "Kontinuierliche Verbesserung",
    kaizen_desc: "Die japanische Philosophie der standigen, schrittweisen Verbesserung. Jedes Projekt, jeder Prozess, jede Interaktion ist eine Gelegenheit zur Verfeinerung. Ich wende Kaizen an, um sicherzustellen, dass Ergebnisse Erwartungen konstant ubertreffen.",
    ikigai_title: "Ikigai",
    ikigai_sub: "Zweck & Leidenschaft",
    ikigai_desc: "Die Schnittmenge aus dem, was Sie lieben, worin Sie gut sind, was die Welt braucht und wofur Sie bezahlt werden konnen. Ich helfe meinen Kunden, ihr strategisches Ikigai zu finden — den Sweet Spot, wo Geschaftspotenzial auf personliche Erfullung trifft.",
    lean_title: "Lean Six Sigma",
    lean_sub: "Operative Exzellenz",
    lean_desc: "Eine datengetriebene Methodik zur Beseitigung von Verschwendung, Reduzierung von Variabilitat und Optimierung von Prozessen. Ich integriere Lean Six Sigma-Prinzipien in jedes Engagement fur messbare Effizienzgewinne.",
    martial_note: "Diese Prinzipien, verwurzelt in der Disziplin der Kampfkunst, bilden das Fundament einer Arbeitsmethode, die rigoros, respektvoll und ergebnisorientiert ist.",
  },
};

const competencies = [
  "Agile & Scrum", "Lean Six Sigma", "Kaizen", "PMO Setup", "Digital Strategy", "Brand Management",
  "Real Estate Advisory", "M&A Support", "Change Management", "Market Entry", "Team Leadership",
  "Data Analytics", "CRM & Automation", "Risk Management", "Stakeholder Engagement", "SEO/SEM",
];

export default function BiographyPage({ locale, setLocale }) {
  const milestones = careerMilestones[locale] || careerMilestones.en;
  const phil = philosophyTexts[locale] || philosophyTexts.en;

  return (
    <div className="min-h-screen bg-[#080808]" data-testid="biography-page">
      <SEO title="Mauro Ferrante - Biografia" description="Senior Consultant con oltre 20 anni di esperienza in 13 paesi. Project Management, Digital Marketing e Real Estate Investments." path="/about" />
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#080808]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors" data-testid="back-home-link">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#c9a84c]/15 via-transparent to-[#c9a84c]/10 rounded-2xl blur-xl" />
              <div className="relative overflow-hidden rounded-xl border border-[#c9a84c]/20">
                <img src="/images/mauro-ferrante.jpg" alt="Mauro Ferrante" className="w-full h-[550px] object-cover object-top" loading="lazy" data-testid="bio-photo" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>
            </div>

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
            {locale === "it" ? "Percorso Professionale" : locale === "es" ? "Trayectoria Profesional" : locale === "fr" ? "Parcours Professionnel" : locale === "de" ? "Beruflicher Werdegang" : "Career Path"}
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

      {/* Philosophy & Discipline — Kaizen, Ikigai, Lean Six Sigma */}
      <section className="py-20 bg-[#0a0a0a]" data-testid="philosophy-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{phil.label}</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-4">{phil.title}</h2>
            <p className="text-white/40 text-sm mt-4 max-w-3xl mx-auto leading-relaxed">{phil.intro}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Kaizen */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-7 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid="kaizen-card">
              <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-serif font-bold text-lg mb-1">{phil.kaizen_title}</h3>
              <p className="text-[#c9a84c]/50 text-xs font-medium tracking-wider uppercase mb-3">{phil.kaizen_sub}</p>
              <p className="text-white/40 text-sm leading-relaxed">{phil.kaizen_desc}</p>
            </div>

            {/* Ikigai */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-7 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid="ikigai-card">
              <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center mb-5">
                <Swords className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-serif font-bold text-lg mb-1">{phil.ikigai_title}</h3>
              <p className="text-[#c9a84c]/50 text-xs font-medium tracking-wider uppercase mb-3">{phil.ikigai_sub}</p>
              <p className="text-white/40 text-sm leading-relaxed">{phil.ikigai_desc}</p>
            </div>

            {/* Lean Six Sigma */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-7 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid="lean-card">
              <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-serif font-bold text-lg mb-1">{phil.lean_title}</h3>
              <p className="text-[#c9a84c]/50 text-xs font-medium tracking-wider uppercase mb-3">{phil.lean_sub}</p>
              <p className="text-white/40 text-sm leading-relaxed">{phil.lean_desc}</p>
            </div>
          </div>

          <p className="text-center text-white/25 text-xs mt-10 italic max-w-2xl mx-auto">{phil.martial_note}</p>
        </div>
      </section>

      {/* Competencies */}
      <section className="py-16 bg-[#080808]">
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
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-serif text-white font-bold text-center mb-8">{t(locale, "about_page_languages_label")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((l) => (
              <div key={l.name} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 text-center">
                <div className="text-white font-medium text-sm">{l.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudiesPreview locale={locale} />

      {/* World Map */}
      <WorldMap locale={locale} />

      {/* All Reviews */}
      <Reviews locale={locale} showAll={true} />

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
