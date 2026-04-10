import { useParams, Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";

const configs = {
  "project-management": {
    heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&fit=crop",
    titleKey: "pm_title", subtitleKey: "pm_subtitle", descKey: "pm_desc",
    details: ["pm_detail_1", "pm_detail_2", "pm_detail_3", "pm_detail_4", "pm_detail_5", "pm_detail_6"],
    subServices: [
      { title: { en: "Project Planning & Roadmap Design", it: "Pianificazione Progetti e Roadmap" }, desc: { en: "Strategic project planning with clear milestones, deliverables and timelines tailored to your business objectives.", it: "Pianificazione strategica dei progetti con milestone, deliverable e tempistiche chiare e personalizzate." } },
      { title: { en: "PMO Setup & Governance", it: "Setup PMO e Governance" }, desc: { en: "Establish a Project Management Office that drives consistent delivery standards, reporting and continuous improvement.", it: "Crea un PMO che guidi standard di consegna, reporting e miglioramento continuo." } },
      { title: { en: "Agile & Scrum Implementation", it: "Implementazione Agile & Scrum" }, desc: { en: "Transform your delivery approach with tailored Agile methodologies adapted to your team size and project complexity.", it: "Trasforma il tuo approccio con metodologie Agile su misura per il tuo team e complessità." } },
      { title: { en: "Risk Management", it: "Gestione dei Rischi" }, desc: { en: "Proactive risk identification, assessment and mitigation strategies to protect project outcomes.", it: "Identificazione proattiva, valutazione e strategie di mitigazione dei rischi." } },
      { title: { en: "Stakeholder Management", it: "Gestione degli Stakeholder" }, desc: { en: "Cross-functional team leadership and stakeholder engagement to keep alignment throughout the project lifecycle.", it: "Leadership cross-funzionale e coinvolgimento degli stakeholder per mantenere l'allineamento." } },
      { title: { en: "KPI Monitoring & Reporting", it: "Monitoraggio KPI e Reporting" }, desc: { en: "Real-time KPI dashboards, progress tracking and executive reporting for full project visibility.", it: "Dashboard KPI in tempo reale, tracking e reporting esecutivo per visibilità completa." } },
    ],
  },
  "digital-marketing": {
    heroImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1400&q=85&fit=crop",
    titleKey: "digital_title", subtitleKey: "digital_subtitle", descKey: "digital_desc",
    details: ["digital_detail_1", "digital_detail_2", "digital_detail_3", "digital_detail_4", "digital_detail_5", "digital_detail_6", "digital_detail_7"],
    subServices: [
      { title: { en: "Digital Strategy Design", it: "Progettazione Strategia Digitale" }, desc: { en: "End-to-end digital strategy aligned with your business goals, market positioning and competitive landscape.", it: "Strategia digitale end-to-end allineata con i tuoi obiettivi di business." } },
      { title: { en: "Brand Identity & Positioning", it: "Brand Identity e Posizionamento" }, desc: { en: "Create a distinctive brand identity that resonates with your target audience and differentiates you in the market.", it: "Crea un'identità di brand distintiva che risuoni con il tuo pubblico target." } },
      { title: { en: "Omnichannel Marketing", it: "Marketing Omnicanale" }, desc: { en: "Integrated SEO, SEM, social media and content marketing campaigns that drive measurable results.", it: "Campagne integrate SEO, SEM, social media e content marketing con risultati misurabili." } },
      { title: { en: "E-commerce Development", it: "Sviluppo E-commerce" }, desc: { en: "Custom e-commerce solutions from platform selection to launch, optimised for conversion.", it: "Soluzioni e-commerce personalizzate dalla selezione della piattaforma al lancio." } },
      { title: { en: "CRM & Marketing Automation", it: "CRM e Marketing Automation" }, desc: { en: "Implement and optimise CRM systems with automated workflows for lead nurturing and customer retention.", it: "Implementa e ottimizza sistemi CRM con workflow automatizzati per lead nurturing." } },
      { title: { en: "Data Analytics & BI", it: "Data Analytics e BI" }, desc: { en: "Transform raw data into actionable insights with custom dashboards and performance reporting.", it: "Trasforma i dati grezzi in insight con dashboard personalizzate e reporting." } },
      { title: { en: "Web & App Development", it: "Sviluppo Web e App" }, desc: { en: "Professional website and application development across web, mobile and e-commerce platforms.", it: "Sviluppo professionale di siti web e applicazioni su piattaforme web, mobile e e-commerce." } },
    ],
  },
  "real-estate": {
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&fit=crop",
    titleKey: "re_title", subtitleKey: "re_subtitle", descKey: "re_desc",
    details: ["re_detail_1", "re_detail_2", "re_detail_3", "re_detail_4", "re_detail_5", "re_detail_6"],
    subServices: [
      { title: { en: "Market Research & Scouting", it: "Ricerca di Mercato e Scouting" }, desc: { en: "In-depth market analysis and investment opportunity identification across international real estate markets.", it: "Analisi approfondita e identificazione delle opportunità nei mercati immobiliari internazionali." } },
      { title: { en: "Due Diligence & Valuation", it: "Due Diligence e Valutazione" }, desc: { en: "Comprehensive asset evaluation including legal, financial and structural due diligence.", it: "Valutazione completa degli asset con due diligence legale, finanziaria e strutturale." } },
      { title: { en: "Portfolio Management", it: "Gestione del Portafoglio" }, desc: { en: "Strategic portfolio optimisation to maximise returns and minimise risk across your property holdings.", it: "Ottimizzazione strategica del portafoglio per massimizzare i rendimenti." } },
      { title: { en: "International Deal Structuring", it: "Strutturazione Operazioni Internazionali" }, desc: { en: "Cross-border real estate transaction structuring with tax-efficient and legally compliant frameworks.", it: "Strutturazione di transazioni immobiliari cross-border con framework fiscalmente efficienti." } },
      { title: { en: "Negotiation & Closing", it: "Negoziazione e Closing" }, desc: { en: "Expert negotiation support and full closing assistance including legal coordination.", it: "Supporto alla negoziazione e assistenza completa al closing con coordinamento legale." } },
      { title: { en: "Property Management Consulting", it: "Consulenza Property Management" }, desc: { en: "Short-term rental optimisation, property management strategy and yield maximisation.", it: "Ottimizzazione affitti brevi, strategia di property management e massimizzazione dei rendimenti." } },
    ],
  },
};

export default function ServiceDetailPage({ locale, setLocale }) {
  const { slug } = useParams();
  const config = configs[slug];

  if (!config) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl font-serif mb-4">Service not found</h1>
        <Link to="/" className="text-[#c9a84c] underline">Go back</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808]" data-testid={`service-page-${slug}`}>
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img src={config.heroImage} alt={t(locale, config.titleKey)} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-6 transition-colors" data-testid="back-home-link">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="block text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase mb-3">{t(locale, config.subtitleKey)}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold">{t(locale, config.titleKey)}</h1>
          <p className="text-white/50 text-lg mt-4 max-w-2xl">{t(locale, config.descKey)}</p>
        </div>
      </section>

      {/* Details List */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {config.details.map((key) => (
              <div key={key} className="flex items-start gap-3 bg-[#0f0f0f] border border-white/5 rounded-xl p-5">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c]/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{t(locale, key)}</span>
              </div>
            ))}
          </div>

          {/* Sub-services */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-white font-bold text-center mb-12">
              {locale === "it" ? "Servizi nel Dettaglio" : locale === "es" ? "Servicios en Detalle" : "Services in Detail"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {config.subServices.map((sub, i) => (
                <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-8 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`sub-service-${i}`}>
                  <span className="text-[#c9a84c]/30 text-5xl font-serif font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-white font-semibold text-lg mt-4 mb-3">{sub.title[locale] || sub.title.en}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{sub.desc[locale] || sub.desc.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif text-white font-bold mb-4">
            {locale === "it" ? "Pronto a Iniziare?" : locale === "es" ? "Listo para Empezar?" : "Ready to Get Started?"}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {locale === "it" ? "Prenota una consulenza gratuita e parliamo del tuo progetto." : "Book a free consultation and let's discuss your project."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/393491177007" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all">WhatsApp EU & Asia</a>
            <a href="https://wa.me/51964243686" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all">WhatsApp LATAM & USA</a>
            <a href="mailto:mauro@mauroferrante.com" className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 hover:bg-[#c9a84c]/20 px-6 py-3 rounded-lg text-sm font-medium transition-all">Email</a>
          </div>
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
