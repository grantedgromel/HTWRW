import type { Stat, Insight } from './types';

export const stats: Stat[] = [
  { value: '4.5 Gt', label: 'Concrete a year', blurb: 'More than every other construction material combined.' },
  { value: '50%+', label: 'Of CO₂ from four materials', blurb: 'Cement, steel, plastics & ammonia drive ~25% of fossil CO₂ and ~17% of energy.' },
  { value: '0', label: 'Scalable green substitutes', blurb: 'No carbon-free process can yet make these at civilisational volume.' },
];

// The four pillars: annual production (Mt) and share of global fossil-fuel CO₂.
// Source: Smil ch.3, lines ~2811–2812, 2846–2849, 3503–3512.
export const pillars: {
  name: string;
  productionMt: number;
  productionLabel: string;
  co2Share: number; // % of global fossil-fuel combustion CO₂
  reason: string;
  blurb: string;
}[] = [
  {
    name: 'Concrete',
    productionMt: 4500,
    productionLabel: '4.5 Gt',
    co2Share: 8,
    reason:
      "60% of cement's CO₂ is released by the chemistry itself (CaCO₃ → CaO + CO₂), not by burning fuel. Renewable energy cannot fix this.",
    blurb: "Billion tonnes per year — more than all other construction materials combined.",
  },
  {
    name: 'Steel',
    productionMt: 1800,
    productionLabel: '1.8 Gt',
    co2Share: 8,
    reason:
      'Primary steel needs coking coal to chemically reduce iron ore. Hydrogen routes exist but cost 3–5× more and make a fraction of a percent of output.',
    blurb: 'Every bridge, ship, car, machine tool, and skyscraper frame.',
  },
  {
    name: 'Plastics',
    productionMt: 370,
    productionLabel: '370 Mt',
    co2Share: 4,
    reason:
      'Made from oil and gas as feedstock. They are infrastructure — medical devices, insulation, packaging — not a luxury to be banned.',
    blurb: 'Medical devices, packaging, electronics, insulation.',
  },
  {
    name: 'Ammonia',
    productionMt: 150,
    productionLabel: '150 Mt',
    co2Share: 5,
    reason:
      'Haber-Bosch uses natural gas as both feedstock and fuel. Green hydrogen is a path, but its cost premium would raise food prices worldwide.',
    blurb: "Fertiliser for half the world's food. Requires enormous amounts of gas.",
  },
];

// The most arresting cement comparison in the book: China poured as much cement
// in two years as the USA did across the entire 20th century.
// Source: Smil ch.3, lines ~3687–3689.
export const cementShock = {
  chinaLabel: 'China, 2018–2019',
  chinaGt: 4.4,
  usaLabel: 'USA, entire 20th century',
  usaGt: 4.56,
};

// Material property comparison. Source: Smil ch.3, lines ~3268–3277.
export const properties: {
  metric: string;
  unit: string;
  values: { material: string; value: number }[];
}[] = [
  {
    metric: 'Tensile strength',
    unit: '× aluminium',
    values: [
      { material: 'Steel', value: 7 },
      { material: 'Copper', value: 1.7 },
      { material: 'Aluminium', value: 1 },
      { material: 'Granite', value: 0.3 },
    ],
  },
  {
    metric: 'Hardness',
    unit: '× aluminium',
    values: [
      { material: 'Steel', value: 4 },
      { material: 'Copper', value: 0.5 },
      { material: 'Aluminium', value: 1 },
      { material: 'Granite', value: 2 },
    ],
  },
  {
    metric: 'Melting point',
    unit: '°C',
    values: [
      { material: 'Steel', value: 1425 },
      { material: 'Copper', value: 1085 },
      { material: 'Aluminium', value: 660 },
      { material: 'Granite', value: 1260 },
    ],
  },
];

export const quote = {
  text: 'Without cement, steel, plastics, and ammonia we could not have built the world as we know it — and there are no readily available carbon-free alternatives to produce them at the scales the global economy requires.',
  cite: 'Vaclav Smil, Chapter 3',
};

export const insights: Insight[] = [
  {
    title: "Concrete is humanity's most consumed material.",
    body: 'We produce twice as much concrete as every other construction material combined. Romans invented it; it vanished for a millennium; now it is the structural foundation of modern life.',
  },
  {
    title: 'Plastics are infrastructure, not luxury.',
    body: 'Medical tubing, surgical gloves, electrical insulation, food packaging, aircraft panels. Eliminating plastics would require total civilisational redesign, not an incremental policy fix.',
  },
  {
    title: 'The green path is real but very long.',
    body: 'Alternative processes exist for all four pillars. Scaling them globally while matching cost and volume will take decades of sustained investment, not years of political will.',
  },
];
