import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { locales, localeNames, t } from "@/lib/i18n";

function DropdownMenu({ label, items, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-white/60 hover:text-[#c9a84c] text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300" onClick={() => setOpen(!open)}>
        {label} <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-[#111] border border-white/10 rounded-lg py-1 min-w-[220px] shadow-2xl z-50">
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (anchor) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + anchor);
    }
  };

  const serviceItems = [
    { to: "/services/project-management", label: t(locale, "pm_title") },
    { to: "/services/digital-marketing", label: t(locale, "digital_title") },
    { to: "/services/real-estate", label: t(locale, "re_title") },
  ];

  const clientItems = [
    { to: "/partners/kw-gchouse", label: "KW GCHOUSE" },
    { to: "/partners/trem-group", label: "TREM Group" },
    { to: "/partners/azequo-engineering", label: "Azequo Engineering" },
  ];

  return (
    <header data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 py-2" : "bg-transparent py-4"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
          <img src="/images/logo-mf.png" alt="Mauro Ferrante" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
          <button onClick={() => navigateTo("#home")} className="text-white/60 hover:text-[#c9a84c] text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300" data-testid="nav-home">{t(locale, "nav_home")}</button>
          <DropdownMenu label={t(locale, "nav_services")} items={serviceItems} onNavigate={() => setMobileOpen(false)} />
          <button onClick={() => navigateTo("#about")} className="text-white/60 hover:text-[#c9a84c] text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300" data-testid="nav-about">{t(locale, "nav_about")}</button>
          <DropdownMenu label={t(locale, "nav_clients")} items={clientItems} onNavigate={() => setMobileOpen(false)} />
          <button onClick={() => navigateTo("#contact")} className="text-white/60 hover:text-[#c9a84c] text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300" data-testid="nav-contact">{t(locale, "nav_contact")}</button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium transition-colors" data-testid="lang-switcher">
              {locale.toUpperCase()} <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-lg py-1 min-w-[140px] shadow-2xl z-50">
                {locales.map((l) => (
                  <button key={l} onClick={() => { setLocale(l); setLangOpen(false); localStorage.setItem("mfc-locale", l); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${locale === l ? "text-[#c9a84c] bg-[#c9a84c]/10" : "text-white/60 hover:text-white hover:bg-white/5"}`} data-testid={`lang-${l}`}>
                    {localeNames[l]}
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
        <div className="lg:hidden bg-[#080808]/98 backdrop-blur-xl border-t border-white/5 mt-3" data-testid="mobile-menu">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
            <button onClick={() => navigateTo("#home")} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-2">{t(locale, "nav_home")}</button>
            <div className="py-2"><span className="text-white/40 text-xs tracking-[0.2em] uppercase">{t(locale, "nav_services")}</span></div>
            {serviceItems.map((item) => (<Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block pl-4 text-white/50 hover:text-[#c9a84c] text-sm py-1.5 transition-colors">{item.label}</Link>))}
            <button onClick={() => navigateTo("#about")} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-2">{t(locale, "nav_about")}</button>
            <div className="py-2"><span className="text-white/40 text-xs tracking-[0.2em] uppercase">{t(locale, "nav_clients")}</span></div>
            {clientItems.map((item) => (<Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block pl-4 text-white/50 hover:text-[#c9a84c] text-sm py-1.5 transition-colors">{item.label}</Link>))}
            <button onClick={() => navigateTo("#contact")} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-2">{t(locale, "nav_contact")}</button>
          </div>
        </div>
      )}
    </header>
  );
}
