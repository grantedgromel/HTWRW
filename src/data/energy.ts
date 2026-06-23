import type { Stat, Insight } from './types';

export const stats: Stat[] = [
  {
    value: '700×',
    label: 'More useful energy',
    blurb: 'per person today vs. an early-19th-century citizen.',
  },
  {
    value: '60',
    label: 'Phantom workers',
    blurb:
      'each modern person commands energy equivalent to 60 adults labouring around the clock.',
  },
  {
    value: '84%',
    label: 'Fossil fuel share',
    blurb: 'of global primary energy in 2020 — the same proportion as in 1990.',
  },
];

// Approximate composition of global primary energy by year, in % of total.
// Categories chosen so the stacked series is comparable across two centuries.
// Sources: Smil ch.1 (lines ~482–551, 1222–1253) + IEA. Figures are indicative.
export const ENERGY_CATEGORIES = [
  'Traditional biomass',
  'Coal',
  'Oil',
  'Natural gas',
  'Nuclear',
  'Hydro',
  'Wind + solar',
] as const;

export type EnergyCategory = (typeof ENERGY_CATEGORIES)[number];

export const energyMixByYear: { year: number; mix: Record<EnergyCategory, number>; note: string }[] = [
  {
    year: 1800,
    note: 'Plant fuels supply >98% of heat; human & animal muscle do the work.',
    mix: { 'Traditional biomass': 98, Coal: 2, Oil: 0, 'Natural gas': 0, Nuclear: 0, Hydro: 0, 'Wind + solar': 0 },
  },
  {
    year: 1850,
    note: 'Coal is still under 7% of fuel energy; draft animals dominate motion.',
    mix: { 'Traditional biomass': 91, Coal: 8, Oil: 1, 'Natural gas': 0, Nuclear: 0, Hydro: 0, 'Wind + solar': 0 },
  },
  {
    year: 1900,
    note: 'Fossil fuels reach ~50% of primary energy for the first time.',
    mix: { 'Traditional biomass': 50, Coal: 44, Oil: 4, 'Natural gas': 2, Nuclear: 0, Hydro: 0, 'Wind + solar': 0 },
  },
  {
    year: 1950,
    note: 'Fossil fuels now ~75%; oil and gas climb fast.',
    mix: { 'Traditional biomass': 25, Coal: 44, Oil: 23, 'Natural gas': 6, Nuclear: 0, Hydro: 2, 'Wind + solar': 0 },
  },
  {
    year: 2000,
    note: 'Traditional biomass falls to ~12%, confined to the poorest economies.',
    mix: { 'Traditional biomass': 12, Coal: 24, Oil: 37, 'Natural gas': 21, Nuclear: 6, Hydro: 6, 'Wind + solar': 0.4 },
  },
  {
    year: 2020,
    note: 'Wind + solar are visible at last — but still a rounding error beside fossils.',
    mix: { 'Traditional biomass': 7, Coal: 27, Oil: 33, 'Natural gas': 24, Nuclear: 5, Hydro: 6, 'Wind + solar': 4 },
  },
];

// Energy density by mass (GJ per tonne). Source: Smil ch.1, lines ~872–873.
export const energyDensity: { fuel: string; gjPerTonne: number; note: string }[] = [
  { fuel: 'Air-dried wood', gjPerTonne: 16, note: 'The fuel of every pre-industrial society.' },
  { fuel: 'Bituminous coal', gjPerTonne: 27, note: 'Concentrated ancient sunlight; powered the industrial revolution.' },
  { fuel: 'Kerosene / diesel', gjPerTonne: 46, note: 'Energy-dense and pourable — why nothing has displaced oil for flight.' },
];

// Per-capita primary energy by country (GJ/yr), with the "phantom workers" it
// represents at ≈0.57 GJ per adult-equivalent. Source: Smil ch.1, lines ~611–630.
export const countryEnergy: { country: string; gj: number }[] = [
  { country: 'United States', gj: 150 },
  { country: 'Japan', gj: 80 },
  { country: 'China', gj: 50 },
  { country: 'World average', gj: 34 },
  { country: 'Poorest nations', gj: 5 },
];

// Useful energy GJ/capita anchor points for the continuous 1800→2020 scrubber.
// Source: Smil ch.1 (lines ~598–614).
export const energyAnchors: [number, number][] = [
  [1800, 0.05],
  [1850, 0.3],
  [1900, 2.7],
  [1950, 10],
  [2000, 28],
  [2020, 34],
];

export function energyAt(year: number): number {
  const pts = energyAnchors;
  if (year <= pts[0][0]) return pts[0][1];
  if (year >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [y0, v0] = pts[i];
    const [y1, v1] = pts[i + 1];
    if (year >= y0 && year <= y1) {
      const t = (year - y0) / (y1 - y0);
      return v0 + (v1 - v0) * t;
    }
  }
  return 34;
}

export function energyEra(year: number): string {
  return year < 1850
    ? 'Pre-industrial'
    : year < 1900
      ? 'Early industrial'
      : year < 1950
        ? 'Age of coal'
        : year < 2000
          ? 'Age of oil'
          : 'Today';
}

export const quote = {
  text: 'An average inhabitant of Earth nowadays has at their disposal nearly 700 times more useful energy than their ancestors had at the beginning of the 19th century.',
  cite: 'Vaclav Smil, Chapter 1',
};

export const insights: Insight[] = [
  {
    title: 'Fossil fuels dominate because of energy density.',
    body: 'Coal, oil, and gas are extraordinarily concentrated stores of ancient solar energy. No renewable currently matches them for portability and reliability at the scales civilisation requires.',
  },
  {
    title: 'Energy transitions take generations, not years.',
    body: 'The shift from wood to coal took a century. Coal to oil took another. Reversing fossil-fuel dependency within a single decade defies every historical precedent.',
  },
  {
    title: 'Electricity is only part of the picture.',
    body: 'Industrial heat, aviation, and shipping are far harder to electrify than powering a lightbulb. "Clean electricity" addresses only a fraction of total energy demand.',
  },
];
