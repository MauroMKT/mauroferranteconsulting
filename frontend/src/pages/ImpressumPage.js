import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { ArrowLeft, Mail, Phone, MapPin, Building2, FileText, Globe } from "lucide-react";

export default function ImpressumPage({ locale, setLocale }) {
  return (
    <div className="min-h-screen bg-[#080808]" data-testid="impressum-page">
      <SEO
        title={t(locale, "impressum_title")}
        description={t(locale, "impressum_seo_desc")}
        path="/impressum"
      />
      <Header locale={locale} setLocale={setLocale} />

      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors"
            data-testid="impressum-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold" data-testid="impressum-heading">
            {t(locale, "impressum_title")}
          </h1>
          <p className="text-white/30 text-sm mt-3">
            {t(locale, "impressum_subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-10 text-white/50 text-sm leading-relaxed">

            {/* Company Info */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
              <h2 className="text-white font-serif text-xl font-bold mb-6 flex items-center gap-3" data-testid="impressum-company-section">
                <Building2 className="w-5 h-5 text-[#c9a84c]" />
                {t(locale, "impressum_company_info")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase">{t(locale, "impressum_business_name")}</span>
                  <p className="text-white/70 mt-1 font-medium">Mauro Ferrante Consulting Studio</p>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase">{t(locale, "impressum_owner")}</span>
                  <p className="text-white/70 mt-1 font-medium">Mauro Ferrante</p>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />{t(locale, "impressum_address")}
                  </span>
                  <p className="text-white/70 mt-1">Via Egna, 10<br />00124 Roma<br />{t(locale, "impressum_country_italy")}</p>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase">{t(locale, "impressum_vat")}</span>
                  <p className="text-white/70 mt-1 font-mono">IT 15359251004</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
              <h2 className="text-white font-serif text-xl font-bold mb-6 flex items-center gap-3" data-testid="impressum-contact-section">
                <Mail className="w-5 h-5 text-[#c9a84c]" />
                {t(locale, "impressum_contact")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <Mail className="w-3 h-3" />Email
                  </span>
                  <a href="mailto:mauro@mauroferranteconsulting.com" className="text-[#c9a84c] hover:underline mt-1 block">
                    mauro@mauroferranteconsulting.com
                  </a>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />{t(locale, "impressum_phone")}
                  </span>
                  <a href="tel:+393491177007" className="text-white/70 hover:text-[#c9a84c] mt-1 block transition-colors">
                    +39 349 117 7007
                  </a>
                </div>
                <div>
                  <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <Globe className="w-3 h-3" />Website
                  </span>
                  <p className="text-white/70 mt-1">www.mauroferranteconsulting.com</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4" data-testid="impressum-disclaimer-section">
                {t(locale, "impressum_disclaimer_title")}
              </h2>
              <p>{t(locale, "impressum_disclaimer_text")}</p>
            </div>

            {/* Liability for Content */}
            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">
                {t(locale, "impressum_liability_content_title")}
              </h2>
              <p>{t(locale, "impressum_liability_content_text")}</p>
            </div>

            {/* Liability for Links */}
            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">
                {t(locale, "impressum_liability_links_title")}
              </h2>
              <p>{t(locale, "impressum_liability_links_text")}</p>
            </div>

            {/* Copyright */}
            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">
                {t(locale, "impressum_copyright_title")}
              </h2>
              <p>{t(locale, "impressum_copyright_text")}</p>
            </div>

            {/* ODR - EU Online Dispute Resolution */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
              <h2 className="text-white font-serif text-xl font-bold mb-4 flex items-center gap-3" data-testid="impressum-odr-section">
                <FileText className="w-5 h-5 text-[#c9a84c]" />
                {t(locale, "impressum_odr_title")}
              </h2>
              <p className="mb-3">{t(locale, "impressum_odr_text")}</p>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline inline-flex items-center gap-2"
                data-testid="impressum-odr-link"
              >
                https://ec.europa.eu/consumers/odr
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Privacy reference */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/30 text-xs">
                {t(locale, "impressum_privacy_ref")}{" "}
                <Link to="/privacy" className="text-[#c9a84c] hover:underline" data-testid="impressum-privacy-link">
                  {t(locale, "footer_privacy")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
