const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function trackEvent(event, page, metadata) {
  try {
    navigator.sendBeacon(
      `${API}/track`,
      new Blob([JSON.stringify({ event, page: page || window.location.pathname, metadata })], { type: "application/json" })
    );
  } catch {
    fetch(`${API}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, page: page || window.location.pathname, metadata }),
      keepalive: true,
    }).catch(() => {});
  }
}

export function trackPageView(page) {
  trackEvent("page_view", page || window.location.pathname);
}

export function trackCTA(label) {
  trackEvent("cta_click", window.location.pathname, { label });
}

export function trackWhatsApp(region) {
  trackEvent("whatsapp_click", window.location.pathname, { region });
}

export function trackEmail() {
  trackEvent("email_click", window.location.pathname);
}

export function trackFormSubmit(service) {
  trackEvent("form_submit", window.location.pathname, { service });
}

export function trackCaseStudy(id) {
  trackEvent("case_study_view", `/case-studies/${id}`, { id });
}
