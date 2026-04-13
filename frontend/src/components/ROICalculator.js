import { useState, useMemo } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { TrendingUp, DollarSign, Home, Percent, Calculator } from "lucide-react";

const texts = {
  en: {
    label: "Investment Calculator",
    title: "Dubai Real Estate ROI Simulator",
    sub: "Estimate your potential returns based on real market data",
    investLabel: "Investment Amount (USD)",
    typeLabel: "Property Type",
    types: { studio: "Studio Apartment", one_bed: "1-Bedroom", two_bed: "2-Bedroom", villa: "Villa" },
    areaLabel: "Area",
    areas: { marina: "Dubai Marina", downtown: "Downtown Dubai", jvc: "JVC", palm: "Palm Jumeirah", creek: "Dubai Creek" },
    yearlyRental: "Estimated Yearly Rental",
    roiLabel: "Gross Rental Yield",
    fiveYear: "5-Year Projection",
    appreciation: "Capital Appreciation (5Y)",
    totalReturn: "Total Estimated Return",
    disclaimer: "Estimates based on average market data. Actual returns may vary. Consult with our team for personalized analysis.",
    cta: "Get Personalized Analysis",
  },
  it: {
    label: "Calcolatore Investimenti",
    title: "Simulatore ROI Immobiliare Dubai",
    sub: "Stima i tuoi potenziali rendimenti basati su dati di mercato reali",
    investLabel: "Importo Investimento (USD)",
    typeLabel: "Tipo di Proprieta",
    types: { studio: "Monolocale", one_bed: "Bilocale", two_bed: "Trilocale", villa: "Villa" },
    areaLabel: "Zona",
    areas: { marina: "Dubai Marina", downtown: "Downtown Dubai", jvc: "JVC", palm: "Palm Jumeirah", creek: "Dubai Creek" },
    yearlyRental: "Affitto Annuale Stimato",
    roiLabel: "Rendimento Lordo",
    fiveYear: "Proiezione 5 Anni",
    appreciation: "Rivalutazione Capitale (5A)",
    totalReturn: "Ritorno Totale Stimato",
    disclaimer: "Stime basate su dati di mercato medi. I rendimenti effettivi possono variare. Consulta il nostro team per un'analisi personalizzata.",
    cta: "Richiedi Analisi Personalizzata",
  },
  es: {
    label: "Calculadora de Inversiones",
    title: "Simulador ROI Inmobiliario Dubai",
    sub: "Estima tus retornos potenciales basados en datos reales del mercado",
    investLabel: "Monto de Inversion (USD)",
    typeLabel: "Tipo de Propiedad",
    types: { studio: "Estudio", one_bed: "1 Habitacion", two_bed: "2 Habitaciones", villa: "Villa" },
    areaLabel: "Zona",
    areas: { marina: "Dubai Marina", downtown: "Downtown Dubai", jvc: "JVC", palm: "Palm Jumeirah", creek: "Dubai Creek" },
    yearlyRental: "Alquiler Anual Estimado",
    roiLabel: "Rendimiento Bruto",
    fiveYear: "Proyeccion 5 Anos",
    appreciation: "Apreciacion de Capital (5A)",
    totalReturn: "Retorno Total Estimado",
    disclaimer: "Estimaciones basadas en datos promedio del mercado. Los retornos reales pueden variar.",
    cta: "Solicitar Analisis Personalizado",
  },
  fr: {
    label: "Calculateur d'Investissement",
    title: "Simulateur ROI Immobilier Dubai",
    sub: "Estimez vos rendements potentiels bases sur des donnees reelles du marche",
    investLabel: "Montant d'Investissement (USD)",
    typeLabel: "Type de Propriete",
    types: { studio: "Studio", one_bed: "1 Chambre", two_bed: "2 Chambres", villa: "Villa" },
    areaLabel: "Zone",
    areas: { marina: "Dubai Marina", downtown: "Downtown Dubai", jvc: "JVC", palm: "Palm Jumeirah", creek: "Dubai Creek" },
    yearlyRental: "Loyer Annuel Estime",
    roiLabel: "Rendement Brut",
    fiveYear: "Projection 5 Ans",
    appreciation: "Appreciation du Capital (5A)",
    totalReturn: "Rendement Total Estime",
    disclaimer: "Estimations basees sur des donnees moyennes du marche. Les rendements reels peuvent varier.",
    cta: "Demander une Analyse Personnalisee",
  },
  de: {
    label: "Investitionsrechner",
    title: "Dubai Immobilien ROI-Simulator",
    sub: "Schatzen Sie Ihre potenziellen Renditen basierend auf realen Marktdaten",
    investLabel: "Investitionsbetrag (USD)",
    typeLabel: "Immobilientyp",
    types: { studio: "Studio-Apartment", one_bed: "1-Zimmer", two_bed: "2-Zimmer", villa: "Villa" },
    areaLabel: "Gegend",
    areas: { marina: "Dubai Marina", downtown: "Downtown Dubai", jvc: "JVC", palm: "Palm Jumeirah", creek: "Dubai Creek" },
    yearlyRental: "Geschatzte Jahresmiete",
    roiLabel: "Brutto-Rendite",
    fiveYear: "5-Jahres-Prognose",
    appreciation: "Kapitalzuwachs (5J)",
    totalReturn: "Geschatzte Gesamtrendite",
    disclaimer: "Schatzungen basierend auf durchschnittlichen Marktdaten. Die tatsachlichen Renditen konnen variieren.",
    cta: "Personalisierte Analyse Anfordern",
  },
};

