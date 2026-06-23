import { useMemo, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topo from 'world-atlas/countries-110m.json';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';

const W = 860;
const H = 420;
const WORLD_AVG = 75; // GJ primary energy per person per year

// Per-capita primary energy, GJ/person/year (approx., names keyed to Natural Earth 110m).
const ENERGY: Record<string, number> = {
  Qatar: 760, Iceland: 700, Canada: 370, 'United States of America': 280, 'Saudi Arabia': 300,
  Norway: 230, Australia: 230, 'South Korea': 230, Russia: 210, Kazakhstan: 200,
  Germany: 165, Japan: 140, France: 150, 'United Kingdom': 110, Spain: 120, Italy: 110,
  Poland: 110, China: 100, Iran: 130, Malaysia: 120, 'South Africa': 100, Turkey: 70,
  Mexico: 65, Brazil: 60, Thailand: 80, Indonesia: 38, Egypt: 38, Vietnam: 45, India: 28,
  Pakistan: 18, Nigeria: 12, Bangladesh: 12, Kenya: 9, Ethiopia: 8, 'Dem. Rep. Congo': 6,
};

const BINS: { max: number; color: string; label: string }[] = [
  { max: 25, color: '#F6DCD3', label: '<25' },
  { max: 75, color: '#EFA88F', label: '25–75' },
  { max: 150, color: '#E3624A', label: '75–150' },
  { max: 250, color: '#C41E12', label: '150–250' },
  { max: Infinity, color: '#7A1410', label: '250+' },
];

const colorFor = (v: number | undefined) => {
  if (v == null) return '#E5E0D6';
  return BINS.find((b) => v < b.max)!.color;
};

export default function EnergyMap() {
  const [hover, setHover] = useState<string | null>('United States of America');

  const { paths, names } = useMemo(() => {
    const land = feature(topo as never, (topo as never as { objects: { countries: unknown } }).objects.countries as never) as never as {
      features: { properties: { name: string } }[];
    };
    const projection = geoEqualEarth().fitExtent([[4, 4], [W - 4, H - 4]], { type: 'Sphere' } as never);
    const path = geoPath(projection);
    return {
      paths: land.features.map((f) => path(f as never) || ''),
      names: land.features.map((f) => f.properties.name),
    };
  }, []);

  const hv = hover ? ENERGY[hover] : undefined;
  const ratio = hv ? hv / WORLD_AVG : undefined;

  return (
    <InteractiveCard
      kicker="Interactive · Hover a country"
      title="Energy wealth is wildly unequal across the planet"
      subhead="Primary energy use per person, gigajoules a year. Hover any country."
      source="Sources: Smil; IEA / Our World in Data energy balances (approximate). Grey = no data."
      bodyPadding={false}
    >
      <div style={{ borderTop: `1px solid ${color.fill}`, marginTop: 18, background: '#EEF1F2' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'hidden' }}>
          <rect x={0} y={0} width={W} height={H} fill="#EEF1F2" />
          {paths.map((d, i) => {
            const n = names[i];
            const isHover = n === hover;
            return (
              <path
                key={i}
                d={d}
                fill={colorFor(ENERGY[n])}
                stroke={isHover ? color.ink : '#F3F1EC'}
                strokeWidth={isHover ? 1.4 : 0.6}
                onMouseEnter={() => ENERGY[n] != null && setHover(n)}
                style={{ cursor: ENERGY[n] != null ? 'pointer' : 'default', transition: 'fill .2s' }}
              />
            );
          })}
        </svg>
      </div>

      {/* legend + readout */}
      <div style={{ padding: '14px 24px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {BINS.map((b) => (
            <div key={b.label} style={{ textAlign: 'center' }}>
              <div style={{ width: 36, height: 12, background: b.color }} />
              <div style={{ fontSize: 9, color: color.gray3, marginTop: 3, fontFamily: font.sans }}>{b.label}</div>
            </div>
          ))}
          <div style={{ fontSize: 9, color: color.gray3, marginLeft: 8, fontFamily: font.sans }}>GJ / person</div>
        </div>
        {hover && hv != null && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 700, color: color.ink }}>{hover === 'United States of America' ? 'United States' : hover}</div>
            <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: color.red, lineHeight: 1 }}>
              {hv} <span style={{ fontSize: 12, color: color.gray2 }}>GJ</span>
            </div>
            <div style={{ fontSize: 11, color: color.gray3 }}>{ratio!.toFixed(1)}× the world average</div>
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}
