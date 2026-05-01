import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowLeft, Globe, Building2, Users, TrendingUp, MonitorSmartphone, ExternalLink, CheckCircle2, ShieldCheck, Layers, Truck, GraduationCap } from "lucide-react";

const partnersData = {
  "remax-easy": {
    name: "RE/MAX Easy",
    fullName: "RE/MAX Easy — Dieffecase srl",
    logo: "/images/remax-easy-logo.svg",
    logoBg: "#ffffff",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&fit=crop",
    website: "https://www.remax.it/trova/agenti-agenzie/agenzia/easy",
    description: {
      en: "RE/MAX Easy is a modern real estate agency based in Rome, part of the RE/MAX international network — the world's largest by number of agents. Led by Broker Daniela Vittori, the team operates with ethics, collaboration, dedication, and loyalty. Their mission: selling properties at the best market value, in the shortest time, with minimum hassle.",
      it: "RE/MAX Easy è un'agenzia immobiliare moderna con sede a Roma, parte della rete internazionale RE/MAX — la più grande al mondo per numero di agenti. Guidata dal Broker Daniela Vittori, il team opera con etica, collaborazione, dedizione e lealtà. La loro missione: vendere immobili al miglior valore di mercato, nel minor tempo possibile, con il minor disturbo.",
      es: "RE/MAX Easy es una agencia inmobiliaria moderna con sede en Roma, parte de la red internacional RE/MAX — la más grande del mundo por número de agentes. Liderada por la Broker Daniela Vittori, el equipo opera con ética, colaboración, dedicación y lealtad.",
      fr: "RE/MAX Easy est une agence immobilière moderne basée à Rome, faisant partie du réseau international RE/MAX — le plus grand au monde par nombre d'agents. Dirigée par le Broker Daniela Vittori, l'équipe opère avec éthique, collaboration, dévouement et loyauté.",
      de: "RE/MAX Easy ist eine moderne Immobilienagentur mit Sitz in Rom, Teil des internationalen RE/MAX-Netzwerks — dem weltweit größten nach Anzahl der Makler. Unter der Leitung von Broker Daniela Vittori arbeitet das Team mit Ethik, Zusammenarbeit, Hingabe und Loyalität.",
    },
    collaboration: {
      en: "Mauro Ferrante Consulting Studio collaborates with RE/MAX Easy to provide comprehensive real estate advisory services in Rome. Together, we combine strategic consulting expertise with deep local market knowledge to deliver exceptional results for buyers, sellers, and investors.",
      it: "Mauro Ferrante Consulting Studio collabora con RE/MAX Easy per fornire servizi completi di consulenza immobiliare a Roma. Insieme, combiniamo l'esperienza nella consulenza strategica con una profonda conoscenza del mercato locale per offrire risultati eccezionali a compratori, venditori e investitori.",
      es: "Mauro Ferrante Consulting Studio colabora con RE/MAX Easy para proporcionar servicios integrales de asesoría inmobiliaria en Roma.",
      fr: "Mauro Ferrante Consulting Studio collabore avec RE/MAX Easy pour fournir des services complets de conseil immobilier à Rome.",
      de: "Mauro Ferrante Consulting Studio arbeitet mit RE/MAX Easy zusammen, um umfassende Immobilienberatung in Rom anzubieten.",
    },
    services: {
      en: ["Residential & commercial property sales", "Property valuation at best market price", "Buyer needs analysis & targeted viewings", "International investor advisory", "RE/MAX global collaboration network", "Advanced marketing & technology tools", "Short-term rental consulting", "Legal & administrative support coordination"],
      it: ["Compravendita residenziale e commerciale", "Valutazione immobili al miglior prezzo di mercato", "Analisi esigenze acquirente e visite mirate", "Consulenza per investitori internazionali", "Rete di collaborazione globale RE/MAX", "Strumenti avanzati di marketing e tecnologia", "Consulenza affitti brevi", "Coordinamento supporto legale e amministrativo"],
      es: ["Compraventa residencial y comercial", "Valoración de inmuebles al mejor precio", "Análisis de necesidades y visitas específicas", "Asesoría para inversores internacionales", "Red global de colaboración RE/MAX", "Herramientas avanzadas de marketing", "Consultoría alquileres cortos", "Soporte legal y administrativo"],
      fr: ["Vente résidentielle et commerciale", "Évaluation au meilleur prix du marché", "Analyse des besoins et visites ciblées", "Conseil pour investisseurs internationaux", "Réseau global RE/MAX", "Outils marketing avancés", "Conseil location courte durée", "Support juridique et administratif"],
      de: ["Wohn- und Gewerbeimmobilienverkauf", "Bewertung zum besten Marktpreis", "Bedarfsanalyse und gezielte Besichtigungen", "Beratung für internationale Investoren", "Globales RE/MAX-Netzwerk", "Fortschrittliche Marketing-Tools", "Kurzzeitvermietungsberatung", "Rechtliche und administrative Unterstützung"],
    },
    stats: [
      { icon: Users, value: "145K+", label: { en: "RE/MAX agents worldwide", it: "Agenti RE/MAX nel mondo", es: "Agentes RE/MAX en el mundo", fr: "Agents RE/MAX dans le monde", de: "RE/MAX-Makler weltweit" } },
      { icon: Globe, value: "110+", label: { en: "Countries", it: "Paesi", es: "Países", fr: "Pays", de: "Länder" } },
      { icon: Building2, value: "Roma", label: { en: "Via Mario Menghini, 103/105", it: "Via Mario Menghini, 103/105", es: "Via Mario Menghini, 103/105", fr: "Via Mario Menghini, 103/105", de: "Via Mario Menghini, 103/105" } },
      { icon: TrendingUp, value: "#1", label: { en: "Real estate franchise worldwide", it: "Franchising immobiliare al mondo", es: "Franquicia inmobiliaria mundial", fr: "Franchise immobilière mondiale", de: "Immobilien-Franchise weltweit" } },
    ],
    languages: ["Italiano", "English", "Română", "Русский"],
    address: "Via Mario Menghini, 103/105, 00179 Roma RM",
    vatNumber: "P.IVA: 12713691009",
    companyName: "Dieffecase srl",
  },
  "one-development": {
    name: "ONE Development",
    fullName: "ONE Development — Batumi, Georgia",
    logo: "/images/logo-one-development.jpg",
    logoBg: "#ffffff",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=85&fit=crop",
    website: "https://onedev.ge",
    description: {
      en: "ONE Development is a lifestyle real estate developer specialising in residential properties with strong investment potential, designed to suit diverse lifestyles in Batumi's prime urban locations. The first developer to implement a renovation project under the 'Batumi Without Dangerous Buildings' municipal program. Each development in their diverse portfolio reflects the unique lifestyle of its location, combining comfort, functionality, aesthetics, and investment appeal. Each project is strategically located in Batumi's most promising areas with functional layouts carefully designed for maximum comfort. ONE Development understands why a particular building, with its specific design and technical features, is developed in a given location for a defined target audience — to ensure maximum investment value.",
      it: "ONE Development è un developer immobiliare lifestyle specializzato in proprietà residenziali con forte potenziale di investimento, progettate per adattarsi a diversi stili di vita nelle migliori location urbane di Batumi. Primo developer a implementare un progetto di ristrutturazione nell'ambito del programma municipale 'Batumi Senza Edifici Pericolosi'. Ogni sviluppo nel loro portafoglio diversificato riflette lo stile di vita unico della sua posizione, combinando comfort, funzionalità, estetica e attrattiva per gli investimenti. Ogni progetto è strategicamente situato nelle aree più promettenti di Batumi con layout funzionali accuratamente progettati per il massimo comfort.",
      es: "ONE Development es un promotor inmobiliario lifestyle especializado en propiedades residenciales con fuerte potencial de inversión, diseñadas para adaptarse a diversos estilos de vida en las mejores ubicaciones urbanas de Batumi. Primer promotor en implementar un proyecto de renovación bajo el programa municipal 'Batumi Sin Edificios Peligrosos'. Cada desarrollo refleja el estilo de vida único de su ubicación, combinando confort, funcionalidad, estética y atractivo de inversión.",
      fr: "ONE Development est un promoteur immobilier lifestyle spécialisé dans les propriétés résidentielles à fort potentiel d'investissement, conçues pour s'adapter à divers modes de vie dans les meilleurs emplacements urbains de Batoumi. Premier promoteur à mettre en œuvre un projet de rénovation dans le cadre du programme municipal 'Batoumi Sans Bâtiments Dangereux'. Chaque développement reflète le style de vie unique de son emplacement, alliant confort, fonctionnalité, esthétique et attrait pour l'investissement.",
      de: "ONE Development ist ein Lifestyle-Immobilienentwickler, der sich auf Wohnimmobilien mit starkem Investitionspotenzial spezialisiert hat, die für verschiedene Lebensstile in Batumis besten städtischen Lagen konzipiert sind. Erster Entwickler, der ein Sanierungsprojekt im Rahmen des Kommunalprogramms 'Batumi Ohne Gefährliche Gebäude' umgesetzt hat. Jede Entwicklung spiegelt den einzigartigen Lebensstil ihres Standorts wider und vereint Komfort, Funktionalität, Ästhetik und Investitionsattraktivität.",
    },
    collaboration: {
      en: "Mauro Ferrante Consulting Studio collaborates with ONE Development to connect international investors with premium real estate opportunities in Batumi, Georgia. Through strategic advisory and market analysis, we help clients identify high-potential properties in one of the Black Sea's fastest-growing investment destinations.",
      it: "Mauro Ferrante Consulting Studio collabora con ONE Development per connettere investitori internazionali con opportunità immobiliari premium a Batumi, Georgia. Attraverso consulenza strategica e analisi di mercato, aiutiamo i clienti a identificare proprietà ad alto potenziale in una delle destinazioni di investimento in più rapida crescita del Mar Nero.",
      es: "Mauro Ferrante Consulting Studio colabora con ONE Development para conectar inversores internacionales con oportunidades inmobiliarias premium en Batumi, Georgia.",
      fr: "Mauro Ferrante Consulting Studio collabore avec ONE Development pour connecter les investisseurs internationaux avec des opportunités immobilières premium à Batoumi, Géorgie.",
      de: "Mauro Ferrante Consulting Studio arbeitet mit ONE Development zusammen, um internationale Investoren mit erstklassigen Immobilienmöglichkeiten in Batumi, Georgien, zu verbinden.",
    },
    services: {
      en: ["Lifestyle residential developments", "Investment-grade property design", "Municipal renovation programs", "Strategic location planning", "Functional layout optimisation", "Mixed-use development projects", "International investor advisory", "Award-winning architectural design"],
      it: ["Sviluppi residenziali lifestyle", "Progettazione immobiliare investment-grade", "Programmi di ristrutturazione municipale", "Pianificazione strategica della location", "Ottimizzazione layout funzionali", "Progetti di sviluppo mixed-use", "Consulenza per investitori internazionali", "Design architettonico premiato"],
      es: ["Desarrollos residenciales lifestyle", "Diseño inmobiliario de inversión", "Programas de renovación municipal", "Planificación estratégica de ubicación", "Optimización de layouts funcionales", "Proyectos de desarrollo de uso mixto", "Asesoría para inversores internacionales", "Diseño arquitectónico premiado"],
      fr: ["Développements résidentiels lifestyle", "Conception immobilière d'investissement", "Programmes de rénovation municipale", "Planification stratégique d'emplacement", "Optimisation des agencements fonctionnels", "Projets de développement mixte", "Conseil aux investisseurs internationaux", "Design architectural primé"],
      de: ["Lifestyle-Wohnentwicklungen", "Investmentgerechtes Immobiliendesign", "Kommunale Sanierungsprogramme", "Strategische Standortplanung", "Funktionale Layoutoptimierung", "Mixed-Use-Entwicklungsprojekte", "Internationale Investorenberatung", "Preisgekröntes architektonisches Design"],
    },
    stats: [
      { icon: Building2, value: "415K m²", label: { en: "Total construction volume", it: "Volume totale di costruzione", es: "Volumen total de construcción", fr: "Volume total de construction", de: "Gesamtbauvolumen" } },
      { icon: TrendingUp, value: "5", label: { en: "Unique projects in Batumi", it: "Progetti unici a Batumi", es: "Proyectos únicos en Batumi", fr: "Projets uniques à Batoumi", de: "Einzigartige Projekte in Batumi" } },
      { icon: Globe, value: "3", label: { en: "Years in development", it: "Anni di sviluppo", es: "Años en desarrollo", fr: "Années de développement", de: "Jahre in der Entwicklung" } },
      { icon: Users, value: "2", label: { en: "European Property Awards 2025-2026", it: "European Property Awards 2025-2026", es: "European Property Awards 2025-2026", fr: "European Property Awards 2025-2026", de: "European Property Awards 2025-2026" } },
    ],
    awards: [
      "ONE — Residential Renovation/Redevelopment Award Winner Georgia (European Property Awards 2025-2026)",
      "Stay & Rent — Mixed-Use Development Award Winner Georgia (European Property Awards 2025-2026)",
    ],
  },
  "kw-gchouse": {
    name: "KW GCHOUSE",
    fullName: "Keller Williams GCHOUSE",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/E0WwhZIBddrYN4fG7n2v8-e6eyDCpSfCUbdI43a6wp2gAvw288cy.webp",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&fit=crop",
    website: "https://www.kwgchouse.com",
    description: {
      en: "Keller Williams GCHOUSE is part of the world's largest real estate franchise by agent count, with over 190,000 agents across 50+ countries. As a KW agent, Mauro Ferrante brings the full power of Keller Williams' technology, training and global network to every client engagement.",
      it: "Keller Williams GCHOUSE fa parte del più grande franchising immobiliare al mondo per numero di agenti, con oltre 190.000 agenti in più di 50 paesi. Come agente KW, Mauro Ferrante porta la piena potenza della tecnologia, formazione e rete globale di Keller Williams.",
      es: "Keller Williams GCHOUSE es parte de la franquicia inmobiliaria más grande del mundo por cantidad de agentes, con más de 190.000 agentes en más de 50 países.",
    },
    collaboration: {
      en: "Mauro Ferrante operates as a licensed Keller Williams agent, providing clients access to global listing databases, proprietary KW technology tools, and an international referral network that connects buyers and sellers across borders.",
      it: "Mauro Ferrante opera come agente Keller Williams autorizzato, fornendo ai clienti accesso a database di annunci globali, strumenti tecnologici proprietari KW e una rete di referral internazionale.",
    },
    services: {
      en: ["Residential & commercial sales", "High-value real estate investments", "Property portfolio management", "International investor consulting", "Continuous agent training", "KW proprietary technology & tools"],
      it: ["Compravendita residenziale e commerciale", "Investimenti immobiliari ad alto valore", "Gestione del portafoglio immobiliare", "Consulenza per investitori internazionali", "Formazione continua per agenti", "Tecnologia e strumenti proprietari KW"],
    },
    stats: [
      { icon: Users, value: "190K+", label: { en: "Agents worldwide", it: "Agenti nel mondo" } },
      { icon: Globe, value: "50+", label: { en: "Countries", it: "Paesi" } },
      { icon: Building2, value: "1,000+", label: { en: "Market centers", it: "Market center" } },
      { icon: TrendingUp, value: "#1", label: { en: "In the world by agents", it: "Al mondo per agenti" } },
    ],
  },
  "trem-group": {
    name: "TREM Group",
    fullName: "The Real Estate Marketing Group",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/s3Ipp2rySdBzKRdZL1PrR-aD2bTY0yQupmL8m8B7QtLn3UUaEVmd.webp",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop",
    website: "https://www.tremgroup.com",
    description: {
      en: "TREM Group is the premier digital marketing and technology partner for luxury real estate professionals. With over $1.5B in sales driven and 100+ brands scaled, TREM delivers high-performance IDX websites, lead generation systems and AI-powered property platforms.",
      it: "TREM Group è il premier partner di marketing digitale e tecnologia per professionisti del real estate di lusso. Con oltre $1.5B di vendite generate e 100+ brand gestiti, TREM offre siti IDX ad alte prestazioni e sistemi di lead generation.",
      es: "TREM Group es el principal socio de marketing digital y tecnología para profesionales del real estate de lujo.",
    },
    collaboration: {
      en: "Mauro Ferrante is a certified TREM Group agent, leveraging their cutting-edge marketing technology stack to deliver premium digital experiences for real estate clients worldwide.",
      it: "Mauro Ferrante è un agente certificato TREM Group, sfruttando la loro tecnologia di marketing all'avanguardia per offrire esperienze digitali premium.",
    },
    services: {
      en: ["High-Performance IDX Websites", "Lead Generation & Digital Marketing", "Google Ads & Meta Ads Management", "Luxury Real Estate Branding", "AI-Powered Property Search", "CRM & Dashboard Analytics", "Stand-Alone Property Sites", "Content Creation & Social Media"],
      it: ["Siti Web IDX ad Alte Prestazioni", "Lead Generation & Marketing Digitale", "Gestione Google Ads & Meta Ads", "Branding Immobiliare di Lusso", "Ricerca Proprietà con AI", "CRM e Analytics", "Siti Proprietà Dedicati", "Content Creation & Social Media"],
    },
    stats: [
      { icon: TrendingUp, value: "$1.5B+", label: { en: "Sales driven", it: "Vendite generate" } },
      { icon: MonitorSmartphone, value: "$45M+", label: { en: "Spent on ads", it: "Investiti in ads" } },
      { icon: Users, value: "100+", label: { en: "Brands scaled", it: "Brand gestiti" } },
      { icon: Globe, value: "15+", label: { en: "Years experience", it: "Anni di esperienza" } },
    ],
  },
  "azequo-engineering": {
    name: "Azequo Engineering",
    fullName: "Azequo Engineering S.A.C.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/r0i7tzQ89uG8DdfcS7cS1-1YO73Xiuya3XvjgQl0SL4iLlM9RQnQ.webp",
    heroImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1400&q=85&fit=crop",
    website: "https://azequoengineering.com",
    description: {
      en: "Azequo Engineering S.A.C. is a Peruvian industrial engineering firm specialised in quality management, precision engineering, logistics and professional training for mining and industrial sectors.",
      it: "Azequo Engineering S.A.C. è un'azienda peruviana di ingegneria industriale specializzata in gestione qualità, ingegneria di precisione, logistica e formazione professionale per il settore minerario e industriale.",
      es: "Azequo Engineering S.A.C. es una empresa peruana de ingeniería industrial especializada en gestión de calidad, ingeniería de precisión, logística y formación profesional.",
    },
    collaboration: {
      en: "Mauro Ferrante Consulting Studio provided full marketing strategy, brand identity development, and digital presence creation for Azequo Engineering, supporting their growth in the competitive Peruvian industrial market.",
      it: "Mauro Ferrante Consulting Studio ha fornito strategia marketing completa, sviluppo dell'identità di brand e creazione della presenza digitale per Azequo Engineering, supportando la loro crescita nel mercato industriale peruviano.",
    },
    specialServices: {
      en: [
        { icon: ShieldCheck, title: "Quality, Safety & Environment", detail: "ISO 9001, 14001, 45001, 37001, 27001 certification support and integrated management systems." },
        { icon: Layers, title: "Precision Engineering", detail: "Topographic survey services with cutting-edge technologies for mining and industrial operations." },
        { icon: Truck, title: "Logistics & Supply Chain", detail: "Supply chain efficiency consulting and transport optimisation for industrial sectors." },
        { icon: GraduationCap, title: "Professional Training", detail: "Technical and operational skills development aligned with the highest industry standards." },
      ],
      it: [
        { icon: ShieldCheck, title: "Qualità, Sicurezza e Ambiente", detail: "Supporto certificazioni ISO 9001, 14001, 45001, 37001, 27001 e sistemi di gestione integrati." },
        { icon: Layers, title: "Ingegneria di Precisione", detail: "Servizi di rilievo topografico con tecnologie all'avanguardia per operazioni minerarie e industriali." },
        { icon: Truck, title: "Logistica e Supply Chain", detail: "Consulenza per efficienza della supply chain e ottimizzazione dei trasporti nel settore industriale." },
        { icon: GraduationCap, title: "Formazione Professionale", detail: "Sviluppo di competenze tecniche e operative allineate con i più alti standard del settore." },
      ],
    },
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 37001", "ISO 27001"],
  },
};

