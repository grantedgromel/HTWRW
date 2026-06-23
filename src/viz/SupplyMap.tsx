import { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topo from 'world-atlas/countries-110m.json';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';

const W = 860;
const H = 480;

interface Good {
  id: string;
  label: string;
  highlight: string[];
  share: number;
  shareLabel: string;
  pin: [number, number];
  pinLabel: string;
  note: string;
}

const GOODS: Good[] = [
  { id: 'gloves', label: 'Rubber gloves', highlight: ['Malaysia'], share: 70, shareLabel: 'from one country', pin: [101.7, 3.0], pinLabel: 'A single factory', note: "~70% of the world's rubber gloves came from a handful of Malaysian plants — and one factory dominated, until COVID shut it in 2020." },
  { id: 'chips', label: 'Advanced chips', highlight: ['Taiwan'], share: 54, shareLabel: 'from Taiwan', pin: [120.96, 23.7], pinLabel: 'TSMC', note: "Taiwan's TSMC makes ~54% of the world's chips — and more than 90% of the most advanced ones. A single island is a civilisational chokepoint." },
  { id: 'rare', label: 'Rare earths', highlight: ['China'], share: 60, shareLabel: 'mined in China', pin: [109, 34], pinLabel: 'Refining hub', note: "China mines ~60% of the world's rare earths — and refines far more. The bottleneck is processing, not geology." },
  { id: 'steel', label: 'Steel', highlight: ['China'], share: 56, shareLabel: 'made in China', pin: [113, 33], pinLabel: 'World steel hub', note: 'China produces ~56% of the world’s steel — more than the entire rest of the world combined.' },
];

export default function SupplyMap() {
  const [sel, setSel] = useState(0);
  const good = GOODS[sel];

  const { paths, names, pinXY } = useMemo(() => {
    const land = feature(topo as never, (topo as never as { objects: { countries: unknown } }).objects.countries as never) as never as {
      features: { properties: { name: string } }[];
    };
    const fit = { type: 'Polygon' as const, coordinates: [[[55, -12], [150, -12], [150, 58], [55, 58], [55, -12]]] };
    const projection = geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], fit as never);
    const path = geoPath(projection);
    return {
      paths: land.features.map((f) => path(f as never) || ''),
      names: land.features.map((f) => f.properties.name),
      pinXY: GOODS.map((g) => projection(g.pin) as [number, number]),
    };
  }, []);

  const pin = pinXY[sel];
  const pinRight = pin[0] < W * 0.66;

  return (
    <InteractiveCard
      kicker="Interactive · Switch the product"
      title="The world's critical goods come from startlingly few places"
      subhead="Share of global supply held by the single dominant country — efficiency that is also fragility"
      source="Sources: Smil, How the World Really Works (2022); trade-body estimates. Map focuses on Asia, where production concentrates."
      bodyPadding={false}
    >
      {/* product chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '18px 24px 4px' }}>
        {GOODS.map((g, i) => {
          const on = i === sel;
          return (
            <button
              key={g.id}
              className="focusable"
              onClick={() => setSel(i)}
              style={{ border: `1px solid ${on ? color.red : color.rule}`, background: on ? color.red : color.bg, color: on ? '#fff' : color.gray1, padding: '8px 16px', fontFamily: font.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <div style={{ position: 'relative', marginTop: 14, borderTop: `1px solid ${color.fill}`, background: '#EEF1F2' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'hidden' }}>
          <defs>
            <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill="#EEF1F2" />
          {paths.map((d, i) => {
            const hot = good.highlight.includes(names[i]);
            return <path key={i} d={d} fill={hot ? color.red : '#E5E0D6'} stroke="#F3F1EC" strokeWidth={0.7} style={{ transition: 'fill .35s' }} />;
          })}
          {/* pin */}
          <g transform={`translate(${pin[0]}, ${pin[1]})`}>
            <circle r={16} fill={color.red} opacity={0.16} />
            <circle r={6} fill={color.ink} stroke="#fff" strokeWidth={2} filter="url(#pinShadow)" />
          </g>
          {/* callout */}
          <g transform={`translate(${pinRight ? pin[0] + 14 : pin[0] - 14}, ${pin[1]})`}>
            <line x1={0} y1={0} x2={pinRight ? 8 : -8} y2={0} stroke={color.ink} strokeWidth={1} />
            <g transform={`translate(${pinRight ? 10 : -174}, -26)`}>
              <rect width={164} height={52} fill={color.ink} rx={2} />
              <text x={12} y={22} fontFamily={font.display} fontSize={22} fontWeight={700} fill="#fff">{good.share}%</text>
              <text x={12} y={40} fontFamily={font.sans} fontSize={11} fill="#bbb">{good.shareLabel} · {good.pinLabel}</text>
            </g>
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 10, fontStyle: 'italic', color: color.gray3, fontFamily: font.serif }}>
          ← the rest of the world depends on this corner of the map
        </div>
      </div>

      {/* note */}
      <div style={{ padding: '16px 24px 4px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ fontFamily: font.display, fontSize: 46, fontWeight: 700, color: color.red, lineHeight: 0.9, flexShrink: 0 }}>{good.share}%</div>
        <div style={{ fontFamily: font.serif, fontSize: 14, color: color.gray1, lineHeight: 1.65 }}>{good.note}</div>
      </div>
    </InteractiveCard>
  );
}
