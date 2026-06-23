import { useState } from 'react';
import { color, font } from '../theme/tokens';
import { foods } from '../data/food';
import type { FoodItem } from '../data/types';

const SEG_COLORS = ['#E3120B', 'rgba(227,18,11,0.66)', 'rgba(227,18,11,0.42)', 'rgba(227,18,11,0.24)'];
const TBSP = 15; // ml

function FoodIcon({ kind, size = 38 }: { kind: FoodItem['icon']; size?: number }) {
  switch (kind) {
    case 'tomato':
      return (
        <svg viewBox="0 0 38 44" width={size} height={size}>
          <circle cx="19" cy="28" r="14" fill="#D94040" />
          <circle cx="14" cy="22" r="3.5" fill="rgba(255,255,255,0.15)" />
          <rect x="18" y="9" width="2" height="9" rx="1" fill="#2A6A35" />
          <path d="M19 13 C16 8 12 9.5 14 13 C15.5 15 19 14 19 13Z" fill="#2A6A35" />
          <path d="M19 13 C22 8 26 9.5 24 13 C22.5 15 19 14 19 13Z" fill="#2A6A35" />
        </svg>
      );
    case 'chicken':
      return (
        <svg viewBox="0 0 38 38" width={size} height={size}>
          <ellipse cx="23" cy="19" rx="13" ry="11" fill="#CC8822" />
          <rect x="2" y="15" width="16" height="7" rx="3.5" fill="#E8D4A0" />
          <circle cx="4" cy="19" r="5.5" fill="#E8D4A0" />
        </svg>
      );
    case 'shrimp':
      return (
        <svg viewBox="0 0 38 38" width={size} height={size}>
          <path d="M11 32 C6 25 7 13 13 8 C20 3 28 5 29 13 C27 18 20 17 18 19 C16 22 16 32 11 32Z" fill="#D46050" />
          <path d="M11 32 L7 36 L11 33 L9 37 L13 32Z" fill="#B84030" />
        </svg>
      );
    case 'bread':
      return (
        <svg viewBox="0 0 38 38" width={size} height={size}>
          <path d="M5 22 C5 14 12 10 19 10 C26 10 33 14 33 22 L33 27 C33 28 32 29 31 29 L7 29 C6 29 5 28 5 27Z" fill="#C99A5B" />
          <path d="M10 16 L13 22 M18 14 L20 22 M26 16 L24 22" stroke="#8A5A28" strokeWidth="1.4" fill="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 38 38" width={size} height={size}>
          <ellipse cx="19" cy="20" rx="14" ry="10" fill="#9A4030" />
        </svg>
      );
  }
}

export default function FoodDiesel() {
  const [open, setOpen] = useState<string | null>('tomato');
  const [plate, setPlate] = useState<Set<string>>(new Set());
  const max = Math.max(...foods.map((f) => f.total));

  const togglePlate = (id: string) =>
    setPlate((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const plateTotal = foods.filter((f) => plate.has(f.id)).reduce((s, f) => s + f.total, 0);

  return (
    <div>
      <div style={{ background: color.white, border: `1px solid ${color.rule}` }}>
        {foods.map((f, fi) => {
          const isOpen = open === f.id;
          const selected = plate.has(f.id);
          return (
            <div key={f.id} style={{ borderBottom: fi < foods.length - 1 ? `1px solid ${color.fill}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 200, flexShrink: 0 }}>
                  <FoodIcon kind={f.icon} />
                  <div>
                    <div style={{ fontFamily: font.sans, fontSize: 13, fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontFamily: font.serif, fontSize: 11, color: color.gray3, marginTop: 2 }}>{f.detail}</div>
                  </div>
                </div>

                {/* stacked bar */}
                <button
                  className="focusable"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  style={{ flex: 1, border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{ flex: 1, height: 22, background: color.fill, display: 'flex', overflow: 'hidden' }}>
                    {f.segments.map((s, si) => (
                      <div
                        key={s.label}
                        title={`${s.label}: ${s.value} ml`}
                        style={{ width: `${(s.value / max) * 100}%`, background: SEG_COLORS[si % SEG_COLORS.length], transition: 'opacity .15s' }}
                      />
                    ))}
                  </div>
                  <div style={{ width: 92, textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontFamily: font.sans, fontSize: 15, fontWeight: 700, color: color.ink }}>{f.total}</span>
                    <span style={{ fontSize: 10, color: color.gray3, marginLeft: 3 }}>{f.unit.replace('ml ', '')}</span>
                  </div>
                </button>

                <button
                  className="focusable"
                  onClick={() => togglePlate(f.id)}
                  style={{
                    border: `1px solid ${selected ? color.red : color.rule}`,
                    background: selected ? color.red : color.white,
                    color: selected ? color.white : color.gray2,
                    fontFamily: font.sans,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    transition: 'all .15s',
                  }}
                >
                  {selected ? '✓ on plate' : '+ plate'}
                </button>
              </div>

              {isOpen && (
                <div style={{ padding: '0 20px 18px 236px', animation: 'fadeUp .25s ease both' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {f.segments.map((s, si) => (
                      <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                        <span style={{ width: 10, height: 10, background: SEG_COLORS[si % SEG_COLORS.length], flexShrink: 0 }} />
                        <span style={{ color: color.gray1, flex: 1 }}>{s.label}</span>
                        <span style={{ fontWeight: 600, color: color.ink }}>{s.value} ml</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray2 }}>{f.note}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* build-a-meal total */}
      <div style={{ marginTop: 14, padding: '16px 20px', background: color.ink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>
            Your plate
          </div>
          <div style={{ fontFamily: font.serif, fontSize: 13, color: '#CCC' }}>
            {plate.size === 0 ? 'Add foods to total their embedded fossil fuel.' : `${plate.size} item${plate.size > 1 ? 's' : ''} selected`}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: font.display, fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {plateTotal.toLocaleString('en-US')} <span style={{ fontSize: 16 }}>ml</span>
          </div>
          <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
            ≈ {Math.round(plateTotal / TBSP)} tablespoons of diesel
          </div>
        </div>
      </div>
      {plate.size > 0 && (
        <button
          className="focusable"
          onClick={() => setPlate(new Set())}
          style={{ marginTop: 8, border: 'none', background: 'none', color: color.gray3, fontFamily: font.sans, fontSize: 11, cursor: 'pointer', padding: 0 }}
        >
          Clear plate
        </button>
      )}
    </div>
  );
}
