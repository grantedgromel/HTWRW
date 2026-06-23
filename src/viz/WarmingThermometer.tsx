import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { useInView } from './hooks';

const MAX = 3; // °C top of scale
const COMMITTED = 2.3;
const TODAY = 1.2;
const GAUGE_H = 300;

const pctOf = (t: number) => (t / MAX) * 100;
const topOf = (t: number) => (1 - t / MAX) * GAUGE_H;

const THRESHOLDS = [
  { t: 1.5, label: '1.5 °C — Paris limit', strong: true },
  { t: 2.0, label: '2 °C', strong: false },
];

/** Ch6: we've already locked in ~2.3 °C of warming — past the 1.5 °C ceiling. */
export default function WarmingThermometer() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <InteractiveCard
      kicker="The number behind the targets"
      title="We are already committed to overshooting 1.5 °C"
      subhead="Global mean warming above the pre-industrial baseline, °C"
      source="Sources: Smil, ch.6; IPCC. ‘Committed’ = warming locked in by emissions already released."
      bodyPadding={false}
    >
      <div ref={ref} style={{ padding: '24px 24px 8px', borderTop: `1px solid ${color.fill}`, marginTop: 18, display: 'flex', gap: 28, alignItems: 'stretch', flexWrap: 'wrap' }}>
        {/* gauge */}
        <div style={{ position: 'relative', width: 64, height: GAUGE_H, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, width: 40, margin: '0 auto', background: color.fill, borderRadius: 20, overflow: 'hidden', left: 0, right: 0 }}>
            {/* committed fill */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: inView ? `${pctOf(COMMITTED)}%` : '0%', background: `linear-gradient(${color.red}, #7A1410)`, transition: 'height 1.6s cubic-bezier(.4,0,.2,1) .2s' }} />
            {/* today line within the fill */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: topOf(TODAY), height: 2, background: '#fff', opacity: 0.85 }} />
          </div>
        </div>

        {/* annotations */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200, height: GAUGE_H }}>
          {/* committed marker */}
          <div style={{ position: 'absolute', top: topOf(COMMITTED) - 10, left: 0 }}>
            <div style={{ fontFamily: font.display, fontSize: 30, fontWeight: 700, color: color.red, lineHeight: 1 }}>{COMMITTED} °C</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: color.gray2 }}>already committed</div>
          </div>
          {THRESHOLDS.map((th) => (
            <div key={th.t} style={{ position: 'absolute', top: topOf(th.t) - 7, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, borderTop: `1px ${th.strong ? 'dashed' : 'dotted'} ${th.strong ? color.ink : color.rule}` }} />
              <span style={{ fontSize: 11, fontWeight: th.strong ? 700 : 500, color: th.strong ? color.ink : color.gray3, whiteSpace: 'nowrap' }}>{th.label}</span>
            </div>
          ))}
          {/* today marker */}
          <div style={{ position: 'absolute', top: topOf(TODAY) - 7, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, borderTop: `1px solid #fff` }} />
            <span style={{ fontSize: 11, color: color.gray2, whiteSpace: 'nowrap' }}>~{TODAY} °C today</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 24px 4px', fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7 }}>
        Even if emissions stopped tomorrow, the warming already set in motion carries us <strong>past the 1.5 °C ceiling</strong>.
        The target is not a dial we can still turn back to zero — it is a budget we have very nearly spent.
      </div>
    </InteractiveCard>
  );
}
