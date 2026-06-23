import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as risks from '../data/risks';
import RiskLadder from '../viz/RiskLadder';
import AnimatedBars from '../viz/AnimatedBars';

export default function Chapter5({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={5}
      kicker="Chapter 05"
      title="Understanding Risks"
      subtitle="From Viruses to Solar Flares"
      lede="We are spectacularly bad at assessing risk. The things that dominate our fears — terrorism, plane crashes, shark attacks — barely register in mortality statistics. The things that quietly destroy us — chronic disease, car accidents, poor diet — barely register in our anxieties."
      stats={risks.stats}
      quote={risks.quote}
      insights={risks.insights}
      onNavigate={onNavigate}
    >
      <ChartFrame
        title="Every step right is ten times deadlier"
        subhead="Fatalities per hour of exposure, log scale. Filter by category; hover any risk."
        source="Source: Smil, How the World Really Works (2022), ch.5"
      >
        <RiskLadder />
      </ChartFrame>

      <ChartFrame
        title="We fear the dramatic and ignore the mundane"
        subhead="Annual deaths per million people, United States — note the orders-of-magnitude difference"
        source="Sources: CDC / WHO mortality data, approximate · heart disease kills ~57,000× more than terrorism"
      >
        <AnimatedBars
          items={risks.mortality.data.map((d) => ({ label: d.label, value: d.value, display: d.display, muted: d.muted, detail: d.muted ? 'A risk we obsess over' : 'A leading cause of death' }))}
          labelWidth={110}
          valueWidth={64}
        />
      </ChartFrame>

      <ChartFrame
        title="The American–Japanese diet gap"
        subhead="How much more an average American eats each year than a Japanese person"
        source="Source: Smil, ch.5 — the gap is largest in fat and sugar"
      >
        <AnimatedBars
          items={risks.diet.map((d) => ({ label: d.nutrient, value: d.usExtraPct, display: `+${d.usExtraPct}%`, detail: d.note }))}
          max={80}
          labelWidth={100}
          valueWidth={56}
        />
      </ChartFrame>
    </ChapterShell>
  );
}
