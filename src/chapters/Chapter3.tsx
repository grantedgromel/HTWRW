import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as materials from '../data/materials';
import MaterialPillars from '../viz/MaterialPillars';
import CementShock from '../viz/CementShock';
import PropertyComparator from '../viz/PropertyComparator';

export default function Chapter3({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={3}
      kicker="Chapter 03"
      title="Our Material World"
      subtitle="The Four Pillars of Modern Civilisation"
      lede="Four materials underpin everything around you: concrete, steel, plastics, and ammonia. None can currently be produced at civilisational scale without massive carbon emissions. This is not a funding problem or a policy problem — it is a chemistry problem."
      stats={materials.stats}
      quote={materials.quote}
      insights={materials.insights}
      onNavigate={onNavigate}
    >
      <ChartFrame
        title="The four pillars — and why they resist decarbonisation"
        subhead="Switch between annual production and share of fossil CO₂. Click a pillar to see the catch."
        source="Source: Smil, How the World Really Works (2022), ch.3"
      >
        <MaterialPillars />
      </ChartFrame>

      <ChartFrame
        title="China's two years vs. America's whole century"
        subhead="Cement produced — the scale that makes targets so hard"
        source="Source: Smil, ch.3 — China poured ~4.4 Gt of cement in 2018–2019"
      >
        <CementShock />
      </ChartFrame>

      <ChartFrame
        title="Nothing matches steel"
        subhead="Compare materials across strength, hardness, and heat tolerance"
        source="Source: Smil, ch.3 — properties vs aluminium, copper, granite"
      >
        <PropertyComparator />
      </ChartFrame>
    </ChapterShell>
  );
}
