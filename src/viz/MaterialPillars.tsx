import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { pillars } from '../data/materials';

type Metric = 'production' | 'co2';

const TILE_COLORS = ['#E3120B', 'rgba(227,18,11,0.7)', 'rgba(227,18,11,0.45)', 'rgba(227,18,11,0.28)'];

export default function MaterialPillars() {
  const [metric, setMetric] = useState<Metric>('production');
  const [sel, setSel] = useState<number>(0);

  const valueOf = (i: number) => (metric === 'production' ? pillars[i].productionMt : pillars[i].co2Share);
  const sum = pillars.reduce((s, _, i) => s + valueOf(i), 0);

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {([
          { k: 'production', t: 'Production (per year)' },
          { k: 'co2', t: 'Share of fossil CO₂' },
        ] as { k: Metric; t: string }[]).map((o) => (
          <button
            key={o.k}
            className="focusable"
            onClick={() => setMetric(o.k)}
            style={{
              border: `1px solid ${metric === o.k ? color.red : color.rule}`,
              background: metric === o.k ? color.red : color.white,
              color: metric === o.k ? color.white : color.gray1,
              fontFamily: font.sans,
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {o.t}
          </button>
        ))}
      </div>

      {/* proportional tiles */}
      <div style={{ display: 'flex', gap: 4, height: 168 }}>
        {pillars.map((p, i) => {
          const pct = (valueOf(i) / sum) * 100;
          const active = sel === i;
          return (
            <button
              key={p.name}
              className="focusable"
              onClick={() => setSel(i)}
              style={{
                width: `${pct}%`,
                minWidth: 44,
                background: TILE_COLORS[i],
                border: active ? `2px solid ${color.ink}` : '2px solid transparent',
                color: '#fff',
                padding: 14,
                textAlign: 'left',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'width .7s cubic-bezier(.22,1,.36,1), border-color .15s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{p.name}</span>
              <span style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                {metric === 'production' ? p.productionLabel : `${p.co2Share}%`}
              </span>
            </button>
          );
        })}
      </div>

      {/* selected pillar detail */}
      <div style={{ marginTop: 16, padding: '16px 20px', background: color.white, border: `1px solid ${color.rule}`, display: 'flex', gap: 16 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.red, width: 72, flexShrink: 0, paddingTop: 3 }}>
          {pillars[sel].name}
        </div>
        <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>{pillars[sel].reason}</div>
      </div>
    </div>
  );
}
