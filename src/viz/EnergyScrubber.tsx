import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { energyAt, energyEra } from '../data/energy';

/**
 * Ch1 flagship: drag a year (1800–2020) to see useful energy per person, the
 * multiplier vs. 1800, and the "phantom workers" that energy would replace.
 */
export default function EnergyScrubber() {
  const [year, setYear] = useState(2020);
  const gj = energyAt(year);
  const mult = gj / 0.05;
  const phantom = Math.round((gj / 34) * 60);
  const barrels = (gj / 34) * 6;

  const eGJ = gj < 1 ? gj.toFixed(2) : gj.toFixed(1);
  const eMult = mult < 10 ? mult.toFixed(1) : Math.round(mult).toLocaleString('en-US');
  const eBarrels = barrels < 1 ? barrels.toFixed(2) : barrels.toFixed(1);

  return (
    <InteractiveCard
      kicker="Interactive · Drag the year"
      title="How rich in energy is one human being?"
      subhead="Useful energy per person, and the human labour it would take to replace it"
      source="Source: Smil — useful energy per capita, 0.05 GJ (1800) to 34 GJ (2020)"
      bodyPadding={false}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 200px) 1fr', marginTop: 18, borderTop: `1px solid ${color.fill}` }} className="es-grid">
        {/* left readout */}
        <div style={{ padding: '22px 24px', borderRight: `1px solid ${color.fill}` }}>
          <div style={{ fontFamily: font.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.red, marginBottom: 4 }}>{year}</div>
          <div style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3, marginBottom: 18 }}>{energyEra(year)}</div>
          <div style={{ fontFamily: font.display, fontSize: 52, fontWeight: 700, color: color.ink, lineHeight: 0.9 }}>{eGJ}</div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.gray1, margin: '6px 0 16px' }}>Gigajoules / person</div>
          <div style={{ borderTop: `1px solid ${color.fill}`, paddingTop: 14 }}>
            <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: color.red, lineHeight: 1 }}>{eMult}×</div>
            <div style={{ fontSize: 11, color: color.gray3, fontFamily: font.serif, marginTop: 3 }}>vs. a person in 1800</div>
          </div>
        </div>
        {/* right: phantom workers */}
        <div style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: color.gray1 }}>Energy as human labour</div>
            <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray3 }}>
              <strong style={{ fontFamily: font.sans, color: color.ink }}>{phantom}</strong> phantom workers
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 4, marginBottom: 14 }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <span key={i} style={{ color: i < phantom ? color.red : '#E7E2D9', display: 'block', lineHeight: 0 }}>
                <svg viewBox="0 0 10 16" width="100%" style={{ display: 'block' }}>
                  <circle cx="5" cy="3" r="2.6" fill="currentColor" />
                  <path d="M1 16 V9 a4 4 0 0 1 8 0 V16 Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray2, lineHeight: 1.6 }}>
            Each figure is one adult working day and night. At today's rate, every person on Earth commands the equivalent of{' '}
            <strong style={{ fontFamily: font.sans, color: color.ink }}>{phantom}</strong> tireless labourers, or about{' '}
            <strong style={{ fontFamily: font.sans, color: color.ink }}>{eBarrels}</strong> barrels of crude oil, every year.
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 24px 22px', borderTop: `1px solid ${color.fill}` }}>
        <input className="econ" type="range" min={1800} max={2020} step={1} value={year} onChange={(e) => setYear(Number(e.target.value))} aria-label="Year" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: color.gray3, fontFamily: font.sans }}>
          <span>1800</span><span>1900</span><span>1950</span><span>2000</span><span>2020</span>
        </div>
      </div>
    </InteractiveCard>
  );
}
