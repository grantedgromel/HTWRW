import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { useInView, useCountUp } from './hooks';

const RATIOS = [
  { value: 5_000_000, suffix: '×', label: 'lighter', detail: 'ENIAC weighed 27 tonnes; the chip, a few grams.' },
  { value: 40_000, suffix: '×', label: 'less electricity', detail: 'ENIAC drew ~150 kW; the chip, a few watts.' },
  { value: 500, suffix: '×', label: 'faster', detail: 'And it ran five hundred times quicker.' },
];

function compact(n: number): string {
  if (n >= 1e6) return `${Math.round(n / 1e6)} m`;
  if (n >= 1e3) return `${Math.round(n / 1e3)},000`;
  return String(Math.round(n));
}

function Ratio({ value, suffix, label, detail, go }: { value: number; suffix: string; label: string; detail: string; go: boolean }) {
  const v = useCountUp(value, go, 1500);
  return (
    <div style={{ background: color.white, padding: '22px 20px' }}>
      <div style={{ fontFamily: font.display, fontSize: 42, fontWeight: 700, color: color.red, lineHeight: 0.95 }}>
        {compact(v)}{suffix}
      </div>
      <div style={{ width: 26, height: 2, background: color.red, margin: '12px 0 9px' }} />
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.gray1, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray3, lineHeight: 1.55 }}>{detail}</div>
    </div>
  );
}

/** Ch4: a single 1996 chip re-created the room-sized 1946 ENIAC — and humiliated it. */
export default function EniacChip() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <InteractiveCard
      kicker="One lifetime of progress"
      title="A 1946 computer the size of a room, re-created on a fingernail"
      subhead="In 1996, engineers rebuilt ENIAC as a single chip. The same machine, fifty years on:"
      source="Source: Smil, ch.4 — the 1996 ENIAC-on-a-chip vs. the 1946 original"
      bodyPadding={false}
    >
      <div ref={ref} className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 18, borderTop: `1px solid ${color.fill}`, background: color.rule }}>
        {RATIOS.map((r) => (
          <Ratio key={r.label} {...r} go={inView} />
        ))}
      </div>
    </InteractiveCard>
  );
}
