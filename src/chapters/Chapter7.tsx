import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import { color, font } from '../theme/tokens';
import * as fut from '../data/futures';
import ForecastSpectrum from '../viz/ForecastSpectrum';
import ForecastCards from '../viz/ForecastCards';
import LineChart from '../viz/LineChart';

function FinalCTA({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <div style={{ background: color.ink, padding: 32, margin: '4px 0 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', marginBottom: 8 }}>End of visual guide</div>
        <div style={{ fontFamily: font.display, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>Now go read the book.</div>
        <div style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: '#666' }}>How the World Really Works · Vaclav Smil · Viking, 2022</div>
      </div>
      <button
        className="focusable"
        onClick={() => onNavigate(0)}
        style={{ background: color.red, color: '#fff', border: 'none', padding: '12px 22px', fontFamily: font.sans, fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = color.redDark)}
        onMouseLeave={(e) => (e.currentTarget.style.background = color.red)}
      >
        ← Back to Overview
      </button>
    </div>
  );
}

export default function Chapter7({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={7}
      kicker="Chapter 07"
      title="Our Coming Futures"
      subtitle="Between Apocalypse & Singularity"
      lede="The future is not doomed, but nor is it on the cusp of a technological rapture. Smil concludes that honest forecasting requires humility. Complex systems resist confident prediction. What we get will be a mixture of progress and setbacks, as it has always been."
      stats={fut.stats}
      quote={fut.quote}
      insights={fut.insights}
      onNavigate={onNavigate}
      footer={<FinalCTA onNavigate={onNavigate} />}
    >
      <ForecastCards />

      <ChartFrame
        title="Most forecasters sit at one of two wrong ends"
        subhead="Drag the marker to place yourself on the apocalypse-to-singularity spectrum"
        source="Source: Smil, How the World Really Works (2022), ch.7"
      >
        <ForecastSpectrum />
      </ChartFrame>

      <ChartFrame
        title="The population bomb that fizzled"
        subhead="World population growth rate, % per year"
        source="Source: Smil, ch.7 — growth peaked at ~2.1% in the late 1950s"
      >
        <LineChart
          data={fut.popGrowth.map((d) => ({ x: d.year, y: d.pct, note: `${d.pct}% per year` }))}
          yFormat={(v) => `${v.toFixed(1)}%`}
          unit="%"
          area
          scrub
        />
      </ChartFrame>
    </ChapterShell>
  );
}
