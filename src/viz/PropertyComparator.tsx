import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { properties } from '../data/materials';
import { useInView } from './hooks';

/** Switch metrics to compare steel against aluminium, copper, and granite. */
export default function PropertyComparator() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [m, setM] = useState(0);
  const metric = properties[m];
  const max = Math.max(...metric.values.map((v) => v.value));

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
        {properties.map((p, i) => (
          <button
            key={p.metric}
            className="focusable"
            onClick={() => setM(i)}
            style={{
              border: `1px solid ${m === i ? color.red : color.rule}`,
              background: m === i ? color.red : color.white,
              color: m === i ? color.white : color.gray1,
              fontFamily: font.sans,
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {p.metric}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {metric.values.map((v, i) => {
          const isSteel = v.material === 'Steel';
          return (
            <div key={v.material} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 84, textAlign: 'right', fontSize: 12, fontWeight: isSteel ? 700 : 400, color: isSteel ? color.ink : color.gray1, flexShrink: 0 }}>
                {v.material}
              </div>
              <div style={{ flex: 1, height: 24, background: color.fill, overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: inView ? `${(v.value / max) * 100}%` : '0%',
                    background: isSteel ? color.red : color.gray3,
                    transition: `width .9s cubic-bezier(.22,1,.36,1) ${i * 0.07}s`,
                  }}
                />
              </div>
              <div style={{ width: 80, fontSize: 12, fontWeight: 600, color: color.ink, flexShrink: 0 }}>
                {metric.unit === '°C' ? `${v.value.toLocaleString('en-US')}°C` : `${v.value}×`}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3 }}>
        Measured {metric.unit === '°C' ? 'in °C' : 'relative to aluminium (= 1)'}. Steel’s blend of strength, hardness, and
        heat-tolerance is why nothing has replaced it.
      </div>
    </div>
  );
}
