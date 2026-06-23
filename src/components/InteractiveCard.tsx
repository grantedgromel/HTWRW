import type { ReactNode } from 'react';
import { color, font } from '../theme/tokens';

/**
 * The bordered white "Interactive ·" card chrome used by every chapter's
 * flagship interactive in the updated design: a red-dot eyebrow, bold title,
 * italic subhead, the body, and a hairline source line.
 */
export default function InteractiveCard({
  kicker,
  title,
  subhead,
  source,
  children,
  bodyPadding = true,
}: {
  kicker: string;
  title: string;
  subhead: string;
  source?: string;
  children: ReactNode;
  bodyPadding?: boolean;
}) {
  return (
    <div style={{ border: `1px solid ${color.rule}`, background: color.white, marginBottom: 40 }}>
      <div style={{ padding: '22px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, background: color.red, borderRadius: '50%' }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: color.red }}>
            {kicker}
          </span>
        </div>
        <div style={{ fontFamily: font.sans, fontSize: 16, fontWeight: 700, color: color.ink, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3 }}>{subhead}</div>
      </div>
      <div style={{ padding: bodyPadding ? '18px 24px 4px' : 0, marginTop: bodyPadding ? 0 : 0 }}>{children}</div>
      {source && (
        <div style={{ padding: '12px 24px 16px', borderTop: `1px solid ${color.fill}`, fontSize: 10, color: color.gray3, fontFamily: font.sans }}>
          {source}
        </div>
      )}
    </div>
  );
}
