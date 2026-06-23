import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { forecastCards } from '../data/futures';

/** Ch7 flagship: four confident forecasts; tap each to reveal Smil's verdict. */
export default function ForecastCards() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <InteractiveCard
      kicker="Interactive · Reveal the verdict"
      title="Four confident forecasts. What would Smil say?"
      subhead="No fifty-year forecast has ever been substantially right. Tap each prediction to see why."
      source="Source: Smil, on the three categories of quantitative forecasts and their failures"
      bodyPadding={false}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, marginTop: 18, borderTop: `1px solid ${color.fill}`, background: color.fill }} className="forecast-grid">
        {forecastCards.map((f, i) => {
          const isOpen = !!open[i];
          return (
            <div key={i} style={{ background: color.white, padding: '22px 22px 18px', borderTop: `3px solid ${isOpen ? color.red : color.rule}` }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A09A8E', marginBottom: 10 }}>{f.src}</div>
              <div style={{ fontFamily: font.serif, fontSize: 17, fontWeight: 600, color: color.ink, lineHeight: 1.4, marginBottom: 16 }}>{f.claim}</div>
              {isOpen && (
                <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65, padding: '12px 0 14px', borderTop: `1px solid ${color.fill}`, animation: 'dropPour .4s ease both' }}>
                  {f.verdict}
                </div>
              )}
              <button
                className="focusable"
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                style={{ background: 'none', border: 'none', padding: 0, fontFamily: font.sans, fontSize: 12, fontWeight: 600, color: color.red, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                {isOpen ? "Hide Smil's verdict" : 'What does Smil say?'} →
              </button>
            </div>
          );
        })}
      </div>
    </InteractiveCard>
  );
}
