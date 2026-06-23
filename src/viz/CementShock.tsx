import { color, font } from '../theme/tokens';
import InteractiveCard from '../components/InteractiveCard';
import { cementShock } from '../data/materials';
import { useInView } from './hooks';

function BlockBar({ width, accent, delay, inView }: { width: number; accent: string; delay: number; inView: boolean }) {
  return (
    <div style={{ flex: 1, height: 30, background: color.fill, overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: inView ? `${width}%` : '0%',
          background: `repeating-linear-gradient(90deg, ${accent} 0, ${accent} 17px, ${color.bg} 17px, ${color.bg} 19px)`,
          transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}s`,
        }}
      />
    </div>
  );
}

/** Ch3: China poured nearly as much cement in two years as the USA did in a century. */
export default function CementShock() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <InteractiveCard
      kicker="The scale that breaks intuition"
      title="China used almost as much cement in two years as the USA did in a century"
      subhead="Cement produced, billion tonnes. Each block is roughly 200 million tonnes."
      source="Source: Smil, citing USGS cement statistics"
      bodyPadding={false}
    >
      <div ref={ref} style={{ padding: 24 }}>
        {/* China */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 7 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: color.ink }}>
              {cementShock.chinaLabel.split(',')[0]} <span style={{ fontWeight: 400, color: color.gray3, fontFamily: font.serif, fontStyle: 'italic' }}>2018–2019</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: color.red, padding: '3px 9px' }}>Just 2 years</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BlockBar width={96.5} accent={color.red} delay={0.2} inView={inView} />
            <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: color.red, width: 96, textAlign: 'right' }}>{cementShock.chinaGt} Gt</div>
          </div>
        </div>
        {/* USA */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 7 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: color.ink }}>
              United States <span style={{ fontWeight: 400, color: color.gray3, fontFamily: font.serif, fontStyle: 'italic' }}>1901–2000</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: color.gray1, background: '#E7E2D9', padding: '3px 9px' }}>A whole century</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BlockBar width={100} accent={color.gray1} delay={0.45} inView={inView} />
            <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: color.gray1, width: 96, textAlign: 'right' }}>{cementShock.usaGt} Gt</div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${color.fill}`, paddingTop: 16, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ fontFamily: font.display, fontSize: 40, fontWeight: 700, color: color.ink, lineHeight: 1, flexShrink: 0 }}>50×</div>
          <div style={{ fontFamily: font.serif, fontSize: 13, color: color.gray1, lineHeight: 1.65 }}>
            China compressed a century of American construction into twenty-four months, at roughly fifty times the annual pace.
            This is the scale at which the four pillars operate — and why "just switch the technology" is so much harder than it sounds.
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
