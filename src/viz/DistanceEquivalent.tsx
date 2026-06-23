import { useMemo, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topo from 'world-atlas/countries-110m.json';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';

const W = 860;
const H = 380;
const TOMATO_KM = 3745;

type City = { name: string; lonlat: [number, number] };

// A spread of well-known world cities so any origin finds a ~3,745 km match.
const CITIES: City[] = [
  { name: 'New York', lonlat: [-74.0, 40.71] }, { name: 'Los Angeles', lonlat: [-118.24, 34.05] },
  { name: 'Chicago', lonlat: [-87.63, 41.88] }, { name: 'Vancouver', lonlat: [-123.12, 49.28] },
  { name: 'Mexico City', lonlat: [-99.13, 19.43] }, { name: 'Lima', lonlat: [-77.04, -12.05] },
  { name: 'Buenos Aires', lonlat: [-58.38, -34.6] }, { name: 'São Paulo', lonlat: [-46.63, -23.55] },
  { name: 'London', lonlat: [-0.13, 51.51] }, { name: 'Paris', lonlat: [2.35, 48.85] },
  { name: 'Madrid', lonlat: [-3.7, 40.42] }, { name: 'Rome', lonlat: [12.5, 41.9] },
  { name: 'Berlin', lonlat: [13.4, 52.52] }, { name: 'Stockholm', lonlat: [18.07, 59.33] },
  { name: 'Istanbul', lonlat: [28.98, 41.01] }, { name: 'Moscow', lonlat: [37.62, 55.75] },
  { name: 'Cairo', lonlat: [31.24, 30.04] }, { name: 'Lagos', lonlat: [3.4, 6.45] },
  { name: 'Nairobi', lonlat: [36.82, -1.29] }, { name: 'Johannesburg', lonlat: [28.05, -26.2] },
  { name: 'Dubai', lonlat: [55.27, 25.2] }, { name: 'Tehran', lonlat: [51.39, 35.69] },
  { name: 'Karachi', lonlat: [67.0, 24.86] }, { name: 'Delhi', lonlat: [77.21, 28.61] },
  { name: 'Mumbai', lonlat: [72.88, 19.08] }, { name: 'Beijing', lonlat: [116.41, 39.9] },
  { name: 'Shanghai', lonlat: [121.47, 31.23] }, { name: 'Hong Kong', lonlat: [114.17, 22.32] },
  { name: 'Hanoi', lonlat: [105.83, 21.03] }, { name: 'Bangkok', lonlat: [100.5, 13.75] },
  { name: 'Singapore', lonlat: [103.82, 1.35] }, { name: 'Jakarta', lonlat: [106.85, -6.21] },
  { name: 'Seoul', lonlat: [126.98, 37.57] }, { name: 'Tokyo', lonlat: [139.69, 35.69] },
  { name: 'Sydney', lonlat: [151.21, -33.87] },
];

const R = 6371;
const toRad = (x: number) => (x * Math.PI) / 180;
function haversine([lo1, la1]: [number, number], [lo2, la2]: [number, number]) {
  const dLat = toRad(la2 - la1);
  const dLon = toRad(lo2 - lo1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function DistanceEquivalent() {
  const [origin, setOrigin] = useState('New York');
  const from = CITIES.find((c) => c.name === origin)!;

  // nearest city to ~3,745 km away
  const match = useMemo(() => {
    let best: { city: City; km: number; diff: number } | null = null;
    for (const c of CITIES) {
      if (c.name === origin) continue;
      const km = haversine(from.lonlat, c.lonlat);
      const diff = Math.abs(km - TOMATO_KM);
      if (!best || diff < best.diff) best = { city: c, km, diff };
    }
    return best!;
  }, [origin]); // eslint-disable-line react-hooks/exhaustive-deps

  const { countriesPath, project } = useMemo(() => {
    const land = feature(topo as never, (topo as never as { objects: { countries: unknown } }).objects.countries as never) as never as {
      features: unknown[];
    };
    const projection = geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], { type: 'Sphere' } as never);
    const path = geoPath(projection);
    return { countriesPath: (land.features as never[]).map((f) => path(f as never) || ''), project: projection, geoPathFn: path };
  }, []);

  const pathFn = geoPath(project);
  const arc = pathFn({ type: 'LineString', coordinates: [from.lonlat, match.city.lonlat] } as never) || '';
  const a = project(from.lonlat) as [number, number];
  const b = project(match.city.lonlat) as [number, number];

  const rkm = Math.round(match.km / 10) * 10;
  const good = match.diff <= 650;
  const pct = Math.round((TOMATO_KM / match.km) * 100);
  const dest = <strong style={{ color: color.red }}>{match.city.name}</strong>;
  const readout = good ? (
    <>That tomato's journey would carry you almost exactly to {dest} — about <strong>{rkm}</strong> km. One winter tomato, one intercontinental road trip.</>
  ) : match.km > TOMATO_KM ? (
    <>That tomato's journey wouldn't quite reach {dest} (<strong>{rkm}</strong> km) — only about <strong>{pct}%</strong> of the way. Still: one tomato, 3,745 km.</>
  ) : (
    <>That tomato's journey would carry you well past {dest} (<strong>{rkm}</strong> km) and keep rolling. One winter tomato, 3,745 km.</>
  );

  return (
    <InteractiveCard
      kicker="Interactive · How far is that, really?"
      title="3,745 km — put it in terms you know"
      subhead="Pick a city you can picture. That's how far a single tomato travelled to reach a plate."
      source="Great-circle distances between major cities. The tomato's road trip is 3,745 km."
      bodyPadding={false}
    >
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderTop: `1px solid ${color.fill}`, marginTop: 18 }}>
        <span style={{ fontFamily: font.sans, fontSize: 13, color: color.gray2 }}>Starting from</span>
        <select
          className="focusable"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ fontFamily: font.sans, fontSize: 14, fontWeight: 600, color: color.ink, padding: '7px 10px', border: `1px solid ${color.rule}`, background: '#fff', cursor: 'pointer' }}
        >
          {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div style={{ marginTop: 14, background: '#EEF1F2' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'hidden' }}>
          <defs>
            <filter id="dePin" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill="#EEF1F2" />
          {countriesPath.map((d, i) => <path key={i} d={d} fill="#E5E0D6" stroke="#F3F1EC" strokeWidth={0.6} />)}
          <path d={arc} fill="none" stroke={color.red} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="1 6" />
          {/* origin */}
          <g transform={`translate(${a[0]}, ${a[1]})`}>
            <circle r={5} fill={color.ink} stroke="#fff" strokeWidth={2} filter="url(#dePin)" />
            <text x={a[0] < W * 0.7 ? 9 : -9} y={4} textAnchor={a[0] < W * 0.7 ? 'start' : 'end'} fontFamily={font.sans} fontSize={12} fontWeight={700} fill={color.ink}>{from.name}</text>
          </g>
          {/* destination */}
          <g transform={`translate(${b[0]}, ${b[1]})`}>
            <circle r={9} fill={color.red} opacity={0.16} />
            <circle r={5} fill={color.red} stroke="#fff" strokeWidth={2} filter="url(#dePin)" />
            <text x={b[0] < W * 0.7 ? 9 : -9} y={4} textAnchor={b[0] < W * 0.7 ? 'start' : 'end'} fontFamily={font.sans} fontSize={12} fontWeight={700} fill={color.red}>{match.city.name}</text>
          </g>
        </svg>
      </div>

      <div style={{ padding: '18px 24px 4px', fontFamily: font.serif, fontSize: 17, color: color.ink, lineHeight: 1.6 }}>
        From <strong>{from.name}</strong>, {readout}
      </div>
    </InteractiveCard>
  );
}