export default function PartnerPage({ locale, setLocale }) {
  const { slug } = useParams();
  const partner = partnersData[slug];

  if (!partner) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl font-serif mb-4">Partner not found</h1>
        <Link to="/" className="text-[#c9a84c] underline">Go back</Link>
      </div>
    </div>
  );

  const desc = partner.description[locale] || partner.description.en;
  const collab = partner.collaboration[locale] || partner.collaboration.en;
  const services = partner.services?.[locale] || partner.services?.en || [];
  const specials = partner.specialServices?.[locale] || partner.specialServices?.en || [];

  return (
    <div className="min-h-screen bg-[#080808]" data-testid={`partner-page-${slug}`}>
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <img src={partner.heroImage} alt={partner.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40 w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-6 transition-colors" data-testid="back-home-link">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="flex items-center gap-6 mb-6">
            <div className={`w-20 h-20 rounded-xl border border-white/10 flex items-center justify-center p-2`} style={{ background: partner.logoBg || "#111" }}>
              <img src={partner.logo} alt={partner.name} className="max-h-14 max-w-[64px] object-contain" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold">{partner.name}</h1>
              <p className="text-white/40 text-sm mt-1">{partner.fullName}</p>
            </div>
          </div>
          {partner.website && (
            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm transition-colors">
              <ExternalLink className="w-4 h-4" /> {partner.website}
            </a>
          )}
        </div>
      </section>

      {/* Stats */}
      {partner.stats && (
        <section className="py-12 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {partner.stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="w-5 h-5 text-[#c9a84c]/50 mx-auto mb-3" />
                  <div className="text-2xl font-serif font-bold text-white">{stat.value}</div>
                  <div className="text-white/30 text-[10px] tracking-[0.15em] uppercase mt-1">{stat.label[locale] || stat.label.en}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Description + Collaboration */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div>
            <h2 className="text-xl font-serif text-white font-bold mb-4">
              {locale === "it" ? "Chi è " : locale === "es" ? "Quién es " : "About "}{partner.name}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
          <div>
            <h2 className="text-xl font-serif text-white font-bold mb-4">
              {locale === "it" ? "La Collaborazione" : locale === "es" ? "La Colaboración" : "The Collaboration"}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{collab}</p>
          </div>
        </div>
      </section>

      {/* Services / Special Services */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-serif text-white font-bold text-center mb-12">
            {locale === "it" ? "Servizi Offerti" : locale === "es" ? "Servicios Ofrecidos" : "Services Offered"}
          </h2>

          {specials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {specials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-[#0f0f0f] border border-white/5 rounded-xl p-8 hover:border-[#c9a84c]/20 transition-all" data-testid={`partner-service-${i}`}>
                    <Icon className="w-8 h-8 text-[#c9a84c]/60 mb-4" />
                    <h3 className="text-white font-semibold text-base mb-3">{s.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#0f0f0f] border border-white/5 rounded-xl p-5">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a84c]/60 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm">{s}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications for Azequo */}
          {partner.certifications && (
            <div className="mt-12 text-center">
              <h3 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-4">Certifications</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {partner.certifications.map((c) => (
                  <span key={c} className="bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-medium px-4 py-2 rounded-full border border-[#c9a84c]/20">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {partner.awards && (
            <div className="mt-12 text-center">
              <h3 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-4">Awards</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {partner.awards.map((a) => (
                  <span key={a} className="bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-medium px-4 py-2 rounded-full border border-[#c9a84c]/20">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
