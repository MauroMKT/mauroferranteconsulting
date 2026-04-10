import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyMauro from "@/components/WhyMauro";
import Services from "@/components/Services";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import MethodTimeline from "@/components/MethodTimeline";
import WorldMap from "@/components/WorldMap";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BackToTop from "@/components/BackToTop";
import CaseStudiesPreview from "@/components/CaseStudiesPreview";
import CookieBanner from "@/components/CookieBanner";
import SEO from "@/components/SEO";
import { trackPageView } from "@/lib/tracker";

const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const BiographyPage = lazy(() => import("@/pages/BiographyPage"));
const PartnerPage = lazy(() => import("@/pages/PartnerPage"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("@/pages/CaseStudyDetailPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageTracker() {
  const { pathname } = useLocation();
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
    </div>
  );
}

function HomePage({ locale, setLocale }) {
  return (
    <div className="min-h-screen bg-[#080808] text-white" data-testid="app-root">
      <SEO />
      <Header locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <WhyMauro locale={locale} />
        <Services locale={locale} />
        <StatsStrip locale={locale} />
        <About locale={locale} />
        <MethodTimeline locale={locale} />
        <WorldMap locale={locale} />
        <CaseStudiesPreview locale={locale} />
        <Reviews locale={locale} limit={6} />
        <Clients locale={locale} />
        <Insights locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

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
    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage locale={locale} setLocale={setLocale} />} />
          <Route path="/about" element={<BiographyPage locale={locale} setLocale={setLocale} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage locale={locale} setLocale={setLocale} />} />
          <Route path="/partners/:slug" element={<PartnerPage locale={locale} setLocale={setLocale} />} />
          <Route path="/case-studies" element={<CaseStudiesPage locale={locale} setLocale={setLocale} />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetailPage locale={locale} setLocale={setLocale} />} />
          <Route path="/privacy" element={<PrivacyPage locale={locale} setLocale={setLocale} />} />
          <Route path="/blog" element={<BlogPage locale={locale} setLocale={setLocale} />} />
          <Route path="/blog/:slug" element={<BlogPostPage locale={locale} setLocale={setLocale} />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
      <WhatsAppWidget />
      <BackToTop />
      <CookieBanner locale={locale} />
    </BrowserRouter>
  );
}

export default App;