const yields = {
  studio:  { marina: 7.2, downtown: 6.8, jvc: 8.5, palm: 5.8, creek: 7.0 },
  one_bed: { marina: 6.8, downtown: 6.5, jvc: 8.0, palm: 5.5, creek: 6.7 },
  two_bed: { marina: 6.2, downtown: 6.0, jvc: 7.5, palm: 5.2, creek: 6.3 },
  villa:   { marina: 4.5, downtown: 4.2, jvc: 6.0, palm: 4.8, creek: 5.0 },
};

const appreciationRates = {
  marina: 5.5, downtown: 6.0, jvc: 7.5, palm: 4.5, creek: 8.0,
};

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function ROICalculator({ locale }) {
  const { ref, visible } = useReveal();
  const [amount, setAmount] = useState(300000);
  const [type, setType] = useState("one_bed");
  const [area, setArea] = useState("marina");
  const txt = texts[locale] || texts.en;

  const results = useMemo(() => {
    const yieldRate = yields[type]?.[area] || 6.5;
    const appRate = appreciationRates[area] || 5.5;
    const yearlyRental = amount * (yieldRate / 100);
    const fiveYearRental = yearlyRental * 5;
    const fiveYearAppreciation = amount * Math.pow(1 + appRate / 100, 5) - amount;
    const totalReturn = fiveYearRental + fiveYearAppreciation;
    const totalReturnPct = ((totalReturn / amount) * 100).toFixed(1);
    return { yieldRate, yearlyRental, fiveYearRental, fiveYearAppreciation, totalReturn, totalReturnPct };
  }, [amount, type, area]);

  return (
    <section className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="roi-calculator-section">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#c9a84c]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#c9a84c]/60 text-xs font-medium tracking-[0.3em] uppercase">{txt.label}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{txt.title}</h2>
          <p className="text-white/30 text-sm mt-3">{txt.sub}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 space-y-6" data-testid="roi-inputs">
            {/* Amount slider */}
            <div>
              <label className="text-white/50 text-xs font-medium tracking-wider uppercase mb-3 block">{txt.investLabel}</label>
              <div className="text-[#c9a84c] text-3xl font-serif font-bold mb-4">{fmt(amount)}</div>
              <input type="range" min={100000} max={2000000} step={50000} value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#c9a84c] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#c9a84c] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                data-testid="roi-amount-slider" />
              <div className="flex justify-between text-white/20 text-[10px] mt-1">
                <span>$100K</span><span>$2M</span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-white/50 text-xs font-medium tracking-wider uppercase mb-3 block">{txt.typeLabel}</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(txt.types).map(([key, label]) => (
                  <button key={key} onClick={() => setType(key)}
                    className={`px-4 py-3 rounded-xl text-sm transition-all duration-300 border ${type === key ? "bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#c9a84c]" : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/15"}`}
                    data-testid={`roi-type-${key}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="text-white/50 text-xs font-medium tracking-wider uppercase mb-3 block">{txt.areaLabel}</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(txt.areas).map(([key, label]) => (
                  <button key={key} onClick={() => setArea(key)}
                    className={`px-4 py-2 rounded-full text-xs transition-all duration-300 border ${area === key ? "bg-[#c9a84c]/10 border-[#c9a84c]/30 text-[#c9a84c]" : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/15"}`}
                    data-testid={`roi-area-${key}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4" data-testid="roi-results">
            <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-white/30 text-xs mb-2">
                    <Home className="w-3.5 h-3.5" /> {txt.yearlyRental}
                  </div>
                  <div className="text-white text-2xl font-serif font-bold">{fmt(results.yearlyRental)}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white/30 text-xs mb-2">
                    <Percent className="w-3.5 h-3.5" /> {txt.roiLabel}
                  </div>
                  <div className="text-[#c9a84c] text-2xl font-serif font-bold">{results.yieldRate}%</div>
                </div>
              </div>

              <div className="h-px bg-white/5 my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">{txt.fiveYear}</span>
                  <span className="text-white font-semibold">{fmt(results.fiveYearRental)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">{txt.appreciation}</span>
                  <span className="text-emerald-400 font-semibold">{fmt(results.fiveYearAppreciation)}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-base">{txt.totalReturn}</span>
                  <div className="text-right">
                    <div className="text-[#c9a84c] font-serif font-bold text-2xl">{fmt(results.totalReturn)}</div>
                    <div className="text-emerald-400/70 text-xs">+{results.totalReturnPct}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual ROI bar */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-4 h-4 text-[#c9a84c]/50" />
                <span className="text-white/40 text-xs">ROI Breakdown</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#c9a84c]/60 rounded-l-full transition-all duration-700" style={{ width: `${Math.min((results.fiveYearRental / results.totalReturn) * 100, 100)}%` }} />
                <div className="h-full bg-emerald-500/50 rounded-r-full transition-all duration-700" style={{ width: `${Math.min((results.fiveYearAppreciation / results.totalReturn) * 100, 100)}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-[#c9a84c]/50">Rental Income</span>
                <span className="text-emerald-400/50">Capital Appreciation</span>
              </div>
            </div>

            <p className="text-white/15 text-[10px] leading-relaxed px-1">{txt.disclaimer}</p>

            <a href="#contact"
              className="block w-full bg-[#c9a84c] hover:bg-[#d4b85d] text-[#0a0a0a] font-semibold text-sm py-4 rounded-xl transition-all duration-300 text-center"
              data-testid="roi-cta">
              {txt.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
