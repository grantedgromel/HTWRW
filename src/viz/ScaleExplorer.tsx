import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { ordersOfMagnitude } from '../data/overview';
import { useInView } from './hooks';

function fmt(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toLocaleString('en-US', { maximumFractionDigits: 1 })} bn`;
  if (n >= 1e6) return `${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })} m`;
  if (n >= 1e3) return n.toLocaleString('en-US');
  return String(n);
}

/** Lets the reader feel the span of scales modern life inhabits (orders of magnitude). */
export default function ScaleExplorer() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [sel, setSel] = useState(0);
  const d = ordersOfMagnitude[sel];

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
        {ordersOfMagnitude.map((o, i) => (
          <button
            key={o.id}
            className="focusable"
            onClick={() => setSel(i)}
            style={{
              border: `1px solid ${sel === i ? color.red : color.rule}`,
              background: sel === i ? color.red : color.white,
              color: sel === i ? color.white : color.gray1,
              fontFamily: font.sans,
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all .15s',
            }}
          >
            {o.id}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
        <span style={{ fontFamily: font.display, fontSize: 56, fontWeight: 700, color: color.red, lineHeight: 0.9 }}>10{<sup>{d.oom}</sup>}</span>
        <span style={{ fontFamily: font.serif, fontSize: 15, fontStyle: 'italic', color: color.gray2 }}>
          {d.oom} orders of magnitude apart
        </span>
      </div>

      {/* log axis with two endpoints */}
      <div style={{ position: 'relative', height: 64, margin: '8px 0 16px' }}>
        <div style={{ position: 'absolute', top: 32, left: 0, right: 0, height: 2, background: color.rule }} />
        {/* low */}
        <Endpoint align="left" labelTop={d.low.label} labelBottom={`${fmt(d.low.value)} ${d.low.unit}`} shown={inView} />
        {/* high */}
        <Endpoint align="right" labelTop={d.high.label} labelBottom={`${fmt(d.high.value)} ${d.high.unit}`} shown={inView} dark />
      </div>

      <div style={{ fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7 }}>{d.caption}</div>
    </div>
  );
}

function Endpoint({
  align,
  labelTop,
  labelBottom,
  shown,
  dark = false,
}: {
  align: 'left' | 'right';
  labelTop: string;
  labelBottom: string;
  shown: boolean;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        [align]: 0,
        textAlign: align,
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateX(${align === 'left' ? '-' : ''}12px)`,
        transition: `all .8s ease ${align === 'right' ? '.25s' : '0s'}`,
        maxWidth: '46%',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: color.ink }}>{labelTop}</div>
      <div style={{ fontSize: 11, color: color.gray3, marginBottom: 6 }}>{labelBottom}</div>
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: dark ? color.ink : color.red,
          [align === 'left' ? 'marginRight' : 'marginLeft']: 'auto',
          border: `2px solid ${color.bg}`,
        }}
      />
    </div>
  );
}
