import ChapterShell from './ChapterShell';
import { ChartFrame } from '../components/Primitives';
import * as food from '../data/food';
import DieselBeaker from '../viz/DieselBeaker';
import TomatoJourney from '../viz/TomatoJourney';
import FeedRatio from '../viz/FeedRatio';

export default function Chapter2({ onNavigate }: { onNavigate: (n: number) => void }) {
  return (
    <ChapterShell
      chapter={2}
      kicker="Chapter 02"
      title="Food Production"
      subtitle="Eating Fossil Fuels"
      lede="Modern agriculture is, at its core, a system for converting fossil fuel energy into food energy. Machinery, fertilisers, packaging, and logistics are all deeply entangled with oil and gas. There is no version of current global food supply that does not require fossil fuels."
      stats={food.stats}
      quote={food.quote}
      insights={food.insights}
      onNavigate={onNavigate}
    >
      <DieselBeaker />

      <ChartFrame
        title="A winter tomato's 3,745 km commute"
        subhead="Scrub the truck from Almería to Stockholm and watch the diesel accumulate"
        source="Source: Smil, ch.2 — 1,120 L of diesel for a 13-tonne load"
      >
        <TomatoJourney />
      </ChartFrame>

      <ChartFrame
        title="Climbing the food chain wastes energy fast"
        subhead="Units of feed needed per unit of live weight"
        source="Source: Smil, ch.2 — broiler feed conversion fell from 3.0 (1950) to 1.8 today"
      >
        <FeedRatio />
      </ChartFrame>
    </ChapterShell>
  );
}
