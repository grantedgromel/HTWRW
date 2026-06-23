import type { Stat, Insight, LadderRung, BarDatum } from './types';

export const stats: Stat[] = [
  { value: '50×', label: 'Car vs. terrorism', blurb: 'more likely to die in a car crash than a terrorist attack — yet terrorism consumes far more policy attention.' },
  { value: '74%', label: 'Preventable deaths', blurb: 'share of deaths in rich countries from chronic, largely preventable disease: heart, cancer, diabetes.' },
  { value: '57,000×', label: 'Heart disease vs. terrorism', blurb: 'ratio of annual US deaths from heart disease versus terrorism.' },
];

// Fatalities per hour of exposure — Smil's central device for comparing risks
// honestly. Source: Smil ch.5, lines ~5712–6018.
export const ladder: LadderRung[] = [
  { label: 'Base jumping', perHour: 4e-2, detail: '1 death per ~2,300 jumps', group: 'extreme' },
  { label: 'Skydiving', perHour: 5e-5, detail: '1 per ~250,000 jumps', group: 'extreme' },
  { label: 'Medical error (in hospital)', perHour: 1.2e-6, detail: 'A leading cause of US deaths', group: 'everyday' },
  { label: 'Driving', perHour: 5e-7, detail: '~40,000 US deaths a year', group: 'everyday' },
  { label: 'Flying', perHour: 2.8e-8, detail: 'Adds just 3% to your hourly mortality', group: 'everyday' },
  { label: 'Tornado', perHour: 3e-9, detail: 'Across 21 tornado-prone states', group: 'nature' },
  { label: 'Earthquake (Japan)', perHour: 5e-10, detail: '1945–2020, incl. Tōhoku', group: 'nature' },
  { label: 'Hurricane', perHour: 8e-11, detail: 'US coastal states', group: 'nature' },
  { label: 'Terrorism (US)', perHour: 6e-11, detail: '1995–2017, incl. 9/11', group: 'fear' },
  { label: 'Space debris', perHour: 1e-12, detail: 'Zero recorded deaths, ever', group: 'nature' },
];

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
