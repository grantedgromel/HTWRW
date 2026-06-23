import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { beakerFoods } from '../data/food';

const DropIcon = () => (
  <svg viewBox="0 0 12 16" width="12" height="16" style={{ animation: 'dropPour .4s ease both' }}>
    <path d="M6 1 L1 9.5 A5 5 0 0 0 11 9.5 Z" fill="#5A3820" />
  </svg>
);

/** Ch2 flagship: pick a food, watch the beaker fill with its embedded diesel. */
export default function DieselBeaker() {
  const [sel, setSel] = useState('tomato');
  const f = beakerFoods.find((x) => x.id === sel) ?? beakerFoods[4];
  const capN = Math.min(f.tbsp, 24);
  const extra = f.tbsp > 24 ? `+${f.tbsp - 24}` : '';

  return (
    <InteractiveCard
      kicker="Interactive · Tap a food"
      title="How much diesel is on your plate?"
      subhead="Fossil fuel embedded in producing common foods, measured the way Smil does — in tablespoons of diesel"
      source="Source: Smil, diesel-equivalent energy of food production. One tablespoon = 14.8 ml"
      bodyPadding={false}
    >
      {/* chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '18px 24px 4px' }}>
        {beakerFoods.map((chip) => {
          const on = chip.id === sel;
          return (
            <button
              key={chip.id}
              className="focusable"
              onClick={() => setSel(chip.id)}
              style={{
                border: `1px solid ${on ? color.red : color.rule}`,
                background: on ? color.red : color.bg,
                color: on ? '#fff' : color.gray1,
                padding: '8px 16px',
                fontFamily: font.sans,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .15s',
                letterSpacing: '0.02em',
              }}
            >
              {chip.chip}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', marginTop: 14, borderTop: `1px solid ${color.fill}` }} className="beaker-grid">
        {/* beaker */}
        <div style={{ padding: 24, borderRight: `1px solid ${color.fill}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', width: 96, height: 170, border: '2px solid #C8BFB2', borderTop: 'none', borderRadius: '0 0 14px 14px', overflow: 'hidden', background: '#FCFBF9' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${f.fillPct}%`, background: 'linear-gradient(#5A3820, #3A2010)', transition: 'height .55s cubic-bezier(.4,0,.2,1)' }} />
            <div style={{ position: 'absolute', left: 8, top: 14, fontSize: 8, color: '#C8BFB2', fontFamily: font.sans }}>— full</div>
            <div style={{ position: 'absolute', left: 8, top: '50%', fontSize: 8, color: '#C8BFB2', fontFamily: font.sans }}>—</div>
          </div>
          {f.over && (
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.red, marginTop: 10 }}>Off the scale</div>
          )}
        </div>
        {/* readout */}
        <div style={{ padding: 24 }}>
          <div style={{ fontFamily: font.serif, fontSize: 18, fontWeight: 600, color: color.ink, marginBottom: 1 }}>{f.name}</div>
          <div style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3, marginBottom: 16 }}>{f.sub}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <span style={{ fontFamily: font.display, fontSize: 46, fontWeight: 700, color: color.red, lineHeight: 0.9 }}>{f.tbsp}</span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: color.gray1 }}>
              tablespoons<br />of diesel
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', marginBottom: 16, minHeight: 18 }}>
            {Array.from({ length: capN }).map((_, i) => (
              <DropIcon key={`${f.id}-${i}`} />
            ))}
            {extra && <span style={{ fontSize: 12, fontWeight: 700, color: '#5A3820', marginLeft: 4 }}>{extra}</span>}
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65, borderTop: `1px solid ${color.fill}`, paddingTop: 14 }}>{f.note}</div>
        </div>
      </div>
    </InteractiveCard>
  );
}
