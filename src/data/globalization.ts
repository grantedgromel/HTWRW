import type { Stat, Insight, BarDatum } from './types';

export const stats: Stat[] = [
  { value: '90%', label: 'Trade moves by sea', blurb: 'By volume. Container shipping is the invisible backbone of global commerce.' },
  { value: '70%', label: 'Rubber gloves, one factory', blurb: "of the world's rubber gloves came from a single Malaysian facility, shuttered in 2020." },
  { value: '1,000+', label: 'Steps per microchip', blurb: 'spanning 40+ countries across 3+ continents. No nation could reproduce this alone.' },
];

// Share of global production held by the single top supplier (approx.).
// Source: Smil ch.4, lines ~5023–5027 + trade bodies.
export const concentration: BarDatum[] = [
  { label: 'Rubber gloves (1 factory)', value: 70 },
  { label: 'China: rare earths', value: 60 },
  { label: 'China: steel output', value: 56, muted: true },
  { label: 'TSMC: advanced chips', value: 54 },
];

// Container-ship capacity, in TEU (standard containers). Source: Smil ch.4,
// lines ~4439–4443, 4754–4762.
export const containerCapacity: { year: number; teu: number; ship: string }[] = [
  { year: 1968, teu: 226, ship: 'Early cellular ships' },
  { year: 1973, teu: 1968, ship: "McLean's converted fleet" },
  { year: 1996, teu: 6000, ship: 'Regina Maersk' },
  { year: 2008, teu: 13800, ship: 'Emma Maersk class' },
  { year: 2019, teu: 23756, ship: 'MSC Gülsün' },
];

// Moore's Law: transistors on a leading microprocessor. Log-scale.
// Source: Smil ch.4, lines ~4809–4835.
export const moore: { year: number; transistors: number; chip: string }[] = [
  { year: 1971, transistors: 2300, chip: 'Intel 4004' },
  { year: 1982, transistors: 134000, chip: 'Intel 80286' },
  { year: 1993, transistors: 3100000, chip: 'Pentium' },
  { year: 2003, transistors: 220000000, chip: 'Pentium 4 (Prescott)' },
  { year: 2010, transistors: 1170000000, chip: 'Core i7 (Gulftown)' },
  { year: 2019, transistors: 39500000000, chip: 'AMD Epyc Rome' },
];

// Top speed of long-distance trade/travel, km/h. Source: Smil ch.4, lines
// ~4060–4065, 4162–4172 and closing pages.
export const tradeSpeed: { era: string; mode: string; kmh: number }[] = [
  { era: '1600s', mode: 'Dutch East-India sail', kmh: 4.7 },
  { era: '1850s', mode: 'Clipper ship', kmh: 20 },
  { era: '1900s', mode: 'Steam & steel liner', kmh: 40 },
  { era: 'Today', mode: 'Jetliner', kmh: 900 },
];

export const quote = {
  text: "The foolishness of allowing 70 per cent of the world's rubber gloves to be made in just one factory became glaringly obvious during 2020.",
  cite: 'Vaclav Smil, Chapter 4',
};

export const insights: Insight[] = [
  {
    title: 'Efficiency and fragility are the same thing.',
    body: 'Just-in-time supply chains, zero-inventory logistics, and single-country specialisation work brilliantly in calm weather, and fail catastrophically when the weather turns.',
  },
  {
    title: 'The container ship is the unsung hero of modern prosperity.',
    body: 'Invented in 1956, the standardised shipping container reduced freight costs by ~90% and made modern consumer culture possible. Without it, globalisation is conceptually impossible.',
  },
  {
    title: 'Decoupling from China is far more complex than it sounds.',
    body: 'China produces more steel than the rest of the world combined and is embedded in the supply chain of almost every manufactured product on Earth.',
  },
];
