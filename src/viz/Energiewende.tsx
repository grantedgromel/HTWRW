import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { useInView } from './hooks';

const METRICS = [
  { label: 'Installed capacity', unit: 'GW', y2000: 121, y2020: 210, change: '+73%' },
  { label: 'Electricity generated', unit: 'TWh', y2000: 550, y2020: 577, change: '+5%' },
];

/** Ch6: Germany roughly doubled its power hardware — and barely lifted output. */
export default function Energiewende() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <InteractiveCard
      kicker="Capacity is not output"
      title="Germany nearly doubled its power hardware — output rose 5%"
      subhead="Two decades of the Energiewende, 2000 → 2020"
      source="Source: Smil, ch.1 — installed capacity 121→210 GW; generation up only ~5%."
      bodyPadding={false}
    >
      <div ref={ref} style={{ padding: '22px 24px 8px', borderTop: `1px solid ${color.fill}`, marginTop: 18, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {METRICS.map((m, mi) => {
          const max = Math.max(m.y2000, m.y2020);
          return (
            <div key={m.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
                <span style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 700, color: color.ink }}>{m.label} <span style={{ fontWeight: 400, color: color.gray3 }}>({m.unit})</span></span>
                <span className="tag" style={{ background: mi === 0 ? color.red : color.ink }}>{m.change}</span>
              </div>
              {[
                { yr: '2000', val: m.y2000, c: color.gray3, delay: 0.1 },
                { yr: '2020', val: m.y2020, c: mi === 0 ? color.red : color.ink, delay: 0.25 },
              ].map((row) => (
                <div key={row.yr} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ width: 40, fontSize: 11, color: color.gray2, flexShrink: 0 }}>{row.yr}</span>
                  <div style={{ flex: 1, height: 22, background: color.fill, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: inView ? `${(row.val / max) * 100}%` : '0%', background: row.c, transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${row.delay}s` }} />
                  </div>
                  <span style={{ width: 56, textAlign: 'right', fontSize: 12, fontWeight: 600, color: color.ink, flexShrink: 0 }}>{m.unit === 'GW' ? row.val : row.val.toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ padding: '8px 24px 4px', fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7 }}>
        Wind and solar farms are rated for their <em>peak</em>, but the wind drops and the sun sets. Germany had to build a
        second power system on top of the first — and still keep most of the fossil-fired plants on standby.
      </div>
    </InteractiveCard>
  );
}
