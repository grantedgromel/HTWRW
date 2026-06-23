import type { Stat, Insight, BarDatum } from './types';

export const stats: Stat[] = [
  { value: '"Fairy tale"', label: 'Smil on 2050 net-zero', blurb: 'his blunt verdict on promises to fully decarbonise the global economy within 25 years.' },
  { value: '1.5°C', label: 'Paris Agreement limit', blurb: 'the politically agreed ceiling, already likely to be breached on current trajectories.' },
  { value: '100+', label: 'Years to full transition', blurb: "Smil's realistic estimate, based on the pace of every historical energy transition." },
];

// Atmospheric CO₂, parts per million, over two centuries (the Keeling story).
// Source: Smil ch.6, lines ~6905–6912, 7054–7060.
export const co2ppm: { year: number; ppm: number; label?: string }[] = [
  { year: 1800, ppm: 270, label: 'Pre-industrial' },
  { year: 1900, ppm: 290 },
  { year: 1958, ppm: 315, label: 'Mauna Loa begins' },
  { year: 1985, ppm: 346 },
  { year: 2000, ppm: 375 },
  { year: 2020, ppm: 420, label: 'Above 420 ppm' },
];

// Global-warming potential vs CO₂ over 100 years. Source: Smil ch.6, ~6919–6937.
export const ghgPotency: { gas: string; multiplier: number; note: string }[] = [
  { gas: 'CO₂', multiplier: 1, note: 'The reference gas — and 75% of the warming effect.' },
  { gas: 'Methane (CH₄)', multiplier: 30, note: '28–36× the effect of CO₂, tonne for tonne.' },
  { gas: 'Nitrous oxide (N₂O)', multiplier: 280, note: '265–298× — from fertiliser and combustion.' },
];

// Decarbonisation progress by sector; 100% = fully carbon-neutral.
// Source: Smil ch.6 + IEA / Climate Action Tracker.
export const decarbonisation: BarDatum[] = [
  { label: 'Electricity grids', value: 28, display: '~28%' },
  { label: 'Passenger cars', value: 8, display: '~8%' },
  { label: 'Steel & cement', value: 1, display: '<1%', muted: true },
  { label: 'Aviation', value: 0.3, display: '~0%', muted: true },
  { label: 'Shipping', value: 0.3, display: '~0%', muted: true },
];

// The Amazon "lungs of the Earth" myth, quantified. Source: Smil ch.6, ~6550–6609.
export const amazonMyth = {
  claim: 'The Amazon produces 20% of the world’s oxygen.',
  reality:
    'Over a year the rainforest consumes virtually all the oxygen it produces — its net contribution is close to zero.',
  o2Absorbed: 300, // billion tonnes/yr absorbed
  o2Released: 300, // billion tonnes/yr released
  burnAllBiomass: 0.1, // % of atmospheric O₂ consumed if all land plants burned at once
};

export const quote = {
  text: 'Our societies have been steadily increasing their dependence on fossil fuels — any promises of decarbonization by 2050 are a fairy tale.',
  cite: 'Vaclav Smil, Chapter 6',
};

export const insights: Insight[] = [
  {
    title: "Smil takes climate change seriously — that's why he's sceptical of the timelines.",
    body: 'Understanding the full scope of decarbonisation makes you more cautious about political promises, not less. The scale demands honesty.',
  },
  {
    title: 'There is no carbon-free substitute for concrete, steel, or ammonia at scale.',
    body: 'These are not technology gaps we are close to closing. They require entirely new industrial processes that do not yet exist commercially.',
  },
  {
    title: 'We must act precisely because the transition is slow.',
    body: 'Long lead times mean action started today has its greatest impact in 2050–2100. Delay now compounds the difficulty enormously for every generation that follows.',
  },
];
