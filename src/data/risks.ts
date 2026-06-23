import type { Stat, Insight, LadderRung, BarDatum } from './types';

export const stats: Stat[] = [
  { value: '50×', label: 'Car vs. terrorism', blurb: 'more likely to die in a car crash than a terrorist attack — yet terrorism consumes far more policy attention.' },
  { value: '74%', label: 'Preventable deaths', blurb: 'share of deaths in rich countries from chronic, largely preventable disease: heart, cancer, diabetes.' },
  { value: '57,000×', label: 'Heart disease vs. terrorism', blurb: 'ratio of annual US deaths from heart disease versus terrorism.' },
];

// Fatalities per person per hour of exposure (Starr method) — Smil's central
// device for comparing risks honestly. `vol` = voluntary activity.
// Source: Smil ch.5, lines ~5712–6018.
export interface Risk {
  name: string;
  val: number;
  vol: boolean;
  plain: string;
}

export const riskList: Risk[] = [
  { name: 'Base jumping', val: 4e-2, vol: true, plain: '1 death per 25 hours of jumping' },
  { name: 'Hang gliding', val: 1e-3, vol: true, plain: '1 death per 1,000 hours aloft' },
  { name: 'Skydiving', val: 5e-5, vol: true, plain: '1 death per 20,000 hours' },
  { name: 'Being alive (baseline)', val: 1e-6, vol: false, plain: 'Average background mortality' },
  { name: 'Driving a car (US)', val: 5e-7, vol: true, plain: '1 death per 2 million hours driven' },
  { name: 'Downhill skiing', val: 2e-7, vol: true, plain: '1 death per 5 million hours' },
  { name: 'Flying (commercial)', val: 2.8e-8, vol: true, plain: '1 death per 36 million hours aloft' },
  { name: 'Terrorism, Afghanistan 2018', val: 2.3e-8, vol: false, plain: 'At its 2018 peak' },
  { name: 'Terrorism, Iraq 2017', val: 1.3e-8, vol: false, plain: 'At its 2017 peak' },
  { name: 'Terrorism, USA 1995–2017', val: 6e-11, vol: false, plain: 'Incl. September 11, 2001' },
];

// How much each risk is feared/dreaded (1 = most feared) — the second ranking.
export const fearRank: Record<string, number> = {
  'Terrorism, USA 1995–2017': 1,
  'Flying (commercial)': 2,
  'Terrorism, Afghanistan 2018': 3,
  'Terrorism, Iraq 2017': 4,
  'Base jumping': 5,
  'Skydiving': 6,
  'Hang gliding': 7,
  'Downhill skiing': 8,
  'Driving a car (US)': 9,
  'Being alive (baseline)': 10,
};

// What actually kills vs. what we fear, US deaths per million per year.
// Source: Smil ch.5 + CDC/WHO (figures approximate, as the design cited).
export const mortality: { group: 'kills' | 'fear'; data: BarDatum[] } = {
  group: 'kills',
  data: [
    { label: 'Heart disease', value: 1700, display: '1,700 / M' },
    { label: 'Cancer', value: 1500, display: '1,500 / M' },
    { label: 'Car accidents', value: 120, display: '120 / M' },
    { label: 'Plane crashes', value: 0.07, display: '0.07 / M', muted: true },
    { label: 'Terrorism', value: 0.03, display: '0.03 / M', muted: true },
  ],
};

// Diet comparison: how much more an average American consumes than a Japanese
// person each year. Source: Smil ch.5, lines ~5225–5238.
export const diet: { nutrient: string; usExtraPct: number; note: string }[] = [
  { nutrient: 'Fat', usExtraPct: 45, note: '≈ 8 kg more fat per person per year' },
  { nutrient: 'Sugar', usExtraPct: 70, note: '≈ 16 kg more sugar per person per year' },
  { nutrient: 'Protein', usExtraPct: 14, note: 'Only modestly higher' },
  { nutrient: 'Total energy', usExtraPct: 11, note: 'Surprisingly close overall' },
];

// 20th–21st century influenza pandemics, mortality per 100,000.
// Source: Smil ch.5, lines ~6197–6207.
export const pandemics: { name: string; years: string; per100k: number; worldPop: string }[] = [
  { name: 'H2N2', years: '1957–59', per100k: 38, worldPop: '2.9 bn' },
  { name: 'H3N2', years: '1968–70', per100k: 28, worldPop: '3.6 bn' },
  { name: 'Seasonal flu', years: 'typical', per100k: 6, worldPop: '—' },
  { name: 'H1N1', years: '2009', per100k: 3, worldPop: '6.9 bn' },
];

export const quote = {
  text: 'We habitually under-estimate voluntary, familiar risks while we repeatedly exaggerate involuntary, unfamiliar exposure.',
  cite: 'Vaclav Smil, Chapter 5',
};

export const insights: Insight[] = [
  {
    title: 'Familiarity breeds under-reaction.',
    body: 'Driving kills over a million people globally each year; flying kills a few hundred. We fear flying more because crashes are vivid and dramatic, not because they are statistically dangerous.',
  },
  {
    title: 'Governments invest in dramatic threats and neglect the mundane.',
    body: 'Counterterrorism spending dwarfs spending on nutrition education, despite the latter preventing tens of thousands more deaths annually.',
  },
  {
    title: 'Civilisation is, at its core, a risk-reduction machine.',
    body: 'Child mortality has fallen from roughly 50% to under 5% in two centuries — not through dramatic breakthroughs but through sewers, vaccines, and cheap food.',
  },
];
