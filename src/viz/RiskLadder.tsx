import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { ladder } from '../data/risks';
import type { LadderRung } from '../data/types';
import { useInView } from './hooks';

const MIN_EXP = -12;
const MAX_EXP = -1;
const SPAN = MAX_EXP - MIN_EXP;

const GROUPS: { k: LadderRung['group'] | 'all'; t: string }[] = [
  { k: 'all', t: 'All risks' },
  { k: 'everyday', t: 'Everyday' },
  { k: 'extreme', t: 'Extreme sport' },
  { k: 'nature', t: 'Natural' },
  { k: 'fear', t: 'What we fear' },
];

const GROUP_COLOR: Record<LadderRung['group'], string> = {
  everyday: '#E3120B',
  extreme: '#7A1410',
  nature: '#4A6A9A',
  fear: '#CC8822',
};

const posPct = (v: number) => ((Math.log10(v) - MIN_EXP) / SPAN) * 100;

export default function RiskLadder() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [filter, setFilter] = useState<LadderRung['group'] | 'all'>('all');
  const [hover, setHover] = useState<number | null>(null);
  const rungs = [...ladder].sort((a, b) => b.perHour - a.perHour);
  const gridExps = [-12, -10, -8, -6, -4, -2];

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {GROUPS.map((g) => (
          <button
            key={g.k}
            className="focusable"
            onClick={() => setFilter(g.k)}
            style={{
              border: `1px solid ${filter === g.k ? color.red : color.rule}`,
              background: filter === g.k ? color.red : color.white,
              color: filter === g.k ? color.white : color.gray1,
              fontFamily: font.sans,
              fontSize: 11,
              fontWeight: 600,
              padding: '5px 11px',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {g.t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {rungs.map((r, i) => {
          const dim = filter !== 'all' && r.group !== filter;
          const active = hover === i;
          return (
            <div
              key={r.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: dim ? 0.28 : 1, transition: 'opacity .2s' }}
            >
              <div style={{ width: 150, flexShrink: 0, textAlign: 'right', fontSize: 11, fontWeight: active ? 700 : 500, color: active ? color.ink : color.gray1 }}>
                {r.label}
              </div>
              <div style={{ flex: 1, position: 'relative', height: 26 }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: color.rule }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${inView ? posPct(r.perHour) : 0}%`,
                    transform: 'translate(-50%, -50%)',
                    width: active ? 16 : 12,
                    height: active ? 16 : 12,
                    borderRadius: '50%',
                    background: GROUP_COLOR[r.group],
                    border: `2px solid ${color.bg}`,
                    transition: `left 1s cubic-bezier(.22,1,.36,1) ${i * 0.05}s, width .15s, height .15s`,
                  }}
                />
              </div>
              <div style={{ width: 78, flexShrink: 0, fontSize: 11, color: color.gray3, fontVariantNumeric: 'tabular-nums' }}>
                {r.perHour.toExponential(0).replace('e', '×10^').replace('+', '')}
              </div>
            </div>
          );
        })}
      </div>

      {/* axis */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <div style={{ width: 150, flexShrink: 0 }} />
        <div style={{ flex: 1, position: 'relative', height: 18 }}>
          {gridExps.map((e) => (
            <div key={e} style={{ position: 'absolute', left: `${((e - MIN_EXP) / SPAN) * 100}%`, transform: 'translateX(-50%)', fontSize: 9, color: color.gray3 }}>
              10<tspan style={{ verticalAlign: 'super', fontSize: 7 }}>{e}</tspan>
            </div>
          ))}
        </div>
        <div style={{ width: 78, flexShrink: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, paddingLeft: 160, paddingRight: 88 }}>
        <span style={{ fontSize: 10, color: color.gray3, fontStyle: 'italic', fontFamily: font.serif }}>← safer</span>
        <span style={{ fontSize: 10, color: color.red, fontStyle: 'italic', fontFamily: font.serif }}>more dangerous →</span>
      </div>

      <div style={{ minHeight: 20, marginTop: 12, fontFamily: font.serif, fontSize: 13, fontStyle: 'italic', color: color.gray2, opacity: hover !== null ? 1 : 0.6 }}>
        {hover !== null
          ? `${rungs[hover].label}: ${rungs[hover].detail}.`
          : 'Each step right is 10× deadlier. Note how terrorism sits far to the safe side of driving.'}
      </div>
    </div>
  );
}
