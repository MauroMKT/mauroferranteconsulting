import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { blogPosts } from "@/lib/blogPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

const categoryLabels = {
  "project-management": { key: "pm_title", color: "#c9a84c" },
  "digital-marketing": { key: "digital_title", color: "#3b82f6" },
  "real-estate": { key: "re_title", color: "#25D366" },
};

export default function BlogPage({ locale, setLocale }) {
  const blogTitle = locale === "it" ? "Insights & Articoli" : locale === "es" ? "Insights y Articulos" : locale === "fr" ? "Insights et Articles" : locale === "de" ? "Insights & Artikel" : "Insights & Articles";
  const blogDesc = locale === "it" ? "Strategie, analisi e lezioni apprese da oltre 20 anni di consulenza internazionale in 13 paesi." : "Strategies, analysis and lessons learned from over 20 years of international consulting across 13 countries.";

  return (
    <div className="min-h-screen bg-[#080808]" data-testid="blog-page">
      <SEO title={blogTitle} description={blogDesc} path="/blog" />
      <Header locale={locale} setLocale={setLocale} />

      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="block text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase mb-3">Blog</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold">{blogTitle}</h1>
          <p className="text-white/40 text-base mt-4 max-w-3xl">{blogDesc}</p>
        </div>
      </section>

      <section className="py-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          {blogPosts.length > 0 && (() => {
            const fp = blogPosts[0];
            const cat = categoryLabels[fp.category];
            return (
              <Link to={`/blog/${fp.slug}`} className="group block mb-12 bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/20 transition-all duration-500" data-testid="featured-post">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img src={fp.image} alt={fp.titles[locale] || fp.titles.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>{t(locale, cat.key)}</span>
                      <span className="flex items-center gap-1 text-white/30 text-xs"><Calendar className="w-3 h-3" />{fp.date}</span>
                      <span className="flex items-center gap-1 text-white/30 text-xs"><Clock className="w-3 h-3" />{fp.readTime} min</span>
                    </div>
                    <h2 className="text-white text-2xl font-serif font-bold mb-3 group-hover:text-[#c9a84c] transition-colors">{fp.titles[locale] || fp.titles.en}</h2>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{fp.excerpts[locale] || fp.excerpts.en}</p>
                    <span className="text-[#c9a84c]/60 text-xs font-medium flex items-center gap-1 group-hover:text-[#c9a84c] transition-colors">
                      {t(locale, "learn_more")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* Other posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => {
              const cat = categoryLabels[post.category];
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/20 transition-all duration-500" data-testid={`blog-card-${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.titles[locale] || post.titles.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>{t(locale, cat.key)}</span>
                      <span className="flex items-center gap-1 text-white/25 text-[10px]"><Clock className="w-2.5 h-2.5" />{post.readTime} min</span>
                    </div>
                    <h3 className="text-white font-semibold text-base font-serif mb-2 group-hover:text-[#c9a84c] transition-colors line-clamp-2">{post.titles[locale] || post.titles.en}</h3>
                    <p className="text-white/35 text-xs leading-relaxed line-clamp-3 mb-3">{post.excerpts[locale] || post.excerpts.en}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-white/5 text-white/25 text-[9px] tracking-wider px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
