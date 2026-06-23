import type { ReactNode } from 'react';
import { ChapterHeader, StatStrip, PullQuote, KeyInsights, ChapterNav } from '../components/Primitives';
import { NAV } from '../components/Header';
import type { Stat, Insight } from '../data/types';

export default function ChapterShell({
  chapter,
  kicker,
  title,
  subtitle,
  lede,
  stats,
  quote,
  insights,
  onNavigate,
  children,
  footer,
}: {
  chapter: number;
  kicker: string;
  title: string;
  subtitle: string;
  lede: string;
  stats: Stat[];
  quote: { text: string; cite: string };
  insights: Insight[];
  onNavigate: (n: number) => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const prev = chapter > 1 ? { n: chapter - 1, label: NAV[chapter - 1].label.replace(/^\d+\s·\s/, '') } : undefined;
  const next = chapter < 7 ? { n: chapter + 1, label: NAV[chapter + 1].label.replace(/^\d+\s·\s/, '') } : undefined;

  return (
    <div style={{ animation: 'fadeUp .4s ease both' }}>
      <ChapterHeader kicker={kicker} title={title} subtitle={subtitle} lede={lede} />
      <StatStrip stats={stats} />
      {children}
      <PullQuote text={quote.text} cite={quote.cite} />
      <KeyInsights insights={insights} />
      {footer}
      <ChapterNav prev={prev} next={next} onNavigate={onNavigate} />
    </div>
  );
}
