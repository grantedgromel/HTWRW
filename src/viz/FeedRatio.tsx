import { color, font } from '../theme/tokens';
import { feedConversion } from '../data/food';
import { useInView } from './hooks';

/** Feed-conversion ratios as "grain in → meat out": chicken 1.8 vs pork 3 vs beef 7. */
export default function FeedRatio() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const maxRatio = Math.max(...feedConversion.map((f) => f.ratio));

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {feedConversion.map((f, i) => (
        <div key={f.animal} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 76, flexShrink: 0, textAlign: 'right' }}>
            <div style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 600 }}>{f.animal}</div>
            <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: i === 2 ? color.red : color.ink }}>{f.ratio}×</div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                gap: 4,
                width: inView ? `${(f.ratio / maxRatio) * 100}%` : '0%',
                transition: `width 1s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
                overflow: 'hidden',
              }}
            >
              {Array.from({ length: Math.round(f.ratio) }).map((_, k) => (
                <div key={k} style={{ flex: 1, minWidth: 10, height: 22, background: color.fill, border: `1px solid ${color.rule}` }} />
              ))}
            </div>
            <div style={{ fontFamily: font.serif, fontSize: 11, fontStyle: 'italic', color: color.gray3, marginTop: 5 }}>{f.note}</div>
          </div>
        </div>
      ))}
      <div style={{ fontFamily: font.sans, fontSize: 11, color: color.gray3, paddingTop: 4 }}>
        Each block ≈ one unit of feed needed per unit of live weight. Beef needs roughly four times the grain of chicken.
      </div>
    </div>
  );
}
