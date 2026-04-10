import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { Mail } from "lucide-react";
import { useState } from "react";
import CalendlyModal from "@/components/CalendlyModal";

const WhatsAppIconSvg = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const serviceLinks = [
  { labelKey: "pm_title" },
  { labelKey: "digital_title" },
  { labelKey: "re_title" },
];

const navLinks = [
  { labelKey: "nav_home", href: "#home" },
  { labelKey: "nav_services", href: "#services" },
  { labelKey: "nav_about", href: "#about" },
  { labelKey: "nav_clients", href: "#clients" },
  { labelKey: "nav_contact", href: "#contact" },
];

export default function Footer({ locale }) {
  const year = new Date().getFullYear();
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const navigateTo = (anchor) => {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060606] overflow-hidden" data-testid="footer">
      {/* CTA Section */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "footer_cta_label")}</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-4">{t(locale, "footer_cta_title")}</h2>
          <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">{t(locale, "footer_cta_sub")}</p>
          <button onClick={() => setCalendlyOpen(true)} className="mt-8 bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300" data-testid="footer-cta-btn">
            {t(locale, "hero_cta")}
          </button>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/logo-mf.png" alt="Mauro Ferrante" className="h-16 w-auto" />
              </div>
              <p className="text-white/30 text-xs leading-relaxed">{t(locale, "footer_brand_desc")}</p>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.linkedin.com/in/mauro-ferrante/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c]/20 transition-colors" data-testid="footer-linkedin">
                  <LinkedInIcon className="w-3.5 h-3.5 text-white/40 hover:text-[#c9a84c]" />
                </a>
                <a href="https://www.facebook.com/mfmarketingconsultant" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c]/20 transition-colors" data-testid="footer-facebook">
                  <FacebookIcon className="w-3.5 h-3.5 text-white/40 hover:text-[#c9a84c]" />
                </a>
                <a href="https://www.instagram.com/mauro_business_consulting/?hl=es" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c]/20 transition-colors" data-testid="footer-instagram">
                  <InstagramIcon className="w-3.5 h-3.5 text-white/40 hover:text-[#c9a84c]" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">{t(locale, "footer_nav_title")}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}><button onClick={() => navigateTo(link.href)} className="text-white/30 hover:text-[#c9a84c] text-sm transition-colors">{t(locale, link.labelKey)}</button></li>
                ))}
                <li><Link to="/case-studies" className="text-white/30 hover:text-[#c9a84c] text-sm transition-colors">{t(locale, "case_studies_menu")}</Link></li>
                <li><Link to="/blog" className="text-white/30 hover:text-[#c9a84c] text-sm transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">{t(locale, "footer_services_title")}</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.labelKey}><button onClick={() => navigateTo("#services")} className="text-white/30 hover:text-[#c9a84c] text-sm transition-colors">{t(locale, link.labelKey)}</button></li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">{t(locale, "footer_contact_title")}</h4>
              <ul className="space-y-3">
                <li><a href="mailto:mauro@mauroferrante.com" className="text-white/30 hover:text-[#c9a84c] text-sm transition-colors flex items-center gap-2" data-testid="footer-email"><Mail className="w-3.5 h-3.5" />mauro@mauroferrante.com</a></li>
                <li><a href="https://wa.me/393491177007" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#25D366] text-sm transition-colors flex items-center gap-2" data-testid="footer-wa-eu"><WhatsAppIconSvg className="w-3.5 h-3.5" />EUROPA & ASIA</a></li>
                <li><a href="https://wa.me/51964243686" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#25D366] text-sm transition-colors flex items-center gap-2" data-testid="footer-wa-latam"><WhatsAppIconSvg className="w-3.5 h-3.5" />USA & LATAM</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/15 text-[10px] tracking-wider">&copy; {year} Mauro Ferrante Consulting Studio. {t(locale, "footer_rights")}</span>
          <Link to="/privacy" className="text-white/15 hover:text-white/30 text-[10px] tracking-wider transition-colors" data-testid="footer-privacy-link">{t(locale, "footer_privacy")}</Link>
        </div>
      </div>

      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </footer>
  );
}
