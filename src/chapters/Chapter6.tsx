import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as env from '../data/environment';
import LineChart from '../viz/LineChart';
import AnimatedBars from '../viz/AnimatedBars';
import AmazonMyth from '../viz/AmazonMyth';

export default function Chapter6({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={6}
      kicker="Chapter 06"
      title="The Environment"
      subtitle="The Only Biosphere We Have"
      lede="Climate change is real, serious, and demands urgent action. But the scale of transformation required — and the rate at which it can realistically occur — is wildly misrepresented in public discourse. Honesty requires confronting both the urgency and the constraints."
      stats={env.stats}
      quote={env.quote}
      insights={env.insights}
      onNavigate={onNavigate}
    >
      <ChartFrame
        title="The Keeling story: CO₂ over two centuries"
        subhead="Atmospheric CO₂, parts per million. Drag across the curve to read any year."
        source="Source: Smil, ch.6 — from ~270 ppm (pre-industrial) to above 420 ppm"
      >
        <LineChart
          data={env.co2ppm.map((d) => ({ x: d.year, y: d.ppm, label: d.label, note: `${d.ppm} ppm` }))}
          yFormat={(v) => String(Math.round(v))}
          unit=" ppm"
          area
          scrub
        />
      </ChartFrame>

      <ChartFrame
        title="Not all greenhouse gases are equal"
        subhead="Warming effect over 100 years, relative to CO₂ (= 1). Hover each gas."
        source="Source: Smil, ch.6 — methane 28–36×, nitrous oxide 265–298×"
      >
        <AnimatedBars
          items={env.ghgPotency.map((d) => ({ label: d.gas, value: d.multiplier, display: `${d.multiplier}×`, detail: d.note }))}
          labelWidth={150}
          valueWidth={56}
        />
      </ChartFrame>

      <ChartFrame
        title="Electricity is the easy part — everything else has barely started"
        subhead="Indicative decarbonisation progress by sector; 100% = fully carbon-neutral"
        source="Sources: IEA, Climate Action Tracker"
      >
        <AnimatedBars
          items={env.decarbonisation.map((d) => ({ label: d.label, value: d.value, display: d.display, muted: d.muted, detail: 'Hard-to-abate sectors lag furthest behind.' }))}
          max={100}
          labelWidth={120}
          valueWidth={48}
        />
      </ChartFrame>

      <ChartFrame
        title="Myth check: is the Amazon the planet's lungs?"
        subhead="A famous claim, quantified"
        source="Source: Smil, ch.6 — the rainforest's net oxygen contribution is ≈ zero"
      >
        <AmazonMyth />
      </ChartFrame>
    </ChapterShell>
  );
}
