import type { Stat, Insight, FoodItem } from './types';

export const stats: Stat[] = [
  {
    value: '5-10×',
    label: 'Energy cost of food',
    blurb:
      'calories of fossil fuel consumed per calorie of food produced, once processing and transport are included.',
  },
  {
    value: '50%',
    label: 'Fed by ammonia',
    blurb: 'Half of humanity owes its existence to the Haber-Bosch process, invented in 1909.',
  },
  {
    value: '200×',
    label: 'Faster harvesting',
    blurb:
      'what took 10 minutes in 1800 takes 2 seconds today, powered entirely by fossil fuels.',
  },
];

// Diesel / crude-oil equivalent embedded per kg, broken into life-cycle stages.
// Sources: Smil ch.2 (bread lines ~1989–2013; chicken ~2070–2084; tomato
// ~2161–2199). Figures are the book's worst-/typical-case estimates, in ml/kg.
export const foods: FoodItem[] = [
  {
    id: 'tomato',
    name: 'Greenhouse tomato',
    detail: 'heated greenhouse, Almería → Stockholm',
    icon: 'tomato',
    unit: 'ml diesel / kg',
    total: 660,
    note: 'A winter tomato can embed more than five tablespoons of diesel — mostly from heating glass.',
    segments: [
      { label: 'Greenhouse heating', value: 470 },
      { label: 'Fertiliser', value: 60 },
      { label: 'Transport (3,745 km)', value: 90 },
      { label: 'Packing & retail', value: 40 },
    ],
  },
  {
    id: 'bread',
    name: 'Industrial loaf',
    detail: '1 kg sourdough, long supply chain',
    icon: 'bread',
    unit: 'ml diesel / kg',
    total: 400,
    note: 'Even bread — grain, milling, baking, distribution — is steeped in fossil energy.',
    segments: [
      { label: 'Growing grain', value: 80 },
      { label: 'Milling', value: 50 },
      { label: 'Baking', value: 150 },
      { label: 'Distribution', value: 120 },
    ],
  },
  {
    id: 'chicken',
    name: 'Roast chicken',
    detail: 'whole bird, ~1.5 kg',
    icon: 'chicken',
    unit: 'ml crude / kg',
    total: 330,
    note: 'Three kilograms of feed per kilo of meat — the most efficient land animal protein.',
    segments: [
      { label: 'Feed (3 kg grain)', value: 200 },
      { label: 'Housing & climate', value: 80 },
      { label: 'Processing & cooking', value: 50 },
    ],
  },
  {
    id: 'shrimp',
    name: 'Trawled shrimp',
    detail: 'wild-caught, bottom-trawled',
    icon: 'shrimp',
    unit: 'ml diesel / kg',
    total: 900,
    note: 'Fuel-hungry trawling makes shrimp among the most energy-intensive foods on Earth.',
    segments: [
      { label: 'Trawling fuel', value: 700 },
      { label: 'Processing', value: 100 },
      { label: 'Transport', value: 100 },
    ],
  },
];

// "Diesel on your plate" — single-food beaker selector. tbsp = tablespoons of
// diesel embedded per portion (1 tbsp = 14.8 ml); fillPct drives the beaker.
// Source: Smil ch.2 (bread/chicken/tomato/shrimp diesel-equivalents).
export interface BeakerFood {
  id: string;
  chip: string;
  name: string;
  sub: string;
  icon: FoodItem['icon'];
  tbsp: number;
  ml: string;
  note: string;
  fillPct: number;
  over: boolean;
}

export const beakerFoods: BeakerFood[] = [
  { id: 'sardines', chip: 'Sardines', name: 'Wild sardines', sub: 'per kilogram', icon: 'shrimp', tbsp: 7, ml: '100 ml', fillPct: 15, over: false, note: 'The low-carbon choice. Sardines and anchovies live near the surface and need only a small net and little diesel to catch.' },
  { id: 'baguette', chip: 'Baguette', name: 'A baguette', sub: '250 g, standard', icon: 'bread', tbsp: 2, ml: '30 ml', fillPct: 6, over: false, note: 'Growing, milling and baking the wheat for one baguette embeds roughly two tablespoons of diesel.' },
  { id: 'bread', chip: 'Sourdough', name: 'Sourdough loaf', sub: '1 kg', icon: 'bread', tbsp: 17, ml: '250 ml', fillPct: 38, over: false, note: 'Flour, water and salt — but the grain, milling and baking still add up to a full measuring cup of diesel.' },
  { id: 'chicken', chip: 'Chicken', name: 'Roast chicken', sub: '1 kg edible meat', icon: 'chicken', tbsp: 22, ml: '325 ml', fillPct: 50, over: false, note: 'The most efficient meat there is, yet a whole roast chicken still embeds nearly half a wine bottle of crude oil.' },
  { id: 'tomato', chip: 'Tomato', name: 'One greenhouse tomato', sub: '125 g, heated greenhouse', icon: 'tomato', tbsp: 6, ml: '650 ml/kg', fillPct: 65, over: false, note: "Smil's signature demonstration: a single medium tomato from a heated greenhouse embeds five to six tablespoons of diesel." },
  { id: 'shrimp', chip: 'Shrimp', name: 'Two shrimp skewers', sub: '100 g, wild-caught', icon: 'shrimp', tbsp: 50, ml: '0.5–1 litre', fillPct: 100, over: true, note: 'Trawling for wild shrimp is the most fuel-hungry food on Earth: up to 10 litres of diesel per kilogram caught.' },
];

export const TBSP_ML = 14.8;

// Feed-conversion ratios: units of feed per unit of live weight.
// Source: Smil ch.2, lines ~2036–2038.
export const feedConversion: { animal: string; ratio: number; note: string }[] = [
  { animal: 'Chicken', ratio: 1.8, note: 'Broilers: from 3.0 in 1950 to 1.8 today.' },
  { animal: 'Pork', ratio: 3.0, note: 'Roughly three units of feed per unit of weight.' },
  { animal: 'Beef', ratio: 7.0, note: 'Cattle are the least efficient converters of all.' },
];

// The tomato's road trip: Almería to Stockholm. Source: Smil ch.2, ~2188–2192.
export const tomatoJourney = {
  fromCity: 'Almería',
  toCity: 'Stockholm',
  km: 3745,
  litresForLoad: 1120,
  loadTonnes: 13,
  mlPerKg: 90,
};

export const quote = {
  text: 'Modern crop production is subsidised by fossil fuels — without them, global agriculture simply could not feed eight billion people.',
  cite: 'Vaclav Smil, Chapter 2',
};

export const insights: Insight[] = [
  {
    title: 'Even "organic" food is entangled with fossil fuels.',
    body: 'Even without synthetic fertilisers, every step in the supply chain — transport, refrigeration, packaging — burns oil. There is no escape from embedded energy.',
  },
  {
    title: "Ammonia is history's most consequential chemical invention.",
    body: 'The Haber-Bosch process synthesises nitrogen fertiliser from air. It requires enormous amounts of natural gas, and without it, nearly half the human race would not exist.',
  },
  {
    title: 'Meat is dramatically more fossil-fuel-intensive than plants.',
    body: 'The inefficiency worsens further up the food chain. A beef steak embeds 10–20× more energy than the equivalent calories in bread or rice.',
  },
];
