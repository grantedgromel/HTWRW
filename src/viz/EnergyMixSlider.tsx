import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { energyMixByYear, ENERGY_CATEGORIES, type EnergyCategory } from '../data/energy';

// Category colours: fossils in the brand-red family, everything else neutral/green.
const CAT_COLOR: Record<EnergyCategory, string> = {
  'Traditional biomass': '#B7A98F',
  Coal: '#7A1410',
  Oil: '#E3120B',
  'Natural gas': 'rgba(227,18,11,0.45)',
  Nuclear: '#6A6A6A',
  Hydro: '#4A6A9A',
  'Wind + solar': '#4A8A5A',
};

const FOSSIL: EnergyCategory[] = ['Coal', 'Oil', 'Natural gas'];

export default function EnergyMixSlider() {
  const [idx, setIdx] = useState(energyMixByYear.length - 1);
  const cur = energyMixByYear[idx];
  const fossilShare = FOSSIL.reduce((s, c) => s + cur.mix[c], 0);

  return (
    <div>
      {/* year scrubber */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <input
          className="focusable"
          type="range"
          min={0}
          max={energyMixByYear.length - 1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          aria-label="Select year"
          style={{ flex: 1, accentColor: color.red, cursor: 'pointer' }}
        />
        <div style={{ fontFamily: font.display, fontSize: 38, fontWeight: 700, color: color.ink, width: 86, textAlign: 'right' }}>
          {cur.year}
        </div>
      </div>

      {/* year tick buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
        {energyMixByYear.map((d, i) => (
          <button
            key={d.year}
            className="focusable"
            onClick={() => setIdx(i)}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: font.sans,
              fontSize: 11,
              fontWeight: i === idx ? 700 : 400,
              color: i === idx ? color.red : color.gray3,
            }}
          >
            {d.year}
          </button>
        ))}
      </div>

      {/* 100% stacked bar */}
      <div style={{ display: 'flex', height: 48, width: '100%', border: `1px solid ${color.rule}`, overflow: 'hidden' }}>
        {ENERGY_CATEGORIES.map((cat) => {
          const v = cur.mix[cat];
          return (
            <div
              key={cat}
              title={`${cat}: ${v}%`}
              style={{
                width: `${v}%`,
                background: CAT_COLOR[cat],
                transition: 'width .6s cubic-bezier(.22,1,.36,1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {v >= 12 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{Math.round(v)}%</span>
              )}
            </div>
          );
        })}
      </div>

      {/* fossil callout */}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: color.red }}>
          {Math.round(fossilShare)}%
        </span>
        <span style={{ fontFamily: font.serif, fontSize: 13, fontStyle: 'italic', color: color.gray2 }}>
          fossil fuels — {cur.note}
        </span>
      </div>

      {/* legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 18 }}>
        {ENERGY_CATEGORIES.map((cat) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: CAT_COLOR[cat], display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: color.gray1 }}>
              {cat} <strong style={{ color: color.ink }}>{cur.mix[cat] < 1 && cur.mix[cat] > 0 ? '<1' : Math.round(cur.mix[cat])}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
