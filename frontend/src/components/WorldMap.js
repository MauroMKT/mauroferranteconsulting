import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";

const ACTIVE_COUNTRIES = [
  { id: "italy", cx: 516, cy: 196, labelKey: "about_market_italy" },
  { id: "spain", cx: 466, cy: 207, labelKey: "about_market_spain" },
  { id: "peru", cx: 253, cy: 312, labelKey: "about_market_peru" },
  { id: "usa", cx: 196, cy: 208, labelKey: "about_market_usa" },
  { id: "thailand", cx: 700, cy: 263, labelKey: "about_market_thailand" },
  { id: "malta", cx: 520, cy: 213, labelKey: "about_market_malta" },
  { id: "belgium", cx: 487, cy: 180, labelKey: "about_market_belgium" },
  { id: "germany", cx: 505, cy: 180, labelKey: "about_market_germany" },
  { id: "france", cx: 482, cy: 192, labelKey: "about_market_france" },
  { id: "uk", cx: 470, cy: 174, labelKey: "about_market_uk" },
  { id: "switzerland", cx: 498, cy: 191, labelKey: "about_market_switzerland" },
  { id: "arabia", cx: 578, cy: 242, labelKey: "about_market_arabia" },
];

const EUROPE_HUB = { cx: 490, cy: 190 };
const CONNECTED = ["usa", "peru", "arabia", "thailand"];

// Simplified world outline path
const WORLD_PATH = "M165,120 L180,115 195,118 210,110 220,112 235,108 250,115 240,125 230,130 225,145 218,155 210,160 205,170 200,185 195,200 190,210 185,225 190,235 195,242 200,248 210,255 215,260 220,270 210,275 200,270 190,265 180,270 170,275 160,280 155,290 160,300 165,310 170,320 175,325 165,330 155,335 148,340 142,345 135,335 130,325 125,315 128,305 132,295 135,285 130,275 125,265 120,255 115,245 110,235 105,230 100,225 95,220 90,215 95,210 100,200 105,195 110,185 115,180 120,175 125,170 130,165 140,160 150,155 155,145 160,135 165,125Z M240,305 L245,310 250,320 255,335 260,345 265,350 270,355 275,360 280,365 282,370 278,375 270,378 260,380 255,385 250,388 245,385 240,375 235,365 233,355 235,345 238,335 240,325 242,315Z M260,250 L268,248 275,252 282,255 290,260 298,265 305,270 310,280 315,290 320,300 315,305 308,310 300,312 290,315 280,318 270,315 262,310 255,305 250,295 248,285 250,275 252,265 255,258Z M440,140 L460,130 480,125 500,120 520,118 540,115 550,120 555,130 545,140 540,148 530,155 525,165 520,175 515,185 510,195 505,205 500,215 498,225 502,232 510,235 520,232 530,228 540,225 545,230 540,240 530,250 520,260 510,268 500,275 490,280 480,285 470,290 460,295 450,300 440,295 430,290 425,280 430,270 440,260 445,252 448,245 442,240 435,235 430,228 432,220 438,215 445,210 450,200 455,195 460,190 465,180 468,172 465,165 458,160 452,155 448,148 445,142Z M555,130 L570,125 585,128 595,135 605,140 615,145 620,155 618,165 610,172 600,178 595,185 592,195 595,205 600,210 610,208 618,202 625,195 635,190 645,192 655,198 665,205 672,215 678,225 682,235 680,245 675,255 668,262 660,268 650,275 640,278 630,280 620,275 612,268 608,260 610,252 615,245 622,240 625,235 618,230 610,228 600,230 590,235 582,240 575,248 570,255 565,262 558,268 552,262 548,255 545,248 542,240 540,232 538,225 540,218 545,210 550,205 555,198 558,190 555,180 548,175 545,168 548,160 550,150 552,140Z M668,165 L680,160 695,162 710,170 720,178 728,188 730,200 728,210 720,222 710,230 700,240 692,248 688,258 690,268 695,275 702,280 710,285 718,290 725,295 720,310 710,325 698,340 688,348 680,352 670,355 660,350 652,342 648,335 650,325 655,315 660,305 658,295 650,288 642,282 635,278 638,268 645,260 652,250 658,242 662,235 668,225 672,215 670,205 665,198 660,192 658,185 662,178 668,172Z M780,295 L810,278 840,272 860,275 875,282 885,295 890,310 885,330 870,348 855,358 835,368 815,372 798,365 788,350 782,335 780,315Z";

export default function WorldMap({ locale }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [litCount, setLitCount] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => { i++; setLitCount(i); if (i >= ACTIVE_COUNTRIES.length) clearInterval(interval); }, 110);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section ref={sectionRef} className="relative py-28 bg-[#0a0a0a] overflow-hidden" data-testid="worldmap-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#c9a84c] text-xs font-medium tracking-[0.3em] uppercase">{t(locale, "map_label")}</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mt-4">{t(locale, "map_title")}</h2>
          <p className="text-white/40 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">{t(locale, "map_subtitle")}</p>
        </div>

        <div className="relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-4 sm:p-8 overflow-hidden">
          <svg viewBox="0 0 1000 500" className="w-full h-auto" style={{ maxHeight: "500px" }}>
            <rect x="0" y="0" width="1000" height="500" fill="#0d0d0d" />
            {/* Grid */}
            {[83, 166, 250, 333, 416].map(y => (<line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />))}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (<line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" />))}

            {/* World outline */}
            <path d={WORLD_PATH} fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />

            {/* Connection lines */}
            {ACTIVE_COUNTRIES.map((country, i) => {
              if (!CONNECTED.includes(country.id)) return null;
              const isLit = litCount > i;
              return (
                <line key={`line-${country.id}`} x1={EUROPE_HUB.cx} y1={EUROPE_HUB.cy} x2={country.cx} y2={country.cy}
                  stroke={isLit ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.03)"}
                  strokeWidth="1" strokeDasharray="4 4"
                  style={{ transition: "stroke 0.5s ease" }} />
              );
            })}

            {/* Country dots */}
            {ACTIVE_COUNTRIES.map((country, i) => {
              const isLit = litCount > i;
              const isHov = hovered === country.id;
              const label = t(locale, country.labelKey);
              const tipWidth = Math.max(label.length * 7 + 20, 70);
              const tipX = country.cx > 800 ? country.cx - tipWidth - 6 : country.cx + 10;

              return (
                <g key={country.id} onMouseEnter={() => setHovered(country.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "default" }}>
                  {/* Pulse */}
                  {isLit && (
                    <circle cx={country.cx} cy={country.cy} r="12" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Dot */}
                  <circle cx={country.cx} cy={country.cy} r={isHov ? "6" : "4.5"}
                    fill={isLit ? "#c9a84c" : "rgba(255,255,255,0.1)"}
                    stroke={isLit ? "rgba(201,168,76,0.6)" : "transparent"} strokeWidth="2"
                    style={{ transition: "all 0.4s ease", filter: isLit ? "drop-shadow(0 0 6px rgba(201,168,76,0.5))" : "none" }} />
                  {/* Tooltip */}
                  {isHov && isLit && (
                    <g>
                      <rect x={tipX} y={country.cy - 14} width={tipWidth} height="28" rx="6" fill="#1a1a1a" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                      <text x={tipX + tipWidth / 2} y={country.cy + 1} textAnchor="middle" fill="#c9a84c" fontSize="11" fontFamily="Outfit, sans-serif" fontWeight="500">{label}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Footer badge */}
          <div className="text-center mt-6">
            <span className="text-[#c9a84c]/40 text-xs tracking-[0.2em]">12+ {t(locale, "stats_countries_label")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
