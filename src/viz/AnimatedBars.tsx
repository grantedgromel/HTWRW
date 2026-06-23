import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { useInView } from './hooks';

export interface BarItem {
  label: string;
  value: number;
  display?: string;
  detail?: string;
  muted?: boolean;
  color?: string;
}

/**
 * Horizontal bar chart that grows on scroll-into-view, with hover highlight and
 * an inline detail readout. The workhorse behind several chapters (supplier
 * concentration, mortality, decarbonisation, energy density, diet, GHG potency).
 */
export default function AnimatedBars({
  items,
  max,
  labelWidth = 120,
  valueWidth = 64,
  unitSuffix = '',
}: {
  items: BarItem[];
  max?: number;
  labelWidth?: number;
  valueWidth?: number;
  unitSuffix?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const top = max ?? Math.max(...items.map((d) => d.value));

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((d, i) => {
          const pct = top > 0 ? (d.value / top) * 100 : 0;
          const tiny = pct < 1.5;
          const barColor = d.color ?? (d.muted ? color.gray3 : color.red);
          const active = hover === i;
          return (
            <div
              key={d.label}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: d.detail ? 'default' : 'auto' }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                style={{
                  width: labelWidth,
                  fontSize: 11,
                  color: active ? color.ink : color.gray1,
                  textAlign: 'right',
                  flexShrink: 0,
                  lineHeight: 1.3,
                  fontWeight: active ? 600 : 400,
                  transition: 'color .15s',
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 20,
                  background: color.fill,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: tiny ? 4 : 0,
                }}
              >
                {tiny ? (
                  <>
                    <div style={{ height: 20, width: 3, background: barColor, flexShrink: 0 }} />
                    <div style={{ fontSize: 10, color: color.gray3, paddingLeft: 5 }}>
                      {d.display ?? `${d.value}${unitSuffix}`}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: inView ? `${pct}%` : '0%',
                      background: barColor,
                      opacity: active ? 1 : 0.92,
                      transformOrigin: 'left',
                      transition: `width .9s cubic-bezier(.22,1,.36,1) ${0.06 * i}s, opacity .15s`,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  width: valueWidth,
                  fontSize: 12,
                  fontWeight: 600,
                  color: d.muted ? color.gray3 : color.ink,
                  flexShrink: 0,
                }}
              >
                {d.display ?? `${d.value}${unitSuffix}`}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          minHeight: 18,
          marginTop: 10,
          fontFamily: font.serif,
          fontSize: 12,
          fontStyle: 'italic',
          color: color.gray2,
          transition: 'opacity .15s',
          opacity: hover !== null && items[hover].detail ? 1 : 0,
        }}
      >
        {hover !== null ? items[hover].detail ?? '' : ''}
      </div>
    </div>
  );
}
