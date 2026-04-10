import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowLeft, Globe, Building2, Users, TrendingUp, MonitorSmartphone, ExternalLink, CheckCircle2, ShieldCheck, Layers, Truck, GraduationCap } from "lucide-react";

const partnersData = {
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
            <div className="w-20 h-20 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center p-2">
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
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
