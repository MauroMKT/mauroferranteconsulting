import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { locales, localeNames, t } from "@/lib/i18n";

export default function Header({ locale, setLocale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (anchor) => {
    setMobileOpen(false);
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: t(locale, "nav_home"), href: "#home" },
    { label: t(locale, "nav_services"), href: "#services" },
    { label: t(locale, "nav_about"), href: "#about" },
    { label: t(locale, "nav_clients"), href: "#clients" },
    { label: t(locale, "nav_contact"), href: "#contact" },
  ];

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => navigateTo("#home")} className="flex items-center gap-2 group" data-testid="header-logo">
          <span className="text-[#c9a84c] font-serif text-xl font-bold tracking-tight">MF</span>
          <span className="hidden sm:block text-white/60 text-xs font-light tracking-[0.2em] uppercase group-hover:text-white/80 transition-colors">Consulting Studio</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => navigateTo(item.href)} className="text-white/60 hover:text-[#c9a84c] text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300" data-testid={`nav-${item.href.replace('#', '')}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium transition-colors" data-testid="lang-switcher">
              {locale.toUpperCase()} <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 rounded-lg py-1 min-w-[140px] shadow-2xl">
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
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => navigateTo(item.href)} className="block w-full text-left text-white/70 hover:text-[#c9a84c] text-sm font-medium tracking-wider uppercase py-2 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
