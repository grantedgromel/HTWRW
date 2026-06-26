import { useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { riskList, fearRank } from '../data/risks';
import { prefersReducedMotion } from './hooks';

const LMIN = Math.log10(6e-11);
const LMAX = Math.log10(4e-2);

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (n: number) => String(n).split('').map((ch) => SUP[ch] ?? ch).join('');
const sci = (v: number) => {
  const e = Math.floor(Math.log10(v));
  let m = v / Math.pow(10, e);
  m = Math.round(m * 10) / 10;
  const mStr = m % 1 === 0 ? String(m) : m.toFixed(1);
  return `${mStr} × 10${sup(e)}/hr`;
};

/** Ch5 flagship: rank risks by fear vs. by actual danger — and watch them reorder. */
export default function RiskLadder() {
  const [mode, setMode] = useState<'danger' | 'fear'>('danger');
  const ordered = [...riskList].sort((a, b) =>
    mode === 'danger' ? b.val - a.val : fearRank[a.name] - fearRank[b.name],
  );

  // FLIP reorder: when the ranking flips, animate each row from where it *was*
  // to where it now is, instead of letting the rows teleport. Positions are
  // measured relative to the list container so page-scroll can't skew the delta.
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<string, HTMLDivElement>());
  const prevTops = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const base = listRef.current?.getBoundingClientRect().top ?? 0;
    rowRefs.current.forEach((el, name) => {
      const top = el.getBoundingClientRect().top - base;
      const prev = prevTops.current.get(name);
      prevTops.current.set(name, top);
      if (reduce || prev == null) return;
      const delta = prev - top;
      if (Math.abs(delta) < 0.5) return;
      // Invert synchronously (pre-paint) so there's no flash, then play to rest.
      el.style.transform = `translateY(${delta}px)`;
      animate(el, { translateY: [delta, 0], duration: 500, ease: 'out(3)' });
    });
  }, [mode]);

  const toggle = (m: 'danger' | 'fear', label: string) => (
    <button
      className="focusable"
      onClick={() => setMode(m)}
      style={{
        border: 'none',
        borderLeft: m === 'fear' ? `1px solid ${color.rule}` : 'none',
        background: mode === m ? color.red : '#fff',
        color: mode === m ? '#fff' : color.gray1,
        padding: '8px 16px',
        fontFamily: font.sans,
        fontSize: 11,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all .15s',
      }}
    >
      {label}
    </button>
  );

  return (
    <InteractiveCard
      kicker="Interactive · Switch the ranking"
      title="What we fear versus what actually kills us"
      subhead="Fatalities per person, per hour of exposure (logarithmic scale)"
      source="Source: Smil, fatalities per person per hour of exposure (Starr method)"
      bodyPadding={false}
    >
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ display: 'flex', border: `1px solid ${color.rule}`, width: 'max-content', maxWidth: '100%', flexWrap: 'wrap' }}>
          {toggle('fear', 'Rank by how much we fear it')}
          {toggle('danger', 'Rank by actual danger')}
        </div>
      </div>

      <div ref={listRef} style={{ padding: '18px 24px', borderTop: `1px solid ${color.fill}`, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {ordered.map((r) => {
          const width = 4 + ((Math.log10(r.val) - LMIN) / (LMAX - LMIN)) * 96;
          const c = r.vol ? color.ink : color.red;
          return (
            <div
              key={r.name}
              ref={(el) => {
                if (el) rowRefs.current.set(r.name, el);
                else rowRefs.current.delete(r.name);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div style={{ width: 158, flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: color.ink, lineHeight: 1.25 }}>{r.name}</div>
                <div style={{ fontSize: 9, color: '#A09A8E', fontFamily: font.serif, fontStyle: 'italic' }}>{r.vol ? 'Voluntary' : 'Dreaded / involuntary'}</div>
              </div>
              <div style={{ flex: 1, height: 22, background: '#F4F1EC', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${width.toFixed(1)}%`, background: c, transition: 'width .5s cubic-bezier(.4,0,.2,1)' }} />
              </div>
              <div style={{ width: 92, flexShrink: 0, fontSize: 10, fontWeight: 600, color: color.gray1, fontFamily: font.sans, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{sci(r.val)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '14px 24px', borderTop: `1px solid ${color.fill}`, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 11, height: 11, background: color.ink, display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: color.gray2, fontFamily: font.sans }}>Voluntary activity</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 11, height: 11, background: color.red, display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: color.gray2, fontFamily: font.sans }}>Dreaded / involuntary exposure</span>
        </div>
      </div>
      <div style={{ padding: '14px 24px', borderTop: `1px solid ${color.fill}`, background: '#FCFBF9' }}>
        <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>
          The exposure most Americans dread above all — terrorism — sits at the very bottom:{' '}
          <strong style={{ fontFamily: font.sans, color: color.ink }}>base jumping is roughly a billion times more deadly per hour</strong>{' '}
          than the risk of terrorism on US soil. We reserve our fear for the dramatic and the unfamiliar, not the dangerous.
        </div>
      </div>
    </InteractiveCard>
  );
}
