import { useParams, Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import { blogPosts } from "@/lib/blogPosts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import BlogReactions from "@/components/BlogReactions";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";

const categoryLabels = {
  "project-management": { key: "pm_title", color: "#c9a84c" },
  "digital-marketing": { key: "digital_title", color: "#3b82f6" },
  "real-estate": { key: "re_title", color: "#25D366" },
};

export default function BlogPostPage({ locale, setLocale }) {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/40 mb-4">Article not found</p>
        <Link to="/blog" className="text-[#c9a84c] underline">Back to Blog</Link>
      </div>
    </div>
  );

  const title = post.titles[locale] || post.titles.en;
  const content = post.content[locale] || post.content.en;
  const excerpt = post.excerpts[locale] || post.excerpts.en;
  const cat = categoryLabels[post.category];
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const backLabel = locale === "it" ? "Torna al Blog" : locale === "es" ? "Volver al Blog" : locale === "fr" ? "Retour au Blog" : locale === "de" ? "Zuruck zum Blog" : "Back to Blog";

  return (
    <div className="min-h-screen bg-[#080808]" data-testid={`blog-post-${post.slug}`}>
      <SEO title={title} description={excerpt} path={`/blog/${post.slug}`} type="article" />
      <Header locale={locale} setLocale={setLocale} />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="aspect-[21/9] max-h-[400px] overflow-hidden">
          <img src={post.image} alt={title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-3xl mx-auto px-6 pb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-6 transition-colors" data-testid="back-blog">
              <ArrowLeft className="w-4 h-4" /> {backLabel}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${cat.color}15`, color: cat.color }}>{t(locale, cat.key)}</span>
              <span className="flex items-center gap-1 text-white/40 text-xs"><Calendar className="w-3 h-3" />{post.date}</span>
              <span className="flex items-center gap-1 text-white/40 text-xs"><Clock className="w-3 h-3" />{post.readTime} min</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">{title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="blog-content text-white/60 text-base leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} data-testid="blog-content" />
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 bg-white/5 text-white/30 text-xs tracking-wider px-3 py-1.5 rounded-full border border-white/5">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-white/5">
            <BlogReactions slug={slug} locale={locale} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-serif text-white font-bold mb-8 text-center">
              {locale === "it" ? "Articoli Correlati" : "Related Articles"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a84c]/20 transition-all" data-testid={`related-blog-${r.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={r.image} alt={r.titles[locale] || r.titles.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-sm font-serif group-hover:text-[#c9a84c] transition-colors line-clamp-2">{r.titles[locale] || r.titles.en}</h3>
                    <span className="text-[#c9a84c]/50 text-xs flex items-center gap-1 mt-3 group-hover:text-[#c9a84c] transition-colors">
                      {t(locale, "learn_more")} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
