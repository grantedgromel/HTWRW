import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as energy from '../data/energy';
import EnergyScrubber from '../viz/EnergyScrubber';
import EnergyMap from '../viz/EnergyMap';
import EnergyMixSlider from '../viz/EnergyMixSlider';
import AnimatedBars from '../viz/AnimatedBars';

export default function Chapter1({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={1}
      kicker="Chapter 01"
      title="Energy"
      subtitle="Fuels & Electricity"
      lede="Energy is the only universal currency. Without understanding how humanity captures and uses it, nothing about the modern world makes sense. We have never lived so energy-rich, and the source of nearly all that wealth is fossil fuels."
      stats={energy.stats}
      quote={energy.quote}
      insights={energy.insights}
      onNavigate={onNavigate}
    >
      <EnergyScrubber />

      <EnergyMap />

      <ChartFrame
        title="Two centuries of energy — and fossils only tightened their grip"
        subhead="Global primary energy supply by source, share of total. Drag through the years."
        source="Sources: Smil, ch.1 + IEA. Figures indicative."
      >
        <EnergyMixSlider />
      </ChartFrame>

      <ChartFrame
        title="Why oil won: energy density"
        subhead="Energy stored per tonne of fuel, GJ. Hover each fuel."
        source="Source: Smil, How the World Really Works (2022), ch.1"
      >
        <AnimatedBars
          items={energy.energyDensity.map((d) => ({ label: d.fuel, value: d.gjPerTonne, detail: d.note, display: `${d.gjPerTonne} GJ/t` }))}
          labelWidth={150}
          valueWidth={64}
          tag="Diesel packs ~3× the energy of dry wood"
        />
      </ChartFrame>
    </ChapterShell>
  );
}
