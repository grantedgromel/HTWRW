import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as g from '../data/globalization';
import ContainerShip from '../viz/ContainerShip';
import AnimatedBars from '../viz/AnimatedBars';
import LineChart from '../viz/LineChart';

const compact = (n: number): string => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(n >= 1e10 ? 0 : 1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(Math.round(n));
};

export default function Chapter4({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={4}
      kicker="Chapter 04"
      title="Globalization"
      subtitle="Engines, Microchips & Supply Chains"
      lede="Decades of optimising for efficiency have built an extraordinarily productive — and extraordinarily fragile — world economy. COVID-19 exposed what specialists had warned for years: hyper-concentration is a single point of failure at civilisational scale."
      stats={g.stats}
      quote={g.quote}
      insights={g.insights}
      onNavigate={onNavigate}
    >
      <ContainerShip />

      <ChartFrame
        title="The more concentrated production becomes, the more catastrophic the failure"
        subhead="Share of global production held by the single top supplier, selected goods. Hover for detail."
        source="Sources: various trade bodies & Smil analysis"
      >
        <AnimatedBars
          items={g.concentration.map((d) => ({ label: d.label, value: d.value, display: `${d.value}%`, muted: d.muted, detail: 'Concentration is efficiency and fragility at once.' }))}
          max={100}
          labelWidth={140}
          valueWidth={40}
        />
      </ChartFrame>

      <ChartFrame
        title="Moore's Law: 17 billion times more, in one lifetime"
        subhead="Transistors on a leading microprocessor — note the log scale"
        source="Source: Smil, ch.4 — Intel 4004 (1971) to AMD Epyc (2019)"
      >
        <LineChart
          data={g.moore.map((d) => ({ x: d.year, y: d.transistors, label: d.chip, note: `${compact(d.transistors)} transistors` }))}
          yFormat={compact}
          allowLogToggle
          defaultLog
        />
      </ChartFrame>
    </ChapterShell>
  );
}
