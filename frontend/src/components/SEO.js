import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.mauroferranteconsulting.com";

const defaultMeta = {
  title: "Mauro Ferrante Consulting Studio | Project Management, Digital Marketing & Real Estate",
  description: "International strategic consulting in Project Management, Digital Marketing & Real Estate. 20+ years, 14 countries, 70+ cities: Roma, München, London, Paris, Miami, Dubai, Batumi, Valencia, Lima, New York. Book a free consultation.",
  image: `${BASE_URL}/images/logo-mf.png`,
};

export default function SEO({ title, description, path = "/", type = "website", noindex = false }) {
  const pageTitle = title ? `${title} | Mauro Ferrante Consulting` : defaultMeta.title;
  const pageDesc = description || defaultMeta.description;
  const url = `${BASE_URL}${path}`;

  const breadcrumbs = path !== "/" ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      ...(path.split("/").filter(Boolean).length > 1
        ? [{ "@type": "ListItem", "position": 2, "name": path.split("/")[1].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), "item": `${BASE_URL}/${path.split("/")[1]}` }]
        : []),
      { "@type": "ListItem", "position": path.split("/").filter(Boolean).length + 1, "name": title || path.split("/").pop().replace(/-/g, " "), "item": url },
    ],
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={defaultMeta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {breadcrumbs && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      )}
    </Helmet>
  );
}
