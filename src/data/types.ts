// Shared data shapes for the visualizations. All figures are drawn from Vaclav
// Smil's "How the World Really Works" (Viking, 2022); `src` notes the line range
// in the source text (HOW_TH~1.MD) or the external dataset the design cited.

export interface Stat {
  value: string;
  label: string;
  blurb: string;
}

export interface Insight {
  title: string;
  body: string;
}

export interface BarDatum {
  label: string;
  value: number; // raw value in the series' unit
  display?: string; // overrides the printed value
  muted?: boolean; // render in grey rather than red
  color?: string;
}

export interface StackSegment {
  label: string;
  value: number;
  color?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  detail: string;
  icon: 'tomato' | 'chicken' | 'shrimp' | 'bread' | 'beef';
  unit: string; // e.g. "ml diesel / kg"
  total: number;
  segments: StackSegment[];
  note: string;
}

export interface LadderRung {
  label: string;
  perHour: number; // fatalities per hour of exposure
  detail: string;
  group: 'nature' | 'everyday' | 'extreme' | 'fear';
}

export interface TimePoint {
  year: number;
  value: number;
  display?: string;
  label?: string;
}
