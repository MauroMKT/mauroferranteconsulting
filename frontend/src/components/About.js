import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { Globe2, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const marketKeys = [
  "about_market_italy", "about_market_spain", "about_market_france", "about_market_peru",
  "about_market_usa", "about_market_canada", "about_market_russia", "about_market_china",
  "about_market_arabia", "about_market_argentina", "about_market_chile", "about_market_thailand",
  "about_market_denmark", "about_market_sweden", "about_market_norway", "about_market_uk", "about_market_eu",
  "about_market_georgia",
];

export default function About({ locale }) {
  const { ref: sectionRef, visible } = useReveal();

  return (
    <>
      {/* About Section */}
      <section id="about" className="relative py-28 bg-[#080808] overflow-hidden" data-testid="about-section">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={sectionRef} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Left: Image + markets */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#c9a84c]/10 to-transparent rounded-2xl blur-lg" />
                <div className="relative overflow-hidden rounded-xl border border-[#c9a84c]/15">
                  <img src="/images/mauro-ferrante.webp" alt="Mauro Ferrante - International Business Consultant" width="500" height="604" className="w-full h-[500px] object-cover object-top" loading="lazy" data-testid="about-photo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
                </div>
              </div>
              <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6">
                <h4 className="text-[#c9a84c]/60 text-xs tracking-[0.2em] uppercase mb-4">{t(locale, "about_page_markets_label")}</h4>
                <div className="flex flex-wrap gap-2">
                  {marketKeys.map((key) => (
                    <span key={key} className="bg-white/5 text-white/50 text-[10px] tracking-wider px-3 py-1.5 rounded-full border border-white/5">{t(locale, key)}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="space-y-8">
              <div>
                <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">About</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "about_title")}</h2>
                <p className="text-[#c9a84c]/60 text-sm mt-2 font-medium">{t(locale, "about_subtitle")}</p>
                <p className="text-white/40 text-sm mt-3 italic">{locale === "it" ? "Aiuto le aziende di Monaco di Baviera, Roma, Lima, Valencia, Miami, Bangkok e in vari paesi del mondo a scalare attraverso l'Automazione e il Fractional Management." : locale === "es" ? "Ayudo a las empresas de Múnich, Roma, Lima, Valencia, Miami, Bangkok y en varios países del mundo a escalar a través de la Automatización y el Fractional Management." : locale === "fr" ? "J'aide les entreprises de Munich, Rome, Lima, Valence, Miami, Bangkok et dans de nombreux pays du monde à se développer grâce à l'Automatisation et au Fractional Management." : locale === "de" ? "Ich helfe Unternehmen in München, Rom, Lima, Valencia, Miami, Bangkok und in vielen weiteren Ländern durch Automatisierung und Fractional Management zu skalieren." : "Helping businesses in Munich, Rome, Lima, Valencia, Miami, Bangkok and across the globe scale through Automation & Fractional Management."}</p>
              </div>

              {["about_p1", "about_p2", "about_p3"].map((key, i) => (
                <p key={key} className="text-white/50 text-sm leading-relaxed">{t(locale, key)}</p>
              ))}

              <Link to="/about" className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] hover:bg-[#c9a84c]/20 text-sm font-medium px-6 py-3 rounded-lg transition-all duration-200 mt-2" data-testid="about-bio-link">
                {locale === "it" ? "Scopri la Biografia Completa" : locale === "es" ? "Descubre la Biografía Completa" : "Discover Full Biography"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
