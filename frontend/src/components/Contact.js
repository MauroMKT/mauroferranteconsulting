import { useState } from "react";
import { t } from "@/lib/i18n";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { trackFormSubmit, trackWhatsApp, trackEmail } from "@/lib/tracker";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WhatsAppIconSvg = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function Contact({ locale }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formLoadTime] = useState(Date.now());
  const { ref: headerRef, visible: headerVisible } = useReveal();

  const validate = () => {
    const newErrors = {};
    const required = t(locale, "form_required");
    if (!form.name.trim()) newErrors.name = required;
    if (!form.phone.trim()) newErrors.phone = required;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = required;
    if (!form.service) newErrors.service = required;
    if (!form.message.trim()) newErrors.message = required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitStatus("loading");
    try {
      const res = await axios.post(`${API}/contact`, { ...form, _hp: document.getElementById("mfc_hp")?.value || "", _ts: formLoadTime });
      if (res.data.ok) {
        trackFormSubmit(form.service);
        setSubmitStatus("success");
        if (res.data.fallback && res.data.mailto) {
          window.location.href = res.data.mailto;
        }
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const inputClass = (field) => `w-full bg-[#111] border ${errors[field] ? "border-red-500/60" : "border-white/10"} text-white placeholder-white/25 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 focus:bg-[#161616] transition-all duration-200`;

  return (
    <section id="contact" className="relative py-28 bg-[#080808] overflow-hidden" data-testid="contact-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "nav_contact")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "contact_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "contact_subtitle")}</p>
          <div className="inline-flex items-center gap-2 mt-6 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-5 py-2">
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-[#c9a84c]/80 text-xs font-medium">{t(locale, "contact_urgency")}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16" data-testid="contact-buttons">
          <a href="https://wa.me/393491177007" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("europe_asia")} className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl px-6 py-4 transition-all duration-300 group" data-testid="contact-wa-eu">
            <WhatsAppIconSvg className="w-5 h-5 text-[#25D366]" />
            <div><div className="text-white text-sm font-medium">Europa & Asia</div><div className="text-white/30 text-[10px]">+39 349 117 7007</div></div>
          </a>
          <a href="https://wa.me/51964243686" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("usa_latam")} className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl px-6 py-4 transition-all duration-300 group" data-testid="contact-wa-latam">
            <WhatsAppIconSvg className="w-5 h-5 text-[#25D366]" />
            <div><div className="text-white text-sm font-medium">LATAM & USA</div><div className="text-white/30 text-[10px]">+51 964 243 686</div></div>
          </a>
          <a href="mailto:mauro@mauroferrante.com" onClick={() => trackEmail()} className="inline-flex items-center gap-3 bg-[#c9a84c]/10 border border-[#c9a84c]/20 hover:border-[#c9a84c]/40 rounded-xl px-6 py-4 transition-all duration-300 group" data-testid="contact-email">
            <Mail className="w-5 h-5 text-[#c9a84c]" />
            <div><div className="text-white text-sm font-medium">mauro@mauroferrante.com</div><div className="text-white/30 text-[10px]">Email</div></div>
          </a>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {submitStatus === "success" ? (
            <div className="text-center py-12 bg-[#0f0f0f] border border-[#c9a84c]/20 rounded-2xl" data-testid="form-success">
              <CheckCircle className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
              <h3 className="text-white text-xl font-serif font-bold mb-2">{locale === "it" ? "Messaggio Ricevuto" : "Message Received"}</h3>
              <p className="text-white/40 text-sm">{t(locale, "form_success")}</p>
              <button onClick={() => setSubmitStatus("idle")} className="mt-6 text-[#c9a84c] text-sm underline underline-offset-4 hover:text-[#d4b85d] transition-colors">
                {locale === "it" ? "Invia un altro messaggio" : "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 space-y-6" data-testid="contact-form">
              {/* Honeypot - hidden from humans */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <label htmlFor="mfc_hp">Leave empty</label>
                <input type="text" id="mfc_hp" name="mfc_hp" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">{t(locale, "form_name")} <span className="text-[#c9a84c]">*</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="Mauro Ferrante" data-testid="form-name" />
                  {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">{t(locale, "form_phone")} <span className="text-[#c9a84c]">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} placeholder="+39 349 000 0000" data-testid="form-phone" />
                  {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">{t(locale, "form_email")} <span className="text-[#c9a84c]">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} placeholder="your@email.com" data-testid="form-email" />
                  {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">{t(locale, "form_service")} <span className="text-[#c9a84c]">*</span></label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${inputClass("service")} appearance-none cursor-pointer`} data-testid="form-service">
                    <option value="">—</option>
                    <option value="pm">{t(locale, "form_service_pm")}</option>
                    <option value="digital">{t(locale, "form_service_digital")}</option>
                    <option value="re">{t(locale, "form_service_re")}</option>
                    <option value="other">{t(locale, "form_service_other")}</option>
                  </select>
                  {errors.service && <span className="text-red-400 text-xs mt-1 block">{errors.service}</span>}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs font-medium tracking-wider uppercase mb-2 block">{t(locale, "form_message")} <span className="text-[#c9a84c]">*</span></label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass("message")} placeholder={locale === "it" ? "Descrivi il tuo progetto..." : "Describe your project..."} data-testid="form-message" />
                {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>}
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle className="w-4 h-4" />{t(locale, "form_error")}</div>
              )}

              <button type="submit" disabled={submitStatus === "loading"} className="w-full bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm px-8 py-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2" data-testid="form-submit-btn">
                <Send className="w-4 h-4" />
                {submitStatus === "loading" ? t(locale, "form_sending") : t(locale, "form_submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
