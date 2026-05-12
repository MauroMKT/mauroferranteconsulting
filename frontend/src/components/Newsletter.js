import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const texts = {
  en: { label: "Newsletter", title: "Stay Ahead of the Curve", desc: "Get exclusive insights on strategy, international business, and investment opportunities.", placeholder: "Your email", btn: "Subscribe", success: "Welcome aboard! Check your inbox.", error: "Something went wrong, try again." },
  it: { label: "Newsletter", title: "Resta un Passo Avanti", desc: "Ricevi insight esclusivi su strategia, business internazionale e opportunita di investimento.", placeholder: "La tua email", btn: "Iscriviti", success: "Benvenuto! Controlla la tua inbox.", error: "Qualcosa e andato storto, riprova." },
  es: { label: "Newsletter", title: "Mantente a la Vanguardia", desc: "Recibe insights exclusivos sobre estrategia, negocios internacionales y oportunidades de inversion.", placeholder: "Tu email", btn: "Suscribirse", success: "Bienvenido! Revisa tu inbox.", error: "Algo salio mal, intenta de nuevo." },
  fr: { label: "Newsletter", title: "Gardez une Longueur d'Avance", desc: "Recevez des insights exclusifs sur la strategie, le business international et les opportunites.", placeholder: "Votre email", btn: "S'inscrire", success: "Bienvenue! Verifiez votre inbox.", error: "Une erreur est survenue, reessayez." },
  de: { label: "Newsletter", title: "Bleiben Sie Voraus", desc: "Erhalten Sie exklusive Einblicke in Strategie, internationales Business und Investitionsmoglichkeiten.", placeholder: "Ihre E-Mail", btn: "Abonnieren", success: "Willkommen! Prufen Sie Ihren Posteingang.", error: "Etwas ist schiefgegangen, versuchen Sie es erneut." },
};

export default function Newsletter({ locale }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = texts[locale] || texts.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter/subscribe`, { email, locale, _hp: document.getElementById("mfc_nl_hp")?.value || "" });
      if (res.data.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <section className="relative py-20 bg-[#080808] overflow-hidden" data-testid="newsletter-section">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.02] to-transparent" />
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{t.label}</span>
        <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-4">{t.title}</h2>
        <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">{t.desc}</p>

        {status === "success" ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-[#25D366] text-sm" data-testid="newsletter-success">
            <CheckCircle className="w-5 h-5" /> {t.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto" data-testid="newsletter-form">
            <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
              <input type="text" id="mfc_nl_hp" name="mfc_nl_hp" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full flex-1 bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c]/40 transition-all placeholder:text-white/20"
              placeholder={t.placeholder} data-testid="newsletter-email" />
            <button type="submit" disabled={loading}
              className="w-full sm:w-auto bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm px-6 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              data-testid="newsletter-submit">
              {loading ? "..." : <><Send className="w-3.5 h-3.5" /> {t.btn}</>}
            </button>
          </form>
        )}
        {status === "error" && <p className="text-red-400 text-xs mt-3">{t.error}</p>}
      </div>
    </section>
  );
}
