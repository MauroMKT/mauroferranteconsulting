import { useState, useEffect, useCallback } from "react";
import { Lock, Eye, MousePointerClick, MessageSquare, TrendingUp, Mail, BarChart3, Users, ArrowUpRight, RefreshCw } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(`${API}/admin/login`, { password });
      if (res.data.ok) onLogin(res.data.token);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm" data-testid="admin-login-form">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#c9a84c]" />
          </div>
          <h1 className="text-white font-serif text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-white/30 text-sm mt-2">Mauro Ferrante Consulting Studio</p>
        </div>
        <div className="space-y-4">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-all"
            placeholder="Password" autoFocus data-testid="admin-password" />
          {error && <p className="text-red-400 text-xs">Password non valida</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm py-3.5 rounded-lg transition-all disabled:opacity-50"
            data-testid="admin-login-btn">
            {loading ? "..." : "Accedi"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = "#c9a84c" }) {
  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/30 text-xs tracking-wider uppercase">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="text-white text-2xl font-bold font-serif">{value}</div>
      {sub && <div className="text-white/25 text-xs mt-1">{sub}</div>}
    </div>
  );
}

function MiniBar({ data, maxVal }) {
  const h = maxVal > 0 ? Math.max((data / maxVal) * 100, 4) : 4;
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full bg-[#111] rounded-sm overflow-hidden" style={{ height: "80px" }}>
        <div className="w-full bg-[#c9a84c]/40 rounded-sm transition-all duration-500" style={{ height: `${h}%`, marginTop: `${100 - h}%` }} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem("mfc-admin-token") || "");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (t) => {
    setToken(t);
    sessionStorage.setItem("mfc-admin-token", t);
  };

  const fetchStats = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/stats?token=${token}`);
      setStats(res.data);
    } catch (err) {
      if (err.response?.status === 401) { setToken(""); sessionStorage.removeItem("mfc-admin-token"); }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (!token) return <LoginScreen onLogin={handleLogin} />;
  if (!stats) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-white/30 text-sm">Caricamento...</div>
    </div>
  );

  const o = stats.overview;
  const maxDaily = Math.max(...stats.daily.map((d) => d.views), 1);

  return (
    <div className="min-h-screen bg-[#080808] text-white" data-testid="admin-dashboard">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#080808]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-serif font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#c9a84c]" /> Analytics Dashboard
            </h1>
            <p className="text-white/25 text-xs mt-0.5">Mauro Ferrante Consulting Studio</p>
          </div>
          <button onClick={fetchStats} disabled={loading}
            className="flex items-center gap-2 text-white/40 hover:text-[#c9a84c] text-xs transition-colors disabled:opacity-30"
            data-testid="refresh-btn">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Aggiorna
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-testid="overview-cards">
          <StatCard icon={Eye} label="Visite Oggi" value={o.today.views} sub={`${o.week.views} questa settimana`} />
          <StatCard icon={MessageSquare} label="Conversioni Oggi" value={o.today.conversions} sub={`${o.week.conversions} questa settimana`} color="#25D366" />
          <StatCard icon={TrendingUp} label="Tasso Conv. Settimana" value={`${o.week.conversion_rate}%`} sub={`${o.month.conversion_rate}% ultimo mese`} color="#3b82f6" />
          <StatCard icon={Users} label="Visite Mese" value={o.month.views} sub={`${o.month.conversions} conversioni`} color="#8b5cf6" />
        </div>

        {/* Actions + Chart Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Actions breakdown */}
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6" data-testid="actions-card">
            <h3 className="text-white/60 text-xs tracking-wider uppercase mb-5 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-[#c9a84c]" /> Azioni Ultimo Mese
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">WhatsApp Click</span>
                <span className="text-white font-bold text-lg">{stats.actions.whatsapp_clicks}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Email Click</span>
                <span className="text-white font-bold text-lg">{stats.actions.email_clicks}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">CTA Click</span>
                <span className="text-white font-bold text-lg">{stats.actions.cta_clicks}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Form Inviati</span>
                <span className="text-[#25D366] font-bold text-lg">{o.month.conversions}</span>
              </div>
            </div>
          </div>

          {/* Daily chart */}
          <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-xl p-6" data-testid="daily-chart">
            <h3 className="text-white/60 text-xs tracking-wider uppercase mb-5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#c9a84c]" /> Visite Ultimi 14 Giorni
            </h3>
            <div className="flex items-end gap-1">
              {stats.daily.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <MiniBar data={d.views} maxVal={maxDaily} />
                  <span className="text-white/15 text-[8px]">{d.date}</span>
                  {d.conversions > 0 && <span className="text-[#25D366] text-[8px] font-bold">{d.conversions}</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#c9a84c]/40 rounded-sm" /> Visite</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#25D366] rounded-sm" /> Conversioni</span>
            </div>
          </div>
        </div>

        {/* Top Pages + Events */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6" data-testid="top-pages">
            <h3 className="text-white/60 text-xs tracking-wider uppercase mb-5">Pagine Piu Visitate (30g)</h3>
            <div className="space-y-3">
              {stats.top_pages.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white/15 text-xs w-5 text-right">{i + 1}.</span>
                    <span className="text-white/60 text-sm truncate max-w-[200px]">{p.page}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{p.count}</span>
                </div>
              ))}
              {stats.top_pages.length === 0 && <p className="text-white/20 text-sm">Nessun dato ancora</p>}
            </div>
          </div>

          {/* Event Breakdown */}
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6" data-testid="event-breakdown">
            <h3 className="text-white/60 text-xs tracking-wider uppercase mb-5">Breakdown Eventi (30g)</h3>
            <div className="space-y-3">
              {stats.events.map((e, i) => {
                const colors = { page_view: "#c9a84c", form_submit: "#25D366", whatsapp_click: "#25D366", cta_click: "#3b82f6", email_click: "#f59e0b", case_study_view: "#8b5cf6" };
                const labels = { page_view: "Visite Pagina", form_submit: "Form Inviati", whatsapp_click: "WhatsApp Click", cta_click: "CTA Click", email_click: "Email Click", case_study_view: "Case Study Visti" };
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[e.event] || "#666" }} />
                      <span className="text-white/60 text-sm">{labels[e.event] || e.event}</span>
                    </div>
                    <span className="text-white font-semibold text-sm">{e.count}</span>
                  </div>
                );
              })}
              {stats.events.length === 0 && <p className="text-white/20 text-sm">Nessun dato ancora</p>}
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6" data-testid="recent-contacts">
          <h3 className="text-white/60 text-xs tracking-wider uppercase mb-5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#c9a84c]" /> Ultimi Contatti
          </h3>
          {stats.recent_contacts.length === 0 ? (
            <p className="text-white/20 text-sm">Nessun contatto ancora</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-white/30 text-xs py-3 px-2 font-medium">Nome</th>
                    <th className="text-left text-white/30 text-xs py-3 px-2 font-medium">Email</th>
                    <th className="text-left text-white/30 text-xs py-3 px-2 font-medium">Telefono</th>
                    <th className="text-left text-white/30 text-xs py-3 px-2 font-medium">Servizio</th>
                    <th className="text-left text-white/30 text-xs py-3 px-2 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_contacts.map((c, i) => (
                    <tr key={i} className="border-b border-white/3 hover:bg-white/[0.02]">
                      <td className="py-3 px-2 text-white/70">{c.name}</td>
                      <td className="py-3 px-2"><a href={`mailto:${c.email}`} className="text-[#c9a84c] hover:underline">{c.email}</a></td>
                      <td className="py-3 px-2 text-white/50">{c.phone}</td>
                      <td className="py-3 px-2"><span className="bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] px-2 py-0.5 rounded-full">{c.service}</span></td>
                      <td className="py-3 px-2 text-white/30 text-xs">{c.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
