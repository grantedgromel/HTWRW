import { color, font } from '../theme/tokens';
import { heroStats, chapterIndex, perCapitaEnergy } from '../data/overview';
import { ChartFrame } from '../components/Primitives';
import { useInView, useCountUp, formatCountValue } from '../viz/hooks';
import PhantomWorkers from '../viz/PhantomWorkers';
import ScaleExplorer from '../viz/ScaleExplorer';

function HeroStat({ value, label, blurb }: { value: string; label: string; blurb: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  // count up the numeric part; non-numeric values (e.g. "Neither") fall through.
  const target = parseFloat((value.match(/[\d.]+/) || ['0'])[0]);
  const v = useCountUp(target, inView, 1100);
  const printed = target ? formatCountValue(value, v) : value;
  return (
    <div ref={ref} style={{ background: color.white, padding: '28px 24px', borderLeft: `1px solid ${color.rule}` }}>
      <div style={{ fontFamily: font.display, fontSize: 56, fontWeight: 700, lineHeight: 0.9, color: color.ink }}>{printed}</div>
      <div style={{ width: 28, height: 2, background: color.red, margin: '12px 0 10px' }} />
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.gray1, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray3, lineHeight: 1.55 }}>{blurb}</div>
    </div>
  );
}

export default function Overview({ onNavigate }: { onNavigate: (n: number) => void }) {
  const workerPoints = perCapitaEnergy.map((p) => ({ label: String(p.year), gj: p.gj }));

  return (
    <div style={{ animation: 'fadeUp .4s ease both' }}>
      {/* Hero */}
      <div style={{ maxWidth: 640, marginBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>A Data-Driven Visual Companion</div>
        <h1 style={{ fontFamily: font.display, fontSize: 'clamp(40px, 9vw, 54px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', color: color.ink }}>
          How the World<br />Really Works
        </h1>
        <p style={{ fontFamily: font.serif, fontSize: 17, lineHeight: 1.8, color: color.gray1, margin: '0 0 24px' }}>
          Czech-Canadian scientist Vaclav Smil dismantles both techno-optimism and climate catastrophism to reveal the
          material reality underpinning modern civilisation. Seven chapters, grounded in data, that explain energy, food,
          materials, globalisation, risk, the environment, and our likely futures.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: color.gray3, fontStyle: 'italic', fontFamily: font.serif }}>Bill Gates' favourite science author</span>
          <span style={{ color: color.rule, padding: '0 6px' }}>·</span>
          <span style={{ fontSize: 11, color: color.gray3, fontStyle: 'italic', fontFamily: font.serif }}><em>New York Times</em> Bestseller</span>
        </div>
      </div>

      {/* Hero count-up stats */}
      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, background: color.rule, border: `1px solid ${color.rule}`, marginBottom: 48 }}>
        {heroStats.map((s) => (
          <HeroStat key={s.label} {...s} />
        ))}
      </div>

      {/* Interactive: phantom workers across two centuries */}
      <ChartFrame
        title="Each of us now commands an invisible army of energy"
        subhead="Per-capita energy expressed as adult-equivalent labourers working around the clock — drag through history"
        source="Source: Smil, How the World Really Works (2022), ch.1 · 34 GJ ≈ 60 adult-equivalents"
      >
        <PhantomWorkers points={workerPoints} selector="slider" />
      </ChartFrame>

      {/* Interactive: orders of magnitude */}
      <ChartFrame
        title="Modern life spans a staggering range of scales"
        subhead="The orders of magnitude separating the smallest and largest of things we routinely handle"
        source="Source: Smil, How the World Really Works (2022), closing chapter"
      >
        <ScaleExplorer />
      </ChartFrame>

      {/* Chapter index */}
      <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: color.gray3, marginBottom: 16 }}>Seven Chapters</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: color.rule, border: `1px solid ${color.rule}` }}>
        {chapterIndex.map((c, i) => (
          <button
            key={c.n}
            className="focusable"
            onClick={() => onNavigate(c.chapter)}
            style={{
              background: color.white,
              border: 'none',
              padding: '22px 20px',
              textAlign: 'left',
              cursor: 'pointer',
              gridColumn: i === chapterIndex.length - 1 ? 'span 2' : 'auto',
              transition: 'background .12s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = color.bg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = color.white)}
          >
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: color.red, marginBottom: 7 }}>{c.n} · {c.kicker}</div>
            <div style={{ fontFamily: font.serif, fontSize: 15, fontWeight: 600, color: color.ink, marginBottom: 7, lineHeight: 1.25 }}>{c.title}</div>
            <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray2, lineHeight: 1.6, maxWidth: 520 }}>{c.blurb}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: `1px solid ${color.rule}`, gap: 24, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: font.serif, fontSize: 14, fontStyle: 'italic', color: color.gray2, maxWidth: 480, lineHeight: 1.6 }}>
          “We have never had so much information at our fingertips, and yet most of us don't know how the world really works.”
        </div>
        <button
          className="focusable"
          onClick={() => onNavigate(1)}
          style={{ background: color.red, color: '#fff', border: 'none', padding: '11px 22px', fontFamily: font.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = color.redDark)}
          onMouseLeave={(e) => (e.currentTarget.style.background = color.red)}
        >
          Begin reading →
        </button>
      </div>
    </div>
  );
}
