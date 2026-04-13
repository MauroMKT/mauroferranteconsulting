# Mauro Ferrante Consulting Studio - PRD

## Original Problem Statement
Full-stack web app for Mauro Ferrante Consulting (marketing, business management, real estate). Multi-language (5), contact form with SMTP, WhatsApp, interactive world map, internal pages, 20+ case studies, blog, analytics, SEO, privacy, cookie banner, Calendly booking.

## Architecture
- **Frontend**: React SPA (CRA) with Tailwind CSS, react-router-dom, react-helmet-async
- **Backend**: FastAPI (Python) with MongoDB — Modular routes (routes/contact.py, routes/analytics.py, routes/newsletter.py, routes/blog.py)
- **Email**: SMTP via Gmail (smtp.gmail.com:465 SSL)
- **Tracking**: GA4 (G-TEK1TF3459), Meta Pixel (106162408253852), Custom Analytics
- **Performance**: React.lazy code splitting, image lazy loading

## Implemented Features (Complete)
- Multi-language (EN, IT, ES, FR, DE) with flag selector
- Interactive world map: 13 countries
- Contact form: SMTP + MongoDB + fallback mailto
- WhatsApp dual numbers (EU/Asia + USA/LATAM)
- 20+ case studies with filters + detail pages
- Blog (8 articles, 5 languages) + Reactions system
- Video Testimonials carousel + "Show All Reviews" button
- ROI Calculator (Rome, Lima, Valencia, Munich) on Real Estate page
- Newsletter subscription + Social proof in exit-intent popup
- Admin Analytics Dashboard + Milestone emails + Weekly reports
- Dynamic SEO (react-helmet-async, JSON-LD, FAQ Schema, Sitemap)
- About page with Philosophy (Kaizen, Ikigai, Lean Six Sigma)
- Privacy Policy (GDPR), Cookie Banner, Calendly integration
- Meta Pixel (Facebook/Instagram), Google Analytics GA4

## Backlog (P2)
- Lighthouse Performance Audit + WebP
- LinkedIn Pixel, TikTok Pixel (IDs pending from user)
- A/B testing CTA / exit intent popup
- Lead scoring in admin dashboard
