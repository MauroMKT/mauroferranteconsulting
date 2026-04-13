# Mauro Ferrante Consulting Studio - PRD

## Original Problem Statement
Full-stack web app for Mauro Ferrante Consulting (marketing, business management, real estate). Multi-language (5), contact form with SMTP, WhatsApp, interactive world map, internal pages, 20+ case studies, blog, analytics, SEO, privacy, cookie banner, Calendly booking.

## Architecture
- **Frontend**: React SPA (CRA) with Tailwind CSS, react-router-dom, react-helmet-async
- **Backend**: FastAPI (Python) with MongoDB — Modular routes (routes/contact.py, routes/analytics.py, routes/newsletter.py, routes/blog.py)
- **Email**: SMTP via Gmail (smtp.gmail.com:465 SSL)
- **Styling**: Tailwind CSS + custom CSS animations
- **i18n**: Custom JSON-based translations (EN, IT, ES, FR, DE)
- **Map**: react-simple-maps + topojson-client
- **Booking**: Calendly embed (iframe modal)
- **Performance**: React.lazy code splitting, image lazy loading
- **Tracking**: GA4 (G-TEK1TF3459), Meta Pixel (106162408253852), Custom Analytics

## Implemented Features

### Core
- Multi-language (EN, IT, ES, FR, DE) with flag emoji selector
- Interactive world map: 13 countries
- Contact form: SMTP email delivery + MongoDB storage + fallback mailto
- WhatsApp: Europe/Asia (+39 349 117 7007) & USA/LATAM (+51 964 243 686)
- 20 verified reviews

### Pages & Routing
- Homepage (Hero, WhyMauro, Services, Stats, About, Method, WorldMap, CaseStudies, VideoTestimonials, Clients, ROICalculator, Insights, Contact, Newsletter)
- Biography (/about) — Philosophy (Kaizen, Ikigai, Lean Six Sigma) + Case Studies
- 3 Service detail pages + 3 Partner pages
- Case Studies (/case-studies) with filters + 20 detail pages
- Blog (/blog) with 8 articles (5 languages) + Blog Reactions
- Privacy Policy (/privacy)
- Admin Analytics Dashboard (/admin/analytics)

### Tracking & SEO (Feb 2026)
- Meta Pixel (Facebook/Instagram) ID: 106162408253852
- Google Analytics GA4 ID: G-TEK1TF3459
- FAQ Schema markup (5 questions for rich snippets)
- Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD, Sitemap, robots.txt

### Video Testimonials (NEW - Feb 2026)
- Cinematic carousel with 6 featured reviews
- Auto-play 8s, prev/next buttons, dot + thumbnail navigation
- Platform badges (Google, LinkedIn, Trustpilot, TREM Group)

### ROI Calculator (NEW - Feb 2026)
- Dubai Real Estate investment simulator
- Interactive: amount slider ($100K-$2M), property type (4), area (5)
- Computes: yearly rental, gross yield, 5-year projection, capital appreciation, total return
- Visual ROI breakdown bar + CTA to contact form
- Full 5-language support

### Blog Reactions (NEW - Feb 2026)
- 4 reaction types: Like, Love, Insightful, Fire
- Backend API: GET/POST /api/blog/{slug}/reactions
- localStorage for client-side user tracking
- Integrated at bottom of each blog post

### About Page — Philosophy & Discipline
- Kaizen (Continuous Improvement), Ikigai (Purpose), Lean Six Sigma (Operational Excellence)
- Martial arts discipline foundation — 5-language translations
- Case Studies preview + World Map + all Reviews

### Newsletter
- Subscription component (5-language) + API endpoint
- Welcome email via SMTP
- Social proof count in exit-intent popup

### Analytics & Admin
- Custom tracking + Admin dashboard + Milestone emails + Weekly reports
- Newsletter subscriber management

### Backend Architecture (Refactored Feb 2026)
- server.py: ~90 lines (orchestrator)
- routes/contact.py: Contact form + SMTP
- routes/analytics.py: Tracking, admin stats, reports
- routes/newsletter.py: Subscribe, count, admin list
- routes/blog.py: Blog reactions

### Contact Info
- Email: mauro@mauroferrante.com (site) / mauro@mauroferranteconsulting.com (Privacy only)

## Backlog

### P2 (Nice to have)
- Lighthouse Performance Audit + WebP image optimization
- A/B testing on CTA and exit intent popup
- LinkedIn Pixel, TikTok Pixel (user will provide IDs later)
- Lead scoring in admin dashboard
