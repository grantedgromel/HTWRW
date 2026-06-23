import { color, font } from '../theme/tokens';
import { cementShock } from '../data/materials';
import { useInView } from './hooks';

/**
 * The book's single most arresting materials statistic: China poured roughly as
 * much cement in two years (2018–19) as the USA did across the whole 20th century.
 */
export default function CementShock() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(cementShock.chinaGt, cementShock.usaGt);
  const rows = [
    { label: cementShock.usaLabel, gt: cementShock.usaGt, years: '100 years', muted: true },
    { label: cementShock.chinaLabel, gt: cementShock.chinaGt, years: '2 years', muted: false },
  ];

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 600, color: color.ink }}>{r.label}</span>
              <span style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3 }}>over {r.years}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 38, background: color.fill, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: inView ? `${(r.gt / max) * 100}%` : '0%',
                    background: r.muted ? color.gray3 : color.red,
                    transition: 'width 1.2s cubic-bezier(.22,1,.36,1) .1s',
                  }}
                />
              </div>
              <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, width: 96, textAlign: 'right', color: r.muted ? color.gray2 : color.ink }}>
                {r.gt} Gt
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7 }}>
        Two years of Chinese construction ≈ <strong>a century of American construction.</strong> It is the clearest
        illustration of why material demand, not policy, sets the pace of emissions.
      </div>
    </div>
  );
}
