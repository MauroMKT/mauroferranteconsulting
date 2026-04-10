import { useState, useEffect, useRef, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line, Graticule } from "react-simple-maps";
import { t } from "@/lib/i18n";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HIGHLIGHTED_COUNTRIES = [
  "Italy", "Spain", "Peru", "United States of America", "Thailand",
  "Malta", "Belgium", "Germany", "France", "United Kingdom",
  "Switzerland", "Saudi Arabia", "Argentina", "Chile",
  "Canada", "Denmark", "Sweden", "Norway",
];

const MARKERS = [
  { name: "Italia", coordinates: [12.49, 41.9], labelKey: "about_market_italy" },
  { name: "Spagna", coordinates: [-3.7, 40.4], labelKey: "about_market_spain" },
  { name: "Peru", coordinates: [-77.04, -12.04], labelKey: "about_market_peru" },
  { name: "USA", coordinates: [-95.7, 37.1], labelKey: "about_market_usa" },
  { name: "Canada", coordinates: [-106.35, 56.13], labelKey: "about_market_canada" },
  { name: "Thailandia", coordinates: [100.5, 13.75], labelKey: "about_market_thailand" },
  { name: "Malta", coordinates: [14.51, 35.9], labelKey: "about_market_malta" },
  { name: "Belgio", coordinates: [4.35, 50.85], labelKey: "about_market_belgium" },
  { name: "Germania", coordinates: [10.45, 51.16], labelKey: "about_market_germany" },
  { name: "Francia", coordinates: [2.35, 46.86], labelKey: "about_market_france" },
  { name: "UK", coordinates: [-1.17, 52.36], labelKey: "about_market_uk" },
  { name: "Svizzera", coordinates: [8.23, 46.82], labelKey: "about_market_switzerland" },
  { name: "Arabia Saudita", coordinates: [45.08, 23.88], labelKey: "about_market_arabia" },
];

const EUROPE_CENTER = [10, 48];
const INTERCONTINENTAL = ["Peru", "USA", "Canada", "Thailandia", "Arabia Saudita"];

export default function WorldMap({ locale }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [litCount, setLitCount] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLitCount(i);
      if (i >= MARKERS.length) clearInterval(interval);
    }, 120);
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

        <div className="relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-2 sm:p-6 overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 130, center: [15, 25] }}
            style={{ width: "100%", height: "auto" }}
            width={900}
            height={440}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = HIGHLIGHTED_COUNTRIES.includes(geo.properties.name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.04)"}
                      stroke={isHighlighted ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)"}
                      strokeWidth={isHighlighted ? 0.8 : 0.3}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: isHighlighted ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)",
                          stroke: isHighlighted ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.12)",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Connection lines from Europe to intercontinental markers */}
            {MARKERS.map((marker, i) => {
              if (!INTERCONTINENTAL.includes(marker.name)) return null;
              const isLit = litCount > i;
              return (
                <Line
                  key={`line-${marker.name}`}
                  from={EUROPE_CENTER}
                  to={marker.coordinates}
                  stroke={isLit ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  style={{ pointerEvents: "none" }}
                  coordinates={[EUROPE_CENTER, marker.coordinates]}
                />
              );
            })}

            {/* Markers */}
            {MARKERS.map((marker, i) => {
              const isLit = litCount > i;
              const isHov = hovered === marker.name;
              return (
                <Marker
                  key={marker.name}
                  coordinates={marker.coordinates}
                  onMouseEnter={() => setHovered(marker.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring */}
                  {isLit && (
                    <circle r={8} fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth={1}>
                      <animate attributeName="r" from="4" to="14" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Dot */}
                  <circle
                    r={isHov ? 5 : 3.5}
                    fill={isLit ? "#c9a84c" : "rgba(255,255,255,0.15)"}
                    stroke={isLit ? "rgba(201,168,76,0.6)" : "transparent"}
                    strokeWidth={1.5}
                    style={{
                      transition: "all 0.4s ease",
                      filter: isLit ? "drop-shadow(0 0 6px rgba(201,168,76,0.5))" : "none",
                      cursor: "default",
                    }}
                  />
                  {/* Tooltip */}
                  {isHov && isLit && (
                    <g>
                      <rect x={-40} y={-28} width={80} height={22} rx={6} fill="#1a1a1a" stroke="rgba(201,168,76,0.4)" strokeWidth={1} />
                      <text x={0} y={-14} textAnchor="middle" fill="#c9a84c" fontSize={10} fontFamily="Outfit, sans-serif" fontWeight={500}>
                        {t(locale, marker.labelKey)}
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Footer legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#c9a84c]" style={{ boxShadow: "0 0 6px rgba(201,168,76,0.5)" }} />
              <span className="text-white/30 text-[10px] tracking-wider">{locale === "it" ? "Paesi attivi" : "Active countries"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t border-dashed border-[#c9a84c]/40" />
              <span className="text-white/30 text-[10px] tracking-wider">{locale === "it" ? "Rotte internazionali" : "International routes"}</span>
            </div>
            <span className="text-[#c9a84c]/40 text-xs font-serif font-bold">13 {t(locale, "stats_countries_label")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
