import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { GJ_PER_WORKER } from '../data/overview';

export interface WorkerPoint {
  label: string; // year or country
  gj: number;
}

const MAX_ICONS = 300;

function Person({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 10 18" width="10" height="18" style={{ animation: `fadeUp .4s ease both`, animationDelay: `${delay}ms` }}>
      <circle cx="5" cy="3.2" r="2.6" fill={color.red} />
      <path d="M5 6 C2 6 1 8 1 11 L1 16 L9 16 L9 11 C9 8 8 6 5 6Z" fill={color.red} />
    </svg>
  );
}

/**
 * Maps per-capita energy to an army of "phantom workers" — the adult-equivalents
 * of round-the-clock labour each modern person commands (≈60 per 34 GJ).
 */
export default function PhantomWorkers({
  points,
  selector = 'slider',
  initialIndex,
}: {
  points: WorkerPoint[];
  selector?: 'slider' | 'buttons';
  initialIndex?: number;
}) {
  const [idx, setIdx] = useState(initialIndex ?? points.length - 1);
  const cur = points[idx];
  const workers = Math.round(cur.gj / GJ_PER_WORKER);
  const shown = Math.min(workers, MAX_ICONS);

  return (
    <div>
      {selector === 'slider' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <input
            className="focusable"
            type="range"
            min={0}
            max={points.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            aria-label="Select year"
            style={{ flex: 1, accentColor: color.red, cursor: 'pointer' }}
          />
          <div style={{ fontFamily: font.display, fontSize: 34, fontWeight: 700, width: 96, textAlign: 'right' }}>{cur.label}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {points.map((p, i) => (
            <button
              key={p.label}
              className="focusable"
              onClick={() => setIdx(i)}
              style={{
                border: `1px solid ${i === idx ? color.red : color.rule}`,
                background: i === idx ? color.red : color.white,
                color: i === idx ? color.white : color.gray1,
                fontFamily: font.sans,
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
        <div style={{ fontFamily: font.display, fontSize: 56, fontWeight: 700, color: color.red, lineHeight: 0.9 }}>
          {workers < 1 ? '<1' : workers.toLocaleString('en-US')}
        </div>
        <div style={{ fontFamily: font.serif, fontSize: 14, color: color.gray2, lineHeight: 1.5 }}>
          adult-equivalent labourers
          <br />
          <span style={{ fontSize: 12, color: color.gray3 }}>{cur.gj} GJ of energy per person, per year</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, minHeight: 40, padding: '14px 0', borderTop: `1px solid ${color.rule}` }}>
        {Array.from({ length: shown }).map((_, i) => (
          <Person key={`${cur.label}-${i}`} delay={Math.min(i * 4, 600)} />
        ))}
        {workers > MAX_ICONS && (
          <span style={{ alignSelf: 'center', marginLeft: 8, fontSize: 12, color: color.gray3, fontStyle: 'italic', fontFamily: font.serif }}>
            +{(workers - MAX_ICONS).toLocaleString('en-US')} more
          </span>
        )}
      </div>
    </div>
  );
}
