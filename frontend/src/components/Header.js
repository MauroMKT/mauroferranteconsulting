import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { locales, t } from "@/lib/i18n";

const localeFlags = { en: "\u{1F1FA}\u{1F1F8}", it: "\u{1F1EE}\u{1F1F9}", es: "\u{1F1EA}\u{1F1F8}", fr: "\u{1F1EB}\u{1F1F7}", de: "\u{1F1E9}\u{1F1EA}" };

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
);

function DropdownMenu({ label, items, onNavigate, active, onLabelClick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className={`flex items-center gap-1 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${active ? "text-[#c9a84c]" : "text-white/60 hover:text-[#c9a84c]"}`}
        onClick={() => { if (onLabelClick) { onLabelClick(); setOpen(false); } else { setOpen(!open); } }} data-testid={`dropdown-${label.toLowerCase().replace(/\s/g, '-')}`}>
        {label} <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-[#111] border border-white/10 rounded-lg py-1 min-w-[220px] shadow-2xl z-50"
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {items.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => { setOpen(false); onNavigate?.(); }}
              className="block px-4 py-2.5 text-sm text-white/60 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-colors" data-testid={`submenu-${item.to.replace(/\//g, '-').slice(1)}`}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ locale, setLocale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = ["home", "services", "about", "clients", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const navBtnClass = (section) =>
    `text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
      isHome && activeSection === section ? "text-[#c9a84c]" : "text-white/60 hover:text-[#c9a84c]"
    }`;

  const navigateTo = (anchor) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  const serviceItems = [
    { to: "/services/project-management", label: t(locale, "pm_title") },
    { to: "/services/digital-marketing", label: t(locale, "digital_title") },
    { to: "/services/real-estate", label: t(locale, "re_title") },
  ];

  const aboutItems = [
    { to: "/about", label: locale === "it" ? "Biografia Completa" : locale === "es" ? "Biografia Completa" : locale === "fr" ? "Biographie Complete" : locale === "de" ? "Vollstandige Biografie" : "Full Biography" },
  ];

  const clientItems = [
    { to: "/partners/remax-easy", label: "RE/MAX Easy" },
    { to: "/partners/one-development", label: "ONE Development" },
    { to: "/partners/evolution-media", label: "Evolution Media" },
    { to: "/partners/trem-group", label: "TREM Group" },
    { to: "/partners/azequo-engineering", label: "Azequo Engineering" },
    { to: "/case-studies", label: t(locale, "case_studies_menu") },
  ];

  const toggleMobileDropdown = (key) => {
    setMobileDropdown(mobileDropdown === key ? null : key);
  };

  return (
    <header data-testid="main-header"
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        mobileOpen ? "z-[200] bg-[#080808] py-2" : `z-50 ${scrolled || !isHome ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 py-2" : "bg-transparent py-4"}`
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
          <img src="/images/logo-mf-header.webp" alt="Mauro Ferrante Consulting Studio" width="56" height="56" className="h-14 w-14" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
          <button onClick={() => navigateTo("#home")} className={navBtnClass("home")} data-testid="nav-home">{t(locale, "nav_home")}</button>
          <DropdownMenu label={t(locale, "nav_services")} items={serviceItems} onNavigate={() => setMobileOpen(false)} onLabelClick={() => navigateTo("#services")} active={isHome && activeSection === "services"} />
          <DropdownMenu label={t(locale, "nav_about")} items={aboutItems} onNavigate={() => setMobileOpen(false)} onLabelClick={() => navigateTo("#about")} active={isHome && activeSection === "about"} />
          <DropdownMenu label={t(locale, "nav_clients")} items={clientItems} onNavigate={() => setMobileOpen(false)} onLabelClick={() => navigateTo("#clients")} active={isHome && activeSection === "clients"} />
          <button onClick={() => navigateTo("#contact")} className={navBtnClass("contact")} data-testid="nav-contact">{t(locale, "nav_contact")}</button>
        </nav>

        <div className="flex items-center gap-4">
          {/* Social icons - desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="https://www.linkedin.com/in/mauro-ferrante/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a84c] transition-colors p-2" data-testid="header-linkedin" aria-label="LinkedIn">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/mfmarketingconsultant" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a84c] transition-colors p-2" data-testid="header-facebook" aria-label="Facebook">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/mauro_business_consulting/?hl=es" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c9a84c] transition-colors p-2" data-testid="header-instagram" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors" data-testid="lang-switcher">
              <span className="text-base leading-none">{localeFlags[locale]}</span> <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-lg py-1 min-w-[60px] shadow-2xl z-50">
                {locales.map((l) => (
                  <button key={l} onClick={() => { setLocale(l); setLangOpen(false); localStorage.setItem("mfc-locale", l); }} className={`w-full text-center px-3 py-2 text-base transition-colors ${locale === l ? "bg-[#c9a84c]/10" : "hover:bg-white/5"}`} data-testid={`lang-${l}`}>
                    {localeFlags[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white/70 hover:text-white" data-testid="mobile-menu-toggle">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#080808] z-[200] overflow-y-auto" data-testid="mobile-menu">
          <div className="px-6 py-8 space-y-1">
            <button onClick={() => navigateTo("#home")} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-3 border-b border-white/5">{t(locale, "nav_home")}</button>

            <div className="border-b border-white/5">
              <button onClick={() => toggleMobileDropdown("services")} className="flex items-center justify-between w-full text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-3">
                {t(locale, "nav_services")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === "services" ? "rotate-180 text-[#c9a84c]" : ""}`} />
              </button>
              {mobileDropdown === "services" && (
                <div className="pl-5 pb-3 space-y-0.5 border-l-2 border-[#c9a84c]/20 ml-2">
                  {serviceItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block text-white/50 hover:text-[#c9a84c] text-sm py-2.5 transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-white/5">
              <button onClick={() => toggleMobileDropdown("about")} className="flex items-center justify-between w-full text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-3">
                {t(locale, "nav_about")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === "about" ? "rotate-180 text-[#c9a84c]" : ""}`} />
              </button>
              {mobileDropdown === "about" && (
                <div className="pl-5 pb-3 space-y-0.5 border-l-2 border-[#c9a84c]/20 ml-2">
                  <button onClick={() => navigateTo("#about")} className="block text-white/50 hover:text-[#c9a84c] text-sm py-2.5 transition-colors w-full text-left">
                    {locale === "it" ? "Sezione About" : locale === "es" ? "Seccion About" : locale === "fr" ? "Section A Propos" : locale === "de" ? "Uber Uns Bereich" : "About Section"}
                  </button>
                  {aboutItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block text-white/50 hover:text-[#c9a84c] text-sm py-2.5 transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-white/5">
              <button onClick={() => toggleMobileDropdown("clients")} className="flex items-center justify-between w-full text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-3">
                {t(locale, "nav_clients")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === "clients" ? "rotate-180 text-[#c9a84c]" : ""}`} />
              </button>
              {mobileDropdown === "clients" && (
                <div className="pl-5 pb-3 space-y-0.5 border-l-2 border-[#c9a84c]/20 ml-2">
                  {clientItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block text-white/50 hover:text-[#c9a84c] text-sm py-2.5 transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => navigateTo("#contact")} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-3 border-b border-white/5">{t(locale, "nav_contact")}</button>

            {/* Mobile social links */}
            <div className="flex items-center gap-5 pt-6">
              <a href="https://www.linkedin.com/in/mauro-ferrante/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#c9a84c] transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/mfmarketingconsultant" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#c9a84c] transition-colors"><FacebookIcon className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/mauro_business_consulting/?hl=es" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#c9a84c] transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
