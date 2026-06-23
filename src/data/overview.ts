import type { Stat } from './types';

export const heroStats: Stat[] = [
  {
    value: '84%',
    label: 'Global energy from fossils',
    blurb:
      "Coal, oil & gas still supply the overwhelming majority of humanity's power — essentially unchanged since 1990.",
  },
  {
    value: '50%',
    label: 'Of humanity fed by ammonia',
    blurb:
      'Half of all humans alive today owe their existence to Haber-Bosch synthetic nitrogen fertiliser.',
  },
  {
    value: '700×',
    label: 'More energy per person',
    blurb:
      'The average person today commands roughly 700 times the useful energy available to someone born in 1800.',
  },
];

// Per-capita primary energy supply across two centuries (GJ/person/year).
// Source: Smil ch.1, lines ~598–614 of the text.
export const perCapitaEnergy: { year: number; gj: number }[] = [
  { year: 1800, gj: 0.05 },
  { year: 1850, gj: 0.4 },
  { year: 1900, gj: 2.7 },
  { year: 1950, gj: 12 },
  { year: 2000, gj: 28 },
  { year: 2020, gj: 34 },
];

// 34 GJ/yr is equivalent to ~60 adults labouring around the clock. We use that
// ratio (≈0.57 GJ per "phantom worker") to animate the figure army.
export const GJ_PER_WORKER = 34 / 60;

export const chapterIndex: {
  n: string;
  kicker: string;
  title: string;
  blurb: string;
  chapter: number;
}[] = [
  {
    n: '01',
    kicker: 'Energy',
    title: 'Fuels & Electricity',
    blurb:
      "Today's average person commands 700× more useful energy than their 1800 ancestors — nearly all of it fossil fuel.",
    chapter: 1,
  },
  {
    n: '02',
    kicker: 'Food',
    title: 'Eating Fossil Fuels',
    blurb:
      'Every greenhouse tomato has tablespoons of diesel embedded in it. Modern food is converted fossil fuel.',
    chapter: 2,
  },
  {
    n: '03',
    kicker: 'Materials',
    title: 'The Four Pillars of Civilisation',
    blurb:
      'Concrete, steel, plastics, and ammonia. None can be decarbonised at scale today, or any time soon.',
    chapter: 3,
  },
  {
    n: '04',
    kicker: 'Globalization',
    title: 'Engines & Microchips',
    blurb:
      "70% of the world's rubber gloves came from one factory. COVID showed exactly how fragile that is.",
    chapter: 4,
  },
  {
    n: '05',
    kicker: 'Risks',
    title: 'From Viruses to Solar Flares',
    blurb:
      'We fear plane crashes and terrorism. We ignore obesity and car accidents. Our risk instincts are systematically wrong.',
    chapter: 5,
  },
  {
    n: '06',
    kicker: 'Environment',
    title: 'The Only Biosphere We Have',
    blurb:
      'Decarbonisation by 2050 is, Smil argues, "a fairy tale." The physics and scale demand honesty about timelines.',
    chapter: 6,
  },
  {
    n: '07',
    kicker: 'Our Coming Futures',
    title: 'Between Apocalypse & Singularity',
    blurb:
      'Neither doom nor utopia. Smil predicts "a mixture of progress and setbacks", and explains why confident forecasting is always wrong.',
    chapter: 7,
  },
];

// "Orders of magnitude" scale comparisons drawn from the book's closing pages
// (lines ~8960–9039): the range of scales that modern life spans.
export const ordersOfMagnitude: {
  id: string;
  low: { label: string; value: number; unit: string };
  high: { label: string; value: number; unit: string };
  oom: number;
  caption: string;
}[] = [
  {
    id: 'power',
    low: { label: 'A strong horse', value: 750, unit: 'watts' },
    high: { label: 'Wide-body jetliner (cruise)', value: 100_000_000, unit: 'watts' },
    oom: 5,
    caption: 'A jetliner pilot commands the power of more than 130,000 horses.',
  },
  {
    id: 'speed',
    low: { label: 'Slow walking', value: 4, unit: 'km/h' },
    high: { label: 'Jetliner', value: 900, unit: 'km/h' },
    oom: 2,
    caption:
      'Pre-industrial travel spanned a factor of two (walking to coach). Today it spans two orders of magnitude.',
  },
  {
    id: 'mass',
    low: { label: 'Etruscan shrew', value: 1, unit: 'grams' },
    high: { label: 'African elephant', value: 1_000_000, unit: 'grams' },
    oom: 6,
    caption: 'The largest land mammal outweighs the smallest by six orders of magnitude.',
  },
  {
    id: 'wealth',
    low: { label: 'A destitute migrant', value: 10, unit: 'dollars' },
    high: { label: 'The richest individuals', value: 100_000_000_000, unit: 'dollars' },
    oom: 10,
    caption:
      'Human net worth now spans ten orders of magnitude — a gap with no equivalent in nature.',
  },
];
