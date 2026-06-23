import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { containerShips } from '../data/globalization';

/** Ch4 flagship: slide through container-ship eras; the vessel scales with capacity. */
export default function ContainerShip() {
  const [idx, setIdx] = useState(containerShips.length - 1);
  const sh = containerShips[idx];
  const scale = 40 + Math.sqrt(sh.teu / 23756) * 60;
  const vs1957 = Math.round(sh.teu / 226);

  return (
    <InteractiveCard
      kicker="Interactive · Drag through the decades"
      title="The machine that built globalisation"
      subhead="Maximum container-ship capacity, in standard boxes (TEU), 1957 to 2019"
      source="Source: Smil — a twelve-fold rise in maximum size between 1973 and 2019 alone"
      bodyPadding={false}
    >
      {/* ship stage */}
      <div style={{ padding: '20px 24px 8px', borderTop: `1px solid ${color.fill}`, marginTop: 18, background: 'linear-gradient(#FCFBF9, #F4F1EC)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: font.display, fontSize: 40, fontWeight: 700, color: color.red, lineHeight: 0.9 }}>{sh.year}</div>
            <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: color.ink, marginTop: 8, lineHeight: 1 }}>{sh.teu.toLocaleString('en-US')}</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.gray3 }}>containers (TEU)</div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', minWidth: 0 }}>
            <div style={{ width: `${scale}%`, transition: 'width .55s cubic-bezier(.4,0,.2,1)', maxWidth: '100%' }}>
              <svg viewBox="0 0 320 96" width="100%" preserveAspectRatio="xMaxYMax meet" style={{ display: 'block' }}>
                <g>
                  <rect x="60" y="34" width="200" height="12" fill="#E3120B" />
                  <rect x="60" y="22" width="180" height="12" fill="#C8410B" />
                  <rect x="72" y="10" width="150" height="12" fill="#4A6A9A" />
                  <rect x="90" y="46" width="160" height="10" fill="#4A4A4A" />
                </g>
                <g stroke="#FAF9F7" strokeWidth="1.5">
                  <line x1="100" y1="10" x2="100" y2="56" />
                  <line x1="140" y1="10" x2="140" y2="56" />
                  <line x1="180" y1="10" x2="180" y2="56" />
                  <line x1="220" y1="22" x2="220" y2="56" />
                </g>
                <path d="M40 56 L284 56 L268 84 L70 84 Z" fill="#222" />
                <rect x="44" y="48" width="26" height="10" fill="#333" />
                <rect x="0" y="84" width="320" height="3" fill="#9FB8C8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 24px', display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', borderTop: `1px solid ${color.fill}` }}>
        <span style={{ fontFamily: font.serif, fontSize: 14, fontWeight: 600, fontStyle: 'italic', color: color.ink }}>{sh.name}</span>
        <span style={{ fontFamily: font.serif, fontSize: 13, color: color.gray2 }}>{sh.desc}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: color.red }}>{vs1957}× larger than 1957</span>
      </div>
      {/* slider */}
      <div style={{ padding: '14px 24px 22px', borderTop: `1px solid ${color.fill}` }}>
        <input className="econ" type="range" min={0} max={containerShips.length - 1} step={1} value={idx} onChange={(e) => setIdx(Number(e.target.value))} aria-label="Ship era" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {containerShips.map((s, i) => (
            <button
              key={s.year}
              className="focusable"
              onClick={() => setIdx(i)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 10, fontFamily: font.sans, color: i === idx ? color.red : color.gray3, fontWeight: i === idx ? 700 : 400 }}
            >
              {s.year}
            </button>
          ))}
        </div>
      </div>
    </InteractiveCard>
  );
}
