import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { amazonMyth } from '../data/environment';

/** A myth-buster: the Amazon's net oxygen contribution is ≈ zero. */
export default function AmazonMyth() {
  const [busted, setBusted] = useState(false);

  return (
    <div style={{ background: color.white, border: `1px solid ${color.rule}`, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: busted ? color.green : color.red, marginBottom: 8 }}>
            {busted ? 'What’s actually true' : 'The popular claim'}
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 17, lineHeight: 1.6, color: color.ink, fontStyle: 'italic' }}>
            “{busted ? amazonMyth.reality : amazonMyth.claim}”
          </div>
        </div>
        <button
          className="focusable"
          onClick={() => setBusted((b) => !b)}
          style={{
            border: 'none',
            background: busted ? color.ink : color.red,
            color: '#fff',
            fontFamily: font.sans,
            fontSize: 12,
            fontWeight: 600,
            padding: '10px 18px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background .15s',
          }}
        >
          {busted ? '↺ Show the myth' : 'Bust the myth →'}
        </button>
      </div>

      {/* oxygen balance */}
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'O₂ released by day', val: amazonMyth.o2Released, c: color.green },
          { label: 'O₂ consumed by night', val: amazonMyth.o2Absorbed, c: color.gray3 },
        ].map((b) => (
          <div key={b.label}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.gray2, marginBottom: 6 }}>{b.label}</div>
            <div style={{ height: 16, background: color.fill, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: busted ? '100%' : '50%', background: b.c, transition: 'width .8s cubic-bezier(.22,1,.36,1)' }} />
            </div>
            <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, marginTop: 6 }}>~{b.val} Gt</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65, opacity: busted ? 1 : 0.5, transition: 'opacity .3s' }}>
        Over a full year the two flows essentially cancel. And if every land plant on Earth burned at once, it would
        consume only about <strong>{amazonMyth.burnAllBiomass}%</strong> of the atmosphere’s oxygen.
      </div>
    </div>
  );
}
