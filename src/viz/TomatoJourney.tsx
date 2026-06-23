import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { tomatoJourney as J } from '../data/food';

/** Scrub the winter tomato's 3,745 km truck trip and watch the diesel add up. */
export default function TomatoJourney() {
  const [p, setP] = useState(1); // 0..1 progress

  const km = Math.round(J.km * p);
  const mlPerKg = Math.round(J.mlPerKg * p);
  const litres = Math.round(J.litresForLoad * p);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: font.sans, fontSize: 12, fontWeight: 700 }}>{J.fromCity}</span>
        <span style={{ fontFamily: font.sans, fontSize: 12, fontWeight: 700 }}>{J.toCity}</span>
      </div>

      {/* route */}
      <div style={{ position: 'relative', height: 30, marginBottom: 6 }}>
        <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 2, background: color.rule }} />
        <div style={{ position: 'absolute', top: 14, left: 0, width: `${p * 100}%`, height: 2, background: color.red, transition: 'width .1s' }} />
        <div style={{ position: 'absolute', top: 8, left: 0, width: 8, height: 8, borderRadius: '50%', background: color.gray3 }} />
        <div style={{ position: 'absolute', top: 8, right: 0, width: 8, height: 8, borderRadius: '50%', background: color.ink }} />
        <div style={{ position: 'absolute', top: 0, left: `${p * 100}%`, transform: 'translateX(-50%)', transition: 'left .1s', fontSize: 18 }}>🚚</div>
      </div>

      <input
        className="focusable"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={p}
        onChange={(e) => setP(Number(e.target.value))}
        aria-label="Journey progress"
        style={{ width: '100%', accentColor: color.red, cursor: 'pointer' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 18, border: `1px solid ${color.rule}`, background: color.rule }}>
        {[
          { v: km.toLocaleString('en-US'), u: 'km driven', },
          { v: litres.toLocaleString('en-US'), u: 'litres of diesel (13 t load)' },
          { v: mlPerKg, u: 'ml diesel per kg of tomato' },
        ].map((m, i) => (
          <div key={i} style={{ background: '#fff', padding: '14px 16px' }}>
            <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: i === 2 ? color.red : color.ink, lineHeight: 1 }}>{m.v}</div>
            <div style={{ fontSize: 10, color: color.gray2, marginTop: 6, lineHeight: 1.4 }}>{m.u}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, fontFamily: font.serif, fontSize: 13, fontStyle: 'italic', color: color.gray2 }}>
        And transport is only the final leg — the heated greenhouse it grew in costs far more.
      </div>
    </div>
  );
}
