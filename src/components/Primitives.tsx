import type { ReactNode } from 'react';
import { color, font } from '../theme/tokens';
import type { Stat, Insight } from '../data/types';

/** Uppercase red eyebrow used above headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow" style={{ marginBottom: 12 }}>{children}</div>;
}

/** Chapter header block: kicker, big display title, italic subtitle, lede. */
export function ChapterHeader({
  kicker,
  title,
  subtitle,
  lede,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  lede: string;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <Eyebrow>{kicker}</Eyebrow>
      <h2
        style={{
          fontFamily: font.display,
          fontSize: 'clamp(36px, 7vw, 48px)',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
          color: color.ink,
        }}
      >
        {title}
      </h2>
      <div style={{ fontFamily: font.serif, fontSize: 16, fontStyle: 'italic', color: color.gray2, marginBottom: 18 }}>
        {subtitle}
      </div>
      <p
        style={{
          fontFamily: font.serif,
          fontSize: 16,
          lineHeight: 1.8,
          color: color.gray1,
          maxWidth: 640,
          margin: 0,
        }}
      >
        {lede}
      </p>
    </div>
  );
}

/** Strip of large statistics on a hairline grid. */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div
      className={stats.length === 4 ? 'grid-4' : 'grid-3'}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: 0,
        background: color.rule,
        border: `1px solid ${color.rule}`,
        marginBottom: 40,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: color.white,
            padding: '24px 20px',
            borderLeft: i > 0 ? `1px solid ${color.rule}` : 'none',
          }}
        >
          <div
            style={{
              fontFamily: font.display,
              fontSize: s.value.length > 6 ? 40 : 60,
              fontWeight: 700,
              lineHeight: 0.95,
              color: color.ink,
            }}
          >
            {s.value}
          </div>
          <div style={{ width: 26, height: 2, background: color.red, margin: '12px 0 9px' }} />
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: color.gray1,
              marginBottom: 5,
            }}
          >
            {s.label}
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 12, color: color.gray3, lineHeight: 1.5 }}>
            {s.blurb}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Titled chart container: bold title, red rule, italic subhead, source line. */
export function ChartFrame({
  title,
  subhead,
  source,
  children,
}: {
  title: string;
  subhead: string;
  source?: string;
  children: ReactNode;
}) {
  return (
    <div className="section">
      <div className="chart-title">{title}</div>
      <div className="chart-rule" />
      <div className="chart-subhead">{subhead}</div>
      {children}
      {source && <div className="chart-source">{source}</div>}
    </div>
  );
}

/** Left-border italic pull quote. */
export function PullQuote({ text, cite }: { text: string; cite: string }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${color.red}`,
        padding: '14px 24px',
        marginBottom: 40,
        background: color.white,
      }}
    >
      <div
        style={{
          fontFamily: font.serif,
          fontSize: 18,
          lineHeight: 1.7,
          color: color.ink,
          fontStyle: 'italic',
          marginBottom: 10,
        }}
      >
        “{text}”
      </div>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.gray3 }}>
        {cite}
      </div>
    </div>
  );
}

/** Numbered "Key Insights" list. */
export function KeyInsights({ insights }: { insights: Insight[] }) {
  return (
    <div className="section">
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: color.red, marginBottom: 4 }}>
        Key Insights
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {insights.map((ins, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 16,
              padding: '14px 0',
              borderTop: `1px solid ${color.rule}`,
              borderBottom: i === insights.length - 1 ? `1px solid ${color.rule}` : 'none',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: color.red, flexShrink: 0, paddingTop: 2, width: 14, fontFamily: font.sans }}>
              {i + 1}
            </div>
            <div style={{ fontFamily: font.serif, fontSize: 14, color: color.ink, lineHeight: 1.7 }}>
              <strong>{ins.title}</strong> {ins.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Previous / next chapter footer navigation. */
export function ChapterNav({
  prev,
  next,
  onNavigate,
}: {
  prev?: { n: number; label: string };
  next?: { n: number; label: string };
  onNavigate: (n: number) => void;
}) {
  const linkStyle = (strong: boolean) => ({
    background: 'none',
    border: 'none',
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: 600,
    color: strong ? color.ink : color.gray3,
    cursor: 'pointer',
    padding: 0,
    transition: 'color .15s',
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: prev && next ? 'space-between' : prev ? 'flex-start' : 'flex-end',
        borderTop: `1px solid ${color.rule}`,
        paddingTop: 20,
      }}
    >
      {prev && (
        <button
          className="focusable"
          style={linkStyle(false)}
          onClick={() => onNavigate(prev.n)}
          onMouseEnter={(e) => (e.currentTarget.style.color = color.red)}
          onMouseLeave={(e) => (e.currentTarget.style.color = color.gray3)}
        >
          ← {prev.label}
        </button>
      )}
      {next && (
        <button
          className="focusable"
          style={linkStyle(true)}
          onClick={() => onNavigate(next.n)}
          onMouseEnter={(e) => (e.currentTarget.style.color = color.red)}
          onMouseLeave={(e) => (e.currentTarget.style.color = color.ink)}
        >
          Next: {next.label} →
        </button>
      )}
    </div>
  );
}
