import { color, font } from '../theme/tokens';

export const NAV: { n: number; label: string }[] = [
  { n: 0, label: 'Overview' },
  { n: 1, label: '1 · Energy' },
  { n: 2, label: '2 · Food' },
  { n: 3, label: '3 · Materials' },
  { n: 4, label: '4 · Globalization' },
  { n: 5, label: '5 · Risks' },
  { n: 6, label: '6 · Environment' },
  { n: 7, label: '7 · Futures' },
];

export default function Header({
  chapter,
  onNavigate,
}: {
  chapter: number;
  onNavigate: (n: number) => void;
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: color.bg,
        borderBottom: `1px solid ${color.rule}`,
      }}
    >
      <div style={{ height: 8, background: color.red }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '10px 40px 0',
          gap: 16,
          flexWrap: 'wrap',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: color.red,
            }}
          >
            Visual Guide
          </span>
          <span style={{ width: 1, height: 10, background: color.rule, display: 'inline-block' }} />
          <span style={{ fontFamily: font.serif, fontSize: 15, fontWeight: 600 }}>
            How the World Really Works
          </span>
        </div>
        <span style={{ fontFamily: font.serif, fontSize: 11, fontStyle: 'italic', color: color.gray3 }}>
          Vaclav Smil · Viking, 2022
        </span>
      </div>
      <nav
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '0 36px',
          gap: 0,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {NAV.map((item) => {
          const active = item.n === chapter;
          return (
            <button
              key={item.n}
              className="focusable"
              onClick={() => onNavigate(item.n)}
              style={{
                border: 'none',
                background: 'none',
                padding: '9px 14px 10px',
                fontFamily: font.sans,
                fontSize: 12,
                fontWeight: 500,
                color: active ? color.red : color.gray1,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = color.red)}
              onMouseLeave={(e) => (e.currentTarget.style.color = active ? color.red : color.gray1)}
            >
              {item.label}
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: color.red,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
