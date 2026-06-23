import type { Stat, Insight } from './types';

export const stats: Stat[] = [
  { value: '0', label: 'Accurate long-range forecasts', blurb: 'no 50-year economic, energy, or technology forecast has ever been substantially correct.' },
  { value: '3', label: 'Types of forecast', blurb: 'well-bounded · directionally correct · and complex models that compound errors unpredictably.' },
  { value: 'Neither', label: "Smil's prediction", blurb: '"a mixture of progress and setbacks" — not apocalypse, not singularity.' },
];

// Position on the apocalypse↔singularity spectrum (0 = doom, 1 = utopia).
export const spectrum: { id: string; label: string; pos: number; quip: string; tone: 'red' | 'ink' | 'blue' }[] = [
  { id: 'doom', label: 'Catastrophism', pos: 0.08, quip: 'Collapse within a generation', tone: 'red' },
  { id: 'smil', label: 'Smil', pos: 0.5, quip: '"A mixture of progress and setbacks"', tone: 'ink' },
  { id: 'tech', label: 'Techno-optimism', pos: 0.92, quip: 'AI, fusion & Mars solve everything', tone: 'blue' },
];

// Confident forecasts that history demolished. Source: Smil ch.7, ~8130–8263.
export const failedPredictions: { year: string; claim: string; reality: string }[] = [
  {
    year: '1960',
    claim: 'Population growth becomes "infinite" by 13 November 2026.',
    reality: 'Growth peaked at ~2.1% in the late 1950s and has fallen ever since.',
  },
  {
    year: '1920s→',
    claim: 'Peak oil is imminent; extraction will collapse.',
    reality: 'Oil output hit new records into the 2000s; 1995–2019 it rose by two-thirds.',
  },
  {
    year: 'pre-1980',
    claim: 'Nuclear fission will eliminate all other electricity.',
    reality: 'Nuclear supplies ~10% of the world’s electricity today.',
  },
  {
    year: '1961',
    claim: 'Nuclear-powered aircraft are around the corner.',
    reality: 'Abandoned after billions spent — a "hopeless task".',
  },
  {
    year: '1989 / 2020',
    claim: 'Only ~10 years left before climate goes "beyond control".',
    reality: 'The deadlines keep being reset; the emissions keep rising.',
  },
];

// "Four confident forecasts" reveal cards. Source: Smil ch.7 (~8130–8263).
export const forecastCards: { src: string; claim: string; verdict: string }[] = [
  {
    src: 'Industry projection',
    claim: '“56 million electric cars on the road by 2040”',
    verdict:
      'A classic category-two forecast: directionally plausible, but the precise number is a guess. Material supply alone — lithium demand would need to rise 18–20-fold — makes the exact figure unknowable.',
  },
  {
    src: 'Policy pledge',
    claim: '“The EU will reach net-zero carbon by 2050”',
    verdict:
      'More than 100 nations have set net-zero targets for round-numbered years. Smil notes these are political declarations worked backward from a date, not engineering roadmaps grounded in real-world constraints.',
  },
  {
    src: 'Aviation forecast',
    claim: '“8.2 billion air travellers a year by 2037”',
    verdict:
      'Extrapolating a smooth curve decades out. No model in 2017 anticipated that a pandemic would erase years of air traffic almost overnight. The long-range number had a very brief shelf life.',
  },
  {
    src: 'Catastrophist headline',
    claim: '“The world will end by 2030 (or 2050)”',
    verdict:
      'Smil’s verdict on apocalyptic dating: examining the three existential necessities — breathing, drinking, eating — shows no unavoidable collapse by 2030 or 2050. Repetitive doom offers no practical guidance.',
  },
];

// World population growth rate, % per year. Source: Smil ch.7, ~8130–8159.
export const popGrowth: { year: number; pct: number }[] = [
  { year: 1770, pct: 0.5 },
  { year: 1925, pct: 1.0 },
  { year: 1958, pct: 2.1 },
  { year: 2000, pct: 1.32 },
  { year: 2019, pct: 1.08 },
];

export const quote = {
  text: 'I am neither a pessimist nor an optimist; I am a scientist trying to explain how the world really works.',
  cite: 'Vaclav Smil, Chapter 7',
};

export const insights: Insight[] = [
  {
    title: 'No 50-year forecast has ever been substantially right.',
    body: 'Energy projections from the 1970s, population models, economic long-range forecasts — all systematically wrong. Forecasting humility is the scientific position, not a weakness.',
  },
  {
    title: 'Our basic needs have not changed.',
    body: 'Eight billion people still need food, water, energy, and shelter. These requirements will not be transcended by apps, AI, or virtual reality. How we meet them is the central challenge of civilisation.',
  },
  {
    title: 'Understanding facts is the prerequisite for solving problems.',
    body: 'We cannot address climate change, food security, or supply fragility if we fundamentally misunderstand how energy, food, and materials actually work.',
  },
];
