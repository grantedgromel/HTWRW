import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { co2ppm } from '../data/environment';
import { useInView } from './hooks';

const cxOf = (x: number) => 40 + x * 8.2;
const cyOf = (ppm: number) => 250 - (ppm - 270) * 1.05;

/** Ch6 flagship: two centuries of CO₂ in one line; tap a milestone to read it. */
export default function CO2Curve() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [sel, setSel] = useState(co2ppm.length - 1);
  const cur = co2ppm[sel];
  const path = co2ppm.map((p, i) => `${i === 0 ? 'M' : 'L'}${cxOf(p.x).toFixed(1)} ${cyOf(p.ppm).toFixed(1)}`).join(' ');

  return (
    <InteractiveCard
      kicker="Interactive · Tap a milestone"
      title="Two centuries of carbon, in one line"
      subhead="Atmospheric CO₂ concentration, parts per million, 1750 to 2020"
      source="Source: Smil, citing Mauna Loa and ice-core records. 2020 level is more than 50% above pre-industrial"
      bodyPadding={false}
    >
      <div ref={ref} style={{ padding: '16px 18px 4px' }}>
        <svg viewBox="0 0 900 280" width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <g stroke={color.fill} strokeWidth={1}>
            <line x1="40" y1="250" x2="870" y2="250" />
            <line x1="40" y1="187" x2="870" y2="187" />
            <line x1="40" y1="124" x2="870" y2="124" />
          </g>
          <g fill="#B8B0A2" fontSize="11" fontFamily={font.sans}>
            <text x="0" y="253">280</text>
            <text x="0" y="190">340</text>
            <text x="0" y="127">400</text>
          </g>
          <path
            d={path}
            fill="none"
            stroke={color.red}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={900}
            strokeDashoffset={inView ? 0 : 900}
            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.5,0,.2,1)' }}
          />
          {co2ppm.map((p, i) => {
            const on = i === sel;
            return (
              <g key={p.year} style={{ cursor: 'pointer' }} onClick={() => setSel(i)}>
                <circle cx={cxOf(p.x)} cy={cyOf(p.ppm)} r={14} fill="transparent" />
                <circle cx={cxOf(p.x)} cy={cyOf(p.ppm)} r={on ? 6 : 4} fill={on ? color.red : '#fff'} stroke={color.red} strokeWidth={2.5} />
                <text x={cxOf(p.x)} y={272} textAnchor="middle" fontSize={11} fontFamily={font.sans} fill={on ? color.red : color.gray3} fontWeight={on ? 700 : 400}>
                  {p.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ margin: '8px 24px 0', padding: '16px 20px', background: '#FCFBF9', borderLeft: `3px solid ${color.red}`, display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, color: color.red, lineHeight: 0.9 }}>{cur.ppm}</div>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.gray3 }}>ppm · {cur.year}</div>
        </div>
        <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>{cur.note}</div>
      </div>
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>
          Yet over the same period the fossil-fuel share of the world's energy has barely moved — from about{' '}
          <strong style={{ fontFamily: font.sans, color: color.ink }}>86%</strong> in 1990 to roughly{' '}
          <strong style={{ fontFamily: font.sans, color: color.ink }}>84%</strong> today. The curve climbs; the dependence does not loosen.
        </div>
      </div>
    </InteractiveCard>
  );
}
