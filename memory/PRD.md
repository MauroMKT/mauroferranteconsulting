# Mauro Ferrante Consulting Studio - PRD

## Original Problem Statement
Full-stack web app for Mauro Ferrante Consulting (marketing, business management, real estate). Multi-language (5), contact form with SMTP, WhatsApp, interactive world map, internal pages, 20+ case studies, blog, analytics, SEO, privacy, cookie banner, Calendly booking.

## Architecture
- **Frontend**: React SPA (CRA) with Tailwind CSS, react-router-dom, react-helmet-async
- **Backend**: FastAPI (Python) with MongoDB — Modular routes (routes/contact.py, routes/analytics.py, routes/newsletter.py, routes/blog.py, routes/notifications.py)
- **Email**: SMTP via Gmail (smtp.gmail.com:465 SSL)
- **Tracking**: GA4 (G-TEK1TF3459), Meta Pixel (106162408253852), Custom Analytics
- **Push Notifications**: OneSignal Web SDK (react-onesignal) + REST API backend — NEEDS API KEYS
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
- Privacy Policy (GDPR) + GDPR UE Compliance Section (Reg. 2016/679), Cookie Banner, Calendly
- Meta Pixel (Facebook/Instagram), Google Analytics GA4
- Impressum / Legal Notice page (5 languages, company data, VAT, ODR link) — linked in Footer
- Push Notifications infrastructure (OneSignal SDK frontend + backend API route)
- SEO massivo: 67 città in Schema JSON-LD, 10 FAQ multilingue, keywords in 6 lingue, geo tags
- BingSiteAuth.xml per Bing Webmaster Tools
- Google Search Console + Bing Webmaster Tools configurati

## Company Legal Data (Impressum)
- Business: Mauro Ferrante Consulting Studio
- Owner: Mauro Ferrante
- Address: Via Egna, 10 - 00124 Roma, Italia
- P.IVA: IT 15359251004
- Email: mauro@mauroferranteconsulting.com
- Phone: +39 349 117 7007

## Backlog
- P1: OneSignal API Keys from user to activate push notifications
- P2: Lighthouse Performance Audit + WebP
- P2: A/B testing CTA / exit intent popup
- P2: Lead scoring in admin dashboard
- P3: Social media graphics/videos for organic marketing
- P3: LinkedIn/TikTok Pixel (IDs pending)
