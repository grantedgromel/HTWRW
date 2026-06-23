import { useState } from 'react';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { ordersOfMagnitude } from '../data/overview';

function fmt(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toLocaleString('en-US', { maximumFractionDigits: 1 })} tn`;
  if (n >= 1e9) return `${(n / 1e9).toLocaleString('en-US', { maximumFractionDigits: 1 })} bn`;
  if (n >= 1e6) return `${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })} m`;
  if (n >= 1e3) return `${(n / 1e3).toLocaleString('en-US', { maximumFractionDigits: n >= 1e4 ? 0 : 1 })}k`;
  if (n >= 10) return Math.round(n).toLocaleString('en-US');
  if (n >= 1) return n.toFixed(1);
  return n.toFixed(2);
}

const sup = (n: number) => String(n).split('').map((c) => ('⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)] ?? c)).join('');

/** Drag a log slider and watch the quantity scale exponentially — the feel of orders of magnitude. */
export default function ScaleZoom() {
  const [sel, setSel] = useState(0);
  const [t, setT] = useState(0); // 0..1 along the log span
  const d = ordersOfMagnitude[sel];

  const loLog = Math.log10(d.low.value);
  const hiLog = Math.log10(d.high.value);
  const curLog = loLog + t * (hiLog - loLog);
  const value = Math.pow(10, curLog);

  // decade ticks across the span
  const ticks: number[] = [];
  for (let e = Math.ceil(loLog); e <= Math.floor(hiLog); e++) ticks.push(e);
  const posOf = (logv: number) => ((logv - loLog) / (hiLog - loLog)) * 100;

  return (
    <InteractiveCard
      kicker="Interactive · Drag to zoom"
      title="Modern life spans a staggering range of scales"
      subhead="Slide from the smallest to the largest — the number grows ten-fold with every decade you cross"
      source="Source: Smil, How the World Really Works (2022), closing chapter"
      bodyPadding={false}
    >
      <div style={{ padding: '18px 24px 4px' }}>
        {/* dimension chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {ordersOfMagnitude.map((o, i) => (
            <button
              key={o.id}
              className="focusable"
              onClick={() => { setSel(i); setT(0); }}
              style={{ border: `1px solid ${sel === i ? color.red : color.rule}`, background: sel === i ? color.red : color.bg, color: sel === i ? '#fff' : color.gray1, padding: '6px 14px', fontFamily: font.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .15s' }}
            >
              {o.id}
            </button>
          ))}
        </div>

        {/* big live value */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
          <span style={{ fontFamily: font.display, fontSize: 'clamp(44px, 9vw, 68px)', fontWeight: 700, color: color.red, lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>{fmt(value)}</span>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', color: color.gray1 }}>{d.low.unit}</span>
        </div>
        <div style={{ fontFamily: font.serif, fontSize: 13, fontStyle: 'italic', color: color.gray3, marginBottom: 26 }}>
          ≈ 10{<sup>{Math.round(curLog)}</sup>} — and the span end-to-end is <strong style={{ fontFamily: font.sans, color: color.ink, fontStyle: 'normal' }}>{d.oom} orders of magnitude</strong>
        </div>

        {/* log ruler */}
        <div style={{ position: 'relative', height: 56, marginBottom: 8 }}>
          <div style={{ position: 'absolute', top: 26, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${color.fill}, ${color.red})`, borderRadius: 2 }} />
          {ticks.map((e) => (
            <div key={e} style={{ position: 'absolute', top: 14, left: `${posOf(e)}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
              <div style={{ width: 1, height: 8, background: color.rule, margin: '0 auto 4px' }} />
              <div style={{ fontSize: 9, color: color.gray3, fontFamily: font.sans }}>10{sup(e)}</div>
            </div>
          ))}
          {/* marker */}
          <div style={{ position: 'absolute', top: 18, left: `${t * 100}%`, transform: 'translateX(-50%)', width: 18, height: 18, borderRadius: '50%', background: color.red, border: '3px solid #fff', boxShadow: '0 1px 5px rgba(0,0,0,.25)', transition: 'left .05s' }} />
        </div>

        <input className="econ" type="range" min={0} max={1} step={0.002} value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="Scale" />

        {/* endpoints */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, gap: 16 }}>
          <div style={{ maxWidth: '46%' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: color.ink }}>{d.low.label}</div>
            <div style={{ fontSize: 11, color: color.gray3 }}>{fmt(d.low.value)} {d.low.unit}</div>
          </div>
          <div style={{ maxWidth: '46%', textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: color.red }}>{d.high.label}</div>
            <div style={{ fontSize: 11, color: color.gray3 }}>{fmt(d.high.value)} {d.high.unit}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 24px 4px', fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7, borderTop: `1px solid ${color.fill}`, marginTop: 16 }}>
        {d.caption}
      </div>
    </InteractiveCard>
  );
}
