import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyMauro from "@/components/WhyMauro";
import Services from "@/components/Services";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import MethodTimeline from "@/components/MethodTimeline";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BackToTop from "@/components/BackToTop";

function App() {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem("mfc-locale");
    if (saved) return saved;
    const browserLang = navigator.language?.slice(0, 2);
    const supported = ["en", "it", "es", "fr", "de"];
    return supported.includes(browserLang) ? browserLang : "it";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="min-h-screen bg-[#080808] text-white" data-testid="app-root">
      <Header locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <WhyMauro locale={locale} />
        <Services locale={locale} />
        <StatsStrip locale={locale} />
        <About locale={locale} />
        <MethodTimeline locale={locale} />
        <Reviews locale={locale} limit={6} />
        <Clients locale={locale} />
        <Insights locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <WhatsAppWidget />
      <BackToTop />
    </div>
  );
}

export default App;
