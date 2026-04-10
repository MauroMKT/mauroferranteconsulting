import { useParams, Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { caseStudies } from "@/lib/caseStudies";
import { ArrowLeft, CheckCircle2, ArrowRight, TrendingUp, Clock, MapPin, Tag } from "lucide-react";

const configs = {
  "project-management": {
    heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&fit=crop",
    titleKey: "pm_title", subtitleKey: "pm_subtitle", descKey: "pm_desc",
    details: ["pm_detail_1", "pm_detail_2", "pm_detail_3", "pm_detail_4", "pm_detail_5", "pm_detail_6"],
    intro: {
      en: "With over 150 projects successfully delivered across 12 countries, Mauro Ferrante brings a battle-tested approach to project management that goes beyond methodology. Whether you're launching a startup, scaling operations, or navigating a complex enterprise transformation, every engagement is designed to deliver measurable results on time and within budget. The approach combines the rigour of traditional project management with the flexibility of Agile, adapted to the specific context, culture, and constraints of each organisation.",
      it: "Con oltre 150 progetti consegnati con successo in 12 paesi, Mauro Ferrante porta un approccio testato sul campo al project management che va oltre la metodologia. Che si tratti di lanciare una startup, scalare le operazioni o navigare una trasformazione aziendale complessa, ogni mandato e progettato per consegnare risultati misurabili nei tempi e nel budget. L'approccio combina il rigore del project management tradizionale con la flessibilita dell'Agile, adattato al contesto specifico, alla cultura e ai vincoli di ogni organizzazione.",
    },
    subServices: [
      { title: { en: "Project Planning & Roadmap Design", it: "Pianificazione Progetti e Roadmap" }, desc: { en: "Strategic project planning with clear milestones, deliverables and timelines tailored to your business objectives. Every roadmap includes risk buffers, resource allocation matrices, and stakeholder communication plans to ensure alignment from day one.", it: "Pianificazione strategica dei progetti con milestone, deliverable e tempistiche chiare. Ogni roadmap include buffer di rischio, matrici di allocazione risorse e piani di comunicazione per gli stakeholder." } },
      { title: { en: "PMO Setup & Governance", it: "Setup PMO e Governance" }, desc: { en: "Establish a Project Management Office that drives consistent delivery standards across your organisation. From governance frameworks and reporting templates to escalation procedures and continuous improvement cycles, the PMO becomes your operational backbone.", it: "Creazione di un PMO che guidi standard di consegna coerenti nella tua organizzazione. Dai framework di governance ai template di reporting, dalle procedure di escalation ai cicli di miglioramento continuo." } },
      { title: { en: "Agile & Scrum Implementation", it: "Implementazione Agile & Scrum" }, desc: { en: "Transform your delivery approach with tailored Agile methodologies. Whether pure Scrum, Kanban, SAFe, or a hybrid approach, the implementation is adapted to your team size, project complexity, and organisational culture. Includes sprint planning, retrospective facilitation, and velocity tracking.", it: "Trasforma il tuo approccio con metodologie Agile su misura. Che sia Scrum puro, Kanban, SAFe o un approccio ibrido, l'implementazione e adattata alle dimensioni del team, alla complessita del progetto e alla cultura organizzativa." } },
      { title: { en: "Risk Assessment & Mitigation", it: "Valutazione e Mitigazione dei Rischi" }, desc: { en: "Proactive risk identification using proven frameworks (FMEA, Monte Carlo simulation, qualitative risk scoring). Every project maintains a living risk register with assigned owners, trigger conditions, and pre-approved mitigation actions to prevent surprises.", it: "Identificazione proattiva dei rischi con framework provati (FMEA, simulazione Monte Carlo, scoring qualitativo). Ogni progetto mantiene un registro rischi vivo con responsabili, condizioni di trigger e azioni di mitigazione pre-approvate." } },
      { title: { en: "Stakeholder Management & Leadership", it: "Gestione Stakeholder e Leadership" }, desc: { en: "Cross-functional team leadership and stakeholder engagement using power-interest mapping and tailored communication strategies. Expertise in managing C-level expectations, cross-cultural teams, and multi-vendor environments where alignment is critical to success.", it: "Leadership cross-funzionale e coinvolgimento stakeholder con mapping potere-interesse e strategie di comunicazione su misura. Esperienza nella gestione delle aspettative C-level, team multiculturali e ambienti multi-vendor." } },
      { title: { en: "KPI Monitoring & Continuous Improvement", it: "Monitoraggio KPI e Miglioramento Continuo" }, desc: { en: "Real-time project dashboards tracking schedule performance index (SPI), cost performance index (CPI), earned value metrics, and custom KPIs. Monthly executive reports with trend analysis and actionable recommendations for continuous improvement.", it: "Dashboard di progetto in tempo reale con SPI, CPI, metriche earned value e KPI personalizzati. Report esecutivi mensili con analisi dei trend e raccomandazioni per il miglioramento continuo." } },
      { title: { en: "Brand Reengineering", it: "Reingegneria del Brand" }, desc: { en: "A comprehensive approach to transforming an organisation's brand from the ground up. Brand reengineering goes beyond a simple rebrand: it involves deep analysis of market positioning, customer perception, competitive landscape, and internal culture. The process includes brand audit, archetype definition, visual identity redesign, messaging framework creation, and implementation across all touchpoints. Ideal for companies that have outgrown their original brand or need to reposition after market shifts, mergers, or strategic pivots.", it: "Un approccio completo per trasformare il brand di un'organizzazione dalle fondamenta. La reingegneria del brand va oltre un semplice rebranding: implica un'analisi profonda del posizionamento di mercato, della percezione dei clienti, del panorama competitivo e della cultura interna. Il processo include audit del brand, definizione degli archetipi, ridisegno dell'identita visiva, creazione del framework di messaggistica e implementazione su tutti i touchpoint. Ideale per aziende che hanno superato il brand originale o devono riposizionarsi dopo cambiamenti di mercato, fusioni o pivot strategici." } },
    ],
  },
  "digital-marketing": {
    heroImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1400&q=85&fit=crop",
    titleKey: "digital_title", subtitleKey: "digital_subtitle", descKey: "digital_desc",
    details: ["digital_detail_1", "digital_detail_2", "digital_detail_3", "digital_detail_4", "digital_detail_5", "digital_detail_6", "digital_detail_7"],
    intro: {
      en: "In an era where digital presence determines business survival, Mauro Ferrante Consulting Studio provides strategic consulting that bridges the gap between technology and business results. Every digital transformation engagement starts with understanding your business model, competitive landscape, and growth objectives — not with tools or platforms. The goal is always measurable impact: more qualified leads, higher conversion rates, stronger brand recognition, and sustainable revenue growth through data-driven decision making.",
      it: "In un'era in cui la presenza digitale determina la sopravvivenza aziendale, Mauro Ferrante Consulting Studio fornisce consulenza strategica che colma il divario tra tecnologia e risultati di business. Ogni mandato di trasformazione digitale parte dalla comprensione del modello di business, del panorama competitivo e degli obiettivi di crescita — non dagli strumenti o dalle piattaforme. L'obiettivo e sempre l'impatto misurabile: piu lead qualificati, tassi di conversione piu alti, maggiore riconoscimento del brand e crescita sostenibile del fatturato attraverso decisioni basate sui dati.",
    },
    subServices: [
      { title: { en: "Digital Strategy Design", it: "Progettazione Strategia Digitale" }, desc: { en: "End-to-end digital strategy aligned with your business goals, market positioning and competitive landscape. Includes digital maturity assessment, channel prioritisation, budget allocation framework, and a 12-month implementation roadmap with quarterly milestones and KPIs.", it: "Strategia digitale end-to-end allineata con obiettivi di business, posizionamento e panorama competitivo. Include valutazione maturita digitale, prioritizzazione canali, framework di allocazione budget e roadmap a 12 mesi con milestone trimestrali e KPI." } },
      { title: { en: "Brand Identity & Positioning", it: "Brand Identity e Posizionamento" }, desc: { en: "Create a distinctive brand identity that resonates with your target audience. From logo design and visual system to tone of voice and brand guidelines, every element is designed to differentiate you in the market and build lasting emotional connections with your audience.", it: "Crea un'identita di brand distintiva. Dal design del logo al sistema visivo, dal tono di voce alle linee guida del brand, ogni elemento e progettato per differenziarti nel mercato e costruire connessioni emotive durature." } },
      { title: { en: "Omnichannel Marketing Campaigns", it: "Campagne Marketing Omnicanale" }, desc: { en: "Integrated SEO, SEM, social media, and content marketing campaigns that work together to drive measurable results. Each campaign includes audience segmentation, creative development, A/B testing protocols, and real-time performance optimisation across all channels.", it: "Campagne integrate SEO, SEM, social media e content marketing che lavorano insieme per risultati misurabili. Ogni campagna include segmentazione audience, sviluppo creativo, protocolli A/B testing e ottimizzazione in tempo reale." } },
      { title: { en: "E-commerce & Platform Development", it: "Sviluppo E-commerce e Piattaforme" }, desc: { en: "Custom e-commerce solutions from platform selection (Shopify, WooCommerce, Magento) to launch and optimisation. Includes UX/UI design, payment gateway integration, inventory management, and conversion rate optimisation with continuous testing.", it: "Soluzioni e-commerce personalizzate dalla selezione della piattaforma al lancio e ottimizzazione. Include design UX/UI, integrazione gateway di pagamento, gestione inventario e ottimizzazione del tasso di conversione." } },
      { title: { en: "CRM & Marketing Automation", it: "CRM e Marketing Automation" }, desc: { en: "Implement and optimise CRM systems (HubSpot, Salesforce, Zoho) with automated workflows for lead nurturing, customer retention, and upselling. Includes lead scoring models, email sequence design, and attribution reporting to measure true marketing ROI.", it: "Implementazione e ottimizzazione CRM (HubSpot, Salesforce, Zoho) con workflow automatizzati per lead nurturing, fidelizzazione e upselling. Include modelli di lead scoring, design sequenze email e reporting di attribuzione." } },
      { title: { en: "Data Analytics & Business Intelligence", it: "Data Analytics e Business Intelligence" }, desc: { en: "Transform raw data into actionable insights with custom dashboards (Google Data Studio, Power BI, Tableau). Includes tracking setup, conversion funnel analysis, cohort analysis, and executive reporting that connects marketing metrics to business outcomes.", it: "Trasforma i dati grezzi in insight con dashboard personalizzate (Google Data Studio, Power BI, Tableau). Include setup tracking, analisi funnel conversione, analisi di coorte e reporting esecutivo." } },
      { title: { en: "Web & App Development", it: "Sviluppo Web e App" }, desc: { en: "Professional website and application development across web, mobile, and e-commerce platforms. From responsive websites and progressive web apps to native mobile applications, every project follows UX best practices and is built for performance, SEO, and conversion.", it: "Sviluppo professionale di siti web e applicazioni. Dai siti responsive alle progressive web app fino alle applicazioni mobile native, ogni progetto segue le best practice UX ed e costruito per performance, SEO e conversione." } },
      { title: { en: "Marketing Reengineering", it: "Reingegneria del Marketing" }, desc: { en: "Marketing reengineering is the systematic analysis and restructuring of an organisation's entire marketing function. Unlike incremental improvements, reengineering starts from a blank slate: it audits every existing channel, campaign, and investment to identify what truly drives results and what is wasted spend. The process involves competitive benchmarking, customer journey mapping, channel attribution analysis, and complete funnel redesign. The output is a leaner, more effective marketing machine that delivers higher ROI with optimised resource allocation. This service is particularly valuable for companies that have accumulated years of fragmented marketing activities without a cohesive strategy, or those facing declining returns from traditional marketing approaches.", it: "La reingegneria del marketing e l'analisi sistematica e la ristrutturazione dell'intera funzione marketing di un'organizzazione. A differenza dei miglioramenti incrementali, la reingegneria parte da zero: audita ogni canale, campagna e investimento esistente per identificare cosa produce veramente risultati e cosa e spesa sprecata. Il processo include benchmarking competitivo, mappatura del customer journey, analisi di attribuzione dei canali e ridisegno completo del funnel. Il risultato e una macchina di marketing piu snella ed efficace che produce ROI piu alto con allocazione ottimizzata delle risorse. Questo servizio e particolarmente prezioso per le aziende che hanno accumulato anni di attivita marketing frammentate senza una strategia coesa, o quelle che affrontano rendimenti decrescenti dagli approcci marketing tradizionali." } },
    ],
  },
  "real-estate": {
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&fit=crop",
    titleKey: "re_title", subtitleKey: "re_subtitle", descKey: "re_desc",
    details: ["re_detail_1", "re_detail_2", "re_detail_3", "re_detail_4", "re_detail_5", "re_detail_6"],
    intro: {
      en: "Real estate investment decisions require a unique combination of market knowledge, financial analysis, and cross-border expertise. Mauro Ferrante Consulting Studio provides advisory services that guide investors through every stage of the investment lifecycle — from initial market research and opportunity identification to due diligence, acquisition, management, and exit strategy. With active experience in European, Latin American, and Asian markets, the advisory goes beyond generic recommendations to deliver culturally-aware, legally-sound, and financially-optimised investment strategies.",
      it: "Le decisioni di investimento immobiliare richiedono una combinazione unica di conoscenza del mercato, analisi finanziaria e competenza cross-border. Mauro Ferrante Consulting Studio fornisce servizi di advisory che guidano gli investitori attraverso ogni fase del ciclo di vita dell'investimento — dalla ricerca di mercato iniziale all'identificazione delle opportunita, dalla due diligence all'acquisizione, gestione e strategia di uscita. Con esperienza attiva nei mercati europei, latinoamericani e asiatici, la consulenza va oltre le raccomandazioni generiche per offrire strategie culturalmente consapevoli, legalmente solide e finanziariamente ottimizzate.",
    },
    subServices: [
      { title: { en: "Market Research & Opportunity Scouting", it: "Ricerca di Mercato e Scouting Opportunita" }, desc: { en: "In-depth market analysis covering macro-economic indicators, neighbourhood-level trends, rental yield benchmarks, and growth projections. Every analysis includes comparable property assessments, seasonal demand patterns, and risk-adjusted return forecasts for informed decision-making.", it: "Analisi di mercato approfondita con indicatori macroeconomici, trend a livello di quartiere, benchmark di rendimento da affitto e proiezioni di crescita. Ogni analisi include valutazioni di proprieta comparabili, pattern di domanda stagionale e previsioni di rendimento corrette per il rischio." } },
      { title: { en: "Due Diligence & Asset Valuation", it: "Due Diligence e Valutazione Asset" }, desc: { en: "Comprehensive asset evaluation including legal title verification, structural inspection coordination, financial audit of operating history, zoning compliance, and environmental assessments. The due diligence process is designed to uncover hidden risks before they become costly problems.", it: "Valutazione completa dell'asset con verifica del titolo legale, coordinamento ispezioni strutturali, audit finanziario della storia operativa, conformita urbanistica e valutazioni ambientali." } },
      { title: { en: "Portfolio Management & Optimisation", it: "Gestione e Ottimizzazione del Portafoglio" }, desc: { en: "Strategic portfolio optimisation to maximise returns while managing risk. Includes asset allocation analysis, performance benchmarking, capital expenditure planning, and exit timing recommendations based on market cycle analysis.", it: "Ottimizzazione strategica del portafoglio per massimizzare i rendimenti gestendo il rischio. Include analisi dell'allocazione degli asset, benchmarking delle performance, pianificazione delle spese in conto capitale e raccomandazioni sui tempi di uscita." } },
      { title: { en: "International Deal Structuring", it: "Strutturazione Operazioni Internazionali" }, desc: { en: "Cross-border real estate transaction structuring with tax-efficient and legally compliant frameworks. Expertise in LLC/corporation selection, double taxation treaty application, foreign ownership regulations, and repatriation strategies across multiple jurisdictions.", it: "Strutturazione di transazioni immobiliari cross-border con framework fiscalmente efficienti e legalmente conformi. Competenza in selezione LLC/societa, applicazione trattati doppia imposizione, normative proprieta straniera e strategie di rimpatrio." } },
      { title: { en: "Negotiation & Closing Support", it: "Negoziazione e Supporto al Closing" }, desc: { en: "Expert negotiation support from initial offer through final closing. Includes offer strategy, counter-offer management, inspection contingency negotiations, and full closing coordination with attorneys, title companies, lenders, and escrow agents.", it: "Supporto alla negoziazione dall'offerta iniziale al closing finale. Include strategia di offerta, gestione controfferte, negoziazione contingenze ispezione e coordinamento completo del closing con avvocati, titolari e agenti escrow." } },
      { title: { en: "Property Management Consulting", it: "Consulenza Property Management" }, desc: { en: "Short-term rental optimisation, long-term property management strategy, and yield maximisation consulting. Includes platform selection, dynamic pricing strategy, guest experience design, maintenance planning, and financial reporting for property owners.", it: "Ottimizzazione affitti brevi, strategia di property management a lungo termine e consulenza per la massimizzazione dei rendimenti. Include selezione piattaforme, strategia di pricing dinamico, design dell'esperienza ospiti e reporting finanziario." } },
    ],
  },
};

function CaseStudyCard({ cs, locale }) {
  const title = cs.titles[locale] || cs.titles.en;
  const challenge = cs.challenges[locale] || cs.challenges.en;
  const solution = cs.solutions[locale] || cs.solutions.en;
  const result = cs.results[locale] || cs.results.en;

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`case-study-${cs.id}`}>
      <div className="p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-[#c9a84c] text-xs font-medium tracking-wider">{cs.year}</span>
          <span className="text-white/20">·</span>
          <span className="flex items-center gap-1 text-white/30 text-xs"><MapPin className="w-3 h-3" />{cs.country}</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-4 font-serif">{title}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-[#c9a84c]/70 text-xs font-medium tracking-[0.15em] uppercase mb-2">{locale === "it" ? "Sfida" : "Challenge"}</h4>
            <p className="text-white/40 text-sm leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-[#c9a84c]/70 text-xs font-medium tracking-[0.15em] uppercase mb-2">{locale === "it" ? "Soluzione" : "Solution"}</h4>
            <p className="text-white/40 text-sm leading-relaxed">{solution}</p>
          </div>
          <div>
            <h4 className="text-[#c9a84c]/70 text-xs font-medium tracking-[0.15em] uppercase mb-2">{locale === "it" ? "Risultati" : "Results"}</h4>
            <p className="text-white/50 text-sm leading-relaxed font-medium">{result}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {cs.tags.map((tag) => (
            <span key={tag} className="bg-white/5 text-white/30 text-[10px] tracking-wider px-2.5 py-1 rounded-full border border-white/5">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage({ locale, setLocale }) {
  const { slug } = useParams();
  const config = configs[slug];
  const relatedCases = caseStudies.filter((cs) => cs.service === slug);

  if (!config) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <Link to="/" className="text-[#c9a84c] underline">Go back</Link>
    </div>
  );

  const intro = config.intro[locale] || config.intro.en;

  return (
    <div className="min-h-screen bg-[#080808]" data-testid={`service-page-${slug}`}>
      <SEO title={t(locale, config.titleKey)} description={t(locale, config.descKey)} path={`/services/${slug}`} />
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img src={config.heroImage} alt={t(locale, config.titleKey)} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-6 transition-colors" data-testid="back-home-link">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="block text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase mb-3">{t(locale, config.subtitleKey)}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold">{t(locale, config.titleKey)}</h1>
          <p className="text-white/50 text-lg mt-4 max-w-3xl">{t(locale, config.descKey)}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/50 text-base leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* Capabilities overview */}
      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.details.map((key) => (
              <div key={key} className="flex items-start gap-3 bg-[#0f0f0f] border border-white/5 rounded-xl p-5">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c]/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{t(locale, key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-services in detail */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-white font-bold text-center mb-12">
            {locale === "it" ? "Servizi nel Dettaglio" : locale === "es" ? "Servicios en Detalle" : locale === "fr" ? "Services en Detail" : locale === "de" ? "Dienstleistungen im Detail" : "Services in Detail"}
          </h2>
          <div className="space-y-8">
            {config.subServices.map((sub, i) => (
              <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-8 hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`sub-service-${i}`}>
                <div className="flex items-start gap-6">
                  <span className="text-[#c9a84c]/20 text-5xl font-serif font-bold leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-3">{sub.title[locale] || sub.title.en}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{sub.desc[locale] || sub.desc.en}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {relatedCases.length > 0 && (
        <section className="py-20 bg-[#080808]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">Case Studies</span>
              <h2 className="text-2xl font-serif text-white font-bold mt-4">
                {locale === "it" ? "Casi Studio Reali" : locale === "es" ? "Casos de Estudio Reales" : locale === "fr" ? "Etudes de Cas Reelles" : locale === "de" ? "Echte Fallstudien" : "Real Case Studies"}
              </h2>
            </div>
            <div className="space-y-8">
              {relatedCases.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif text-white font-bold mb-4">
            {locale === "it" ? "Pronto a Iniziare?" : locale === "es" ? "Listo para Empezar?" : locale === "fr" ? "Pret a Commencer?" : locale === "de" ? "Bereit Anzufangen?" : "Ready to Get Started?"}
          </h2>
          <p className="text-white/40 text-sm mb-8">
            {locale === "it" ? "Prenota una consulenza gratuita di 30 minuti e parliamo del tuo progetto." : "Book a free 30-minute consultation and let's discuss your project."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/393491177007" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all">WhatsApp EUROPA & ASIA</a>
            <a href="https://wa.me/51964243686" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/30 px-6 py-3 rounded-lg text-sm font-medium transition-all">WhatsApp USA & LATAM</a>
            <a href="mailto:mauro@mauroferrante.com" className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 hover:bg-[#c9a84c]/20 px-6 py-3 rounded-lg text-sm font-medium transition-all">Email</a>
          </div>
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
