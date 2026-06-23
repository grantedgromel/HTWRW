import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { failedPredictions } from '../data/futures';

/** Confident forecasts history demolished — click each to reveal what happened. */
export default function FailedPredictions() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {failedPredictions.map((p, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            className="focusable"
            onClick={() => setOpen(isOpen ? null : i)}
            style={{
              textAlign: 'left',
              border: `1px solid ${color.rule}`,
              borderLeft: `3px solid ${isOpen ? color.red : color.rule}`,
              background: color.white,
              padding: '14px 18px',
              cursor: 'pointer',
              transition: 'border-color .15s',
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
              <span style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: color.red, flexShrink: 0, width: 70 }}>{p.year}</span>
              <span style={{ fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.55, fontStyle: 'italic' }}>“{p.claim}”</span>
            </div>
            <div
              style={{
                maxHeight: isOpen ? 120 : 0,
                overflow: 'hidden',
                transition: 'max-height .3s ease, opacity .3s',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div style={{ display: 'flex', gap: 14, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${color.fill}` }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.green, flexShrink: 0, width: 70, paddingTop: 2 }}>
                  Reality
                </span>
                <span style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.6 }}>{p.reality}</span>
              </div>
            </div>
            {!isOpen && (
              <div style={{ fontSize: 10, color: color.gray3, marginTop: 6, paddingLeft: 84 }}>What actually happened →</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
