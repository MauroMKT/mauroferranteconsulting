import { useState } from "react";
import { t } from "@/lib/i18n";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    id: "project-management", titleKey: "pm_title", subtitleKey: "pm_subtitle", descKey: "pm_desc",
    details: ["pm_detail_1", "pm_detail_2", "pm_detail_3", "pm_detail_4", "pm_detail_5", "pm_detail_6"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&fit=crop",
    imageAlt: "Professional project management team",
  },
  {
    id: "digital-marketing", titleKey: "digital_title", subtitleKey: "digital_subtitle", descKey: "digital_desc",
    details: ["digital_detail_1", "digital_detail_2", "digital_detail_3", "digital_detail_4", "digital_detail_5", "digital_detail_6", "digital_detail_7"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&fit=crop",
    imageAlt: "Business analytics dashboard",
  },
  {
    id: "real-estate", titleKey: "re_title", subtitleKey: "re_subtitle", descKey: "re_desc",
    details: ["re_detail_1", "re_detail_2", "re_detail_3", "re_detail_4", "re_detail_5", "re_detail_6"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&fit=crop",
    imageAlt: "Luxury real estate",
  },
];

export default function Services({ locale }) {
  const [activeService, setActiveService] = useState(0);
  const { ref: headerRef, visible: headerVisible } = useReveal();

  return (
    <section id="services" className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="services-section">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "nav_services")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "services_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "services_subtitle")}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-12 bg-[#111] rounded-xl p-1.5" data-testid="service-tabs">
          {services.map((service, idx) => (
            <button key={service.id} onClick={() => setActiveService(idx)}
              onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setActiveService(idx); }}
              className={`flex-1 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeService === idx ? "bg-[#c9a84c] text-[#0a0a0a] shadow-[0_4px_20px_rgba(201,168,76,0.3)]" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
              data-testid={`service-tab-${idx}`}
            >
              {t(locale, service.titleKey)}
            </button>
          ))}
        </div>

        {/* Active Service Card */}
        {services.map((service, idx) => (
          <div key={service.id} className={`${activeService === idx ? "block" : "hidden"}`}>
            <div className="grid lg:grid-cols-2 gap-0 bg-[#111] rounded-2xl overflow-hidden border border-white/5" data-testid={`service-card-${idx}`}>
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <img src={service.image} alt={service.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/80 hidden lg:block" />
                <div className="absolute bottom-4 left-4 bg-[#c9a84c]/90 text-[#0a0a0a] text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
                  {t(locale, service.subtitleKey)}
                </div>
              </div>

              {/* Details */}
              <div className="relative p-8 lg:p-12">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#c9a84c] via-[#c9a84c]/50 to-transparent" />
                <h3 className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.2em] uppercase mb-2">{t(locale, service.subtitleKey)}</h3>
                <h2 className="text-2xl font-serif text-white font-bold mb-4">{t(locale, service.titleKey)}</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{t(locale, service.descKey)}</p>

                <ul className="space-y-3 mb-8">
                  {service.details.map((detailKey) => (
                    <li key={detailKey} className="flex items-start gap-3 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a84c]/60 mt-0.5 flex-shrink-0" />
                      {t(locale, detailKey)}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#c9a84c] hover:bg-[#c9a84c]/20 text-sm font-medium px-6 py-3 rounded-lg transition-all duration-200">
                    {t(locale, "learn_more")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
