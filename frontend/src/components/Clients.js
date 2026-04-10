import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowUpRight } from "lucide-react";

const clients = [
  {
    name: "KW GCHOUSE", fullName: "Keller Williams GCHOUSE",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/E0WwhZIBddrYN4fG7n2v8-e6eyDCpSfCUbdI43a6wp2gAvw288cy.webp",
    bg: "#1a1a1a", slug: "kw-gchouse",
    taglineIt: "Rete immobiliare mondiale", taglineEn: "Global real estate network",
    taglineEs: "Red inmobiliaria global", taglineFr: "Réseau immobilier mondial", taglineDe: "Weltweites Immobiliennetz",
  },
  {
    name: "TREM Group", fullName: "The Real Estate Marketing Group",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/s3Ipp2rySdBzKRdZL1PrR-aD2bTY0yQupmL8m8B7QtLn3UUaEVmd.webp",
    bg: "#181e2e", slug: "trem-group",
    taglineIt: "Marketing immobiliare di lusso", taglineEn: "Luxury real estate marketing",
    taglineEs: "Marketing inmobiliario de lujo", taglineFr: "Marketing immobilier de luxe", taglineDe: "Luxus-Immobilienmarketing",
  },
  {
    name: "Azequo Engineering", fullName: "Azequo Engineering S.A.C.",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/r0i7tzQ89uG8DdfcS7cS1-1YO73Xiuya3XvjgQl0SL4iLlM9RQnQ.webp",
    bg: "#111", slug: "azequo-engineering",
    taglineIt: "Ingegneria industriale in Perù", taglineEn: "Industrial engineering in Peru",
    taglineEs: "Ingeniería industrial en Perú", taglineFr: "Ingénierie industrielle au Pérou", taglineDe: "Industrieingenieurwesen in Peru",
  },
];

function getTagline(client, locale) {
  if (locale === "it") return client.taglineIt;
  if (locale === "es") return client.taglineEs;
  if (locale === "fr") return client.taglineFr;
  if (locale === "de") return client.taglineDe;
  return client.taglineEn;
}

export default function Clients({ locale }) {
  const { ref: headerRef, visible: headerVisible } = useReveal();

  return (
    <section id="clients" className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="clients-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "clients_subtitle")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "clients_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "clients_desc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Link key={client.name} to={`/partners/${client.slug}`} className="group relative bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/25 transition-all duration-500 block" data-testid={`client-card-${client.name.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#c9a84c]/5 to-transparent" />

              <div className="relative p-8 flex flex-col items-center text-center">
                <div className="w-full h-24 flex items-center justify-center mb-6 rounded-lg" style={{ background: client.bg }}>
                  <img src={client.logo} alt={client.name} className="max-h-16 max-w-[160px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => { e.currentTarget.style.opacity = "0.3"; }} />
                </div>
                <h3 className="text-white font-semibold text-base mb-1">{client.name}</h3>
                <p className="text-white/40 text-xs">{getTagline(client, locale)}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <span className="text-white/10 text-[10px] tracking-[0.3em] uppercase">Mauro Ferrante Consulting Studio</span>
        </div>
      </div>
    </section>
  );
}
