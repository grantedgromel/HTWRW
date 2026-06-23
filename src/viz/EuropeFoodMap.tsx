import { useEffect, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
// Natural Earth 1:110m country borders, bundled (≈100 KB) — the real basemap.
import topo from 'world-atlas/countries-110m.json';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';

const W = 860;
const H = 540;

// The refrigerated-truck corridor from Almería up to Stockholm, [lon, lat].
const ROUTE: { name: string; lonlat: [number, number]; show?: 'major' | 'minor' }[] = [
  { name: 'Almería', lonlat: [-2.46, 36.84], show: 'major' },
  { name: 'Valencia', lonlat: [-0.38, 39.47] },
  { name: 'Barcelona', lonlat: [2.17, 41.39], show: 'minor' },
  { name: 'Montpellier', lonlat: [3.88, 43.61] },
  { name: 'Lyon', lonlat: [4.84, 45.76], show: 'minor' },
  { name: 'Strasbourg', lonlat: [7.75, 48.57] },
  { name: 'Frankfurt', lonlat: [8.68, 50.11], show: 'minor' },
  { name: 'Hamburg', lonlat: [10.0, 53.55], show: 'minor' },
  { name: 'Copenhagen', lonlat: [12.57, 55.68], show: 'minor' },
  { name: 'Malmö', lonlat: [13.0, 55.6] },
  { name: 'Stockholm', lonlat: [18.07, 59.33], show: 'major' },
];

const COUNTRY_LABELS: { name: string; lonlat: [number, number] }[] = [
  { name: 'SPAIN', lonlat: [-3.7, 40.2] },
  { name: 'FRANCE', lonlat: [2.2, 47.0] },
  { name: 'GERMANY', lonlat: [10.0, 51.2] },
  { name: 'SWEDEN', lonlat: [15.0, 60.5] },
];

const TOTAL_KM = 3745;
const TOTAL_L = 1120; // diesel for a 13-tonne load
const ML_PER_KG = 90; // transport leg, ml diesel per kg tomato

export default function EuropeFoodMap() {
  const [p, setP] = useState(1); // journey progress 0..1
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number>();

  const { countriesPath, graticulePath, projected, labelPos } = useMemo(() => {
    const land = feature(topo as never, (topo as never as { objects: { countries: unknown } }).objects.countries as never) as never as {
      features: unknown[];
    };
    const fit = {
      type: 'Polygon' as const,
      coordinates: [[[-10, 34], [28, 34], [28, 64], [-10, 64], [-10, 34]]],
    };
    const projection = geoMercator().fitExtent([[12, 12], [W - 12, H - 12]], fit as never);
    const path = geoPath(projection);
    return {
      countriesPath: (land.features as never[]).map((f) => path(f as never) || ''),
      graticulePath: path(geoGraticule10()) || '',
      projected: ROUTE.map((r) => projection(r.lonlat) as [number, number]),
      labelPos: COUNTRY_LABELS.map((l) => projection(l.lonlat) as [number, number]),
    };
  }, []);

  // cumulative pixel lengths along the projected polyline
  const { cum, total } = useMemo(() => {
    const c = [0];
    for (let i = 1; i < projected.length; i++) {
      const [x0, y0] = projected[i - 1];
      const [x1, y1] = projected[i];
      c.push(c[i - 1] + Math.hypot(x1 - x0, y1 - y0));
    }
    return { cum: c, total: c[c.length - 1] };
  }, [projected]);

  const pointAt = (frac: number): [number, number] => {
    const target = frac * total;
    for (let i = 1; i < cum.length; i++) {
      if (target <= cum[i]) {
        const t = (target - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
        const [x0, y0] = projected[i - 1];
        const [x1, y1] = projected[i];
        return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
      }
    }
    return projected[projected.length - 1];
  };

  const marker = pointAt(p);
  const fullPath = 'M' + projected.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L');
  const traveledPath = (() => {
    const target = p * total;
    const pts: string[] = [];
    for (let i = 0; i < projected.length; i++) {
      if (cum[i] <= target) pts.push(`${projected[i][0].toFixed(1)},${projected[i][1].toFixed(1)}`);
      else break;
    }
    pts.push(`${marker[0].toFixed(1)},${marker[1].toFixed(1)}`);
    return 'M' + pts.join('L');
  })();

  // play animation
  useEffect(() => {
    if (!playing) return;
    let start: number | null = null;
    const from = p >= 1 ? 0 : p;
    const dur = 5200 * (1 - from);
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / dur);
      const val = from + (1 - from) * t;
      setP(val);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const km = Math.round(TOTAL_KM * p);
  const litres = Math.round(TOTAL_L * p);
  const ml = Math.round(ML_PER_KG * p);

  return (
    <InteractiveCard
      kicker="Interactive · Drive the journey"
      title="A Spanish tomato's 3,745 km journey to a Swedish plate"
      subhead="A single heated-greenhouse tomato, trucked refrigerated from Almería to Stockholm"
      source="Sources: Smil, How the World Really Works (2022); Almería greenhouse food-miles studies. 1,120 L diesel for a 13-tonne load."
      bodyPadding={false}
    >
      <div style={{ position: 'relative', borderTop: `1px solid ${color.fill}`, marginTop: 18, background: '#F3F1EC' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'hidden' }}>
          <defs>
            <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#000" floodOpacity="0.18" />
            </filter>
          </defs>
          {/* sea */}
          <rect x={0} y={0} width={W} height={H} fill="#EEF1F2" />
          {/* graticule */}
          <path d={graticulePath} fill="none" stroke="#DCE0E1" strokeWidth={0.6} />
          {/* land */}
          {countriesPath.map((d, i) => (
            <path key={i} d={d} fill="#E5E0D6" stroke="#F3F1EC" strokeWidth={0.7} />
          ))}
          {/* country labels */}
          {labelPos.map(([x, y], i) => (
            <text key={i} x={x} y={y} textAnchor="middle" fontFamily={font.sans} fontSize={11} fontWeight={600} letterSpacing="0.18em" fill="#B3AEA2">
              {COUNTRY_LABELS[i].name}
            </text>
          ))}
          {/* remaining route (dashed grey) */}
          <path d={fullPath} fill="none" stroke="#B7B0A5" strokeWidth={2} strokeDasharray="2 4" strokeLinecap="round" strokeLinejoin="round" />
          {/* travelled route (red) */}
          <path d={traveledPath} fill="none" stroke={color.red} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" filter="url(#routeShadow)" />
          {/* waypoint dots + labels */}
          {projected.map(([x, y], i) => {
            const r = ROUTE[i];
            if (!r.show) return <circle key={i} cx={x} cy={y} r={2.4} fill="#fff" stroke="#B7B0A5" strokeWidth={1} />;
            const major = r.show === 'major';
            const right = x < W * 0.7;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={major ? 5 : 3.4} fill={major ? color.ink : '#fff'} stroke={major ? '#fff' : color.ink} strokeWidth={major ? 2 : 1.4} />
                <text x={right ? x + 9 : x - 9} y={y + 3.5} textAnchor={right ? 'start' : 'end'} fontFamily={font.sans} fontSize={major ? 12.5 : 11} fontWeight={major ? 700 : 500} fill={color.ink}>
                  {r.name}
                </text>
              </g>
            );
          })}
          {/* moving truck marker */}
          <g transform={`translate(${marker[0]}, ${marker[1]})`}>
            <circle r={9} fill={color.red} opacity={0.18} />
            <circle r={5.5} fill={color.red} stroke="#fff" strokeWidth={2} filter="url(#routeShadow)" />
          </g>
        </svg>

        {/* live km tag, top-left of map */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: color.ink, color: '#fff', padding: '8px 12px' }}>
          <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, lineHeight: 1 }}>{km.toLocaleString('en-US')} <span style={{ fontSize: 12 }}>km</span></div>
          <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginTop: 2 }}>driven so far</div>
        </div>
      </div>

      {/* controls + readouts */}
      <div style={{ padding: '16px 24px 6px', display: 'flex', alignItems: 'center', gap: 14, borderTop: `1px solid ${color.fill}` }}>
        <button
          className="focusable"
          onClick={() => setPlaying((v) => !v)}
          style={{ flexShrink: 0, border: 'none', background: color.red, color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 15, lineHeight: 1 }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <input className="econ" type="range" min={0} max={1} step={0.001} value={p} onChange={(e) => { setPlaying(false); setP(Number(e.target.value)); }} aria-label="Journey progress" style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, margin: '12px 24px 0', background: color.rule, border: `1px solid ${color.rule}` }} className="grid-3">
        {[
          { v: litres.toLocaleString('en-US'), u: 'litres of diesel for the load' },
          { v: ml, u: 'ml diesel per kg of tomato', accent: true },
          { v: '~1:25', u: 'energy in vs. calories out' },
        ].map((m, i) => (
          <div key={i} style={{ background: color.white, padding: '14px 16px' }}>
            <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: m.accent ? color.red : color.ink, lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 10, color: color.gray2, marginTop: 6, lineHeight: 1.4 }}>{m.u}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 24px 4px', fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>
        And transport is the <em>smaller</em> half of the story: the heated greenhouse the tomato grew in costs far more than the road trip.
        Grown under glass and trucked across a continent, one winter tomato can embed <strong style={{ fontFamily: font.sans, color: color.ink }}>five to six tablespoons of diesel</strong>.
      </div>
    </InteractiveCard>
  );
}
