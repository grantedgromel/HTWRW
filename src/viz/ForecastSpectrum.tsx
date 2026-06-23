import { useRef, useState } from 'react';
import { color, font } from '../theme/tokens';
import { spectrum } from '../data/futures';

const TONE: Record<string, string> = { red: '#E3120B', ink: '#121212', blue: '#4A6A9A' };

function labelFor(pos: number): string {
  if (pos < 0.2) return 'Catastrophism';
  if (pos < 0.4) return 'Cautious pessimism';
  if (pos < 0.6) return 'Smil’s realism';
  if (pos < 0.8) return 'Cautious optimism';
  return 'Techno-utopianism';
}

export default function ForecastSpectrum() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [userPos, setUserPos] = useState(0.5);
  const [dragging, setDragging] = useState(false);

  const setFromClient = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setUserPos(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
  };

  return (
    <div>
      {/* spectrum track */}
      <div style={{ position: 'relative', paddingTop: 30, marginBottom: 22 }}>
        <div
          ref={trackRef}
          onPointerDown={(e) => {
            setDragging(true);
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setFromClient(e.clientX);
          }}
          onPointerMove={(e) => dragging && setFromClient(e.clientX)}
          onPointerUp={() => setDragging(false)}
          style={{ height: 8, background: 'linear-gradient(to right, #E3120B 0%, #F0EDE8 50%, #4A6A9A 100%)', cursor: 'pointer', touchAction: 'none', borderRadius: 4 }}
        />

        {/* fixed voice markers */}
        {spectrum.map((s) => (
          <div key={s.id} style={{ position: 'absolute', top: 24, left: `${s.pos * 100}%`, transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ width: 2, height: 12, background: TONE[s.tone], margin: '0 auto 4px' }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: TONE[s.tone], whiteSpace: 'nowrap' }}>{s.label}</div>
          </div>
        ))}

        {/* draggable user marker */}
        <div style={{ position: 'absolute', top: 0, left: `${userPos * 100}%`, transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: color.ink, background: color.bg, border: `2px solid ${color.ink}`, padding: '2px 7px', whiteSpace: 'nowrap' }}>
            You · {labelFor(userPos)}
          </div>
          <div style={{ width: 2, height: 14, background: color.ink, margin: '2px auto 0' }} />
        </div>
      </div>
      <div style={{ fontFamily: font.serif, fontSize: 12, fontStyle: 'italic', color: color.gray3, marginBottom: 24 }}>
        Drag the marker to place yourself. Smil sits deliberately in the middle — neither doom nor rapture.
      </div>

      {/* the three voices */}
      <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${color.rule}`, background: color.rule, gap: 1 }}>
        {[
          { who: 'Doomers say', tone: '#E3120B', bg: '#fff', fg: color.gray1, text: 'Population growth, resource depletion, and climate change will trigger civilisational collapse within decades.' },
          { who: 'Utopians say', tone: '#4A6A9A', bg: '#fff', fg: color.gray1, text: 'AI, fusion energy, and bioengineering will solve all our problems. Limitless abundance is just around the corner.' },
          { who: 'Smil says', tone: '#E3120B', bg: '#121212', fg: '#CCC', text: 'I am neither a pessimist nor an optimist. I am a scientist trying to explain how the world really works.' },
        ].map((row) => (
          <div key={row.who} style={{ background: row.bg, padding: '16px 20px', display: 'flex', gap: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: row.tone, flexShrink: 0, width: 78, paddingTop: 3 }}>{row.who}</div>
            <div style={{ fontFamily: font.serif, fontSize: 13, fontStyle: 'italic', color: row.fg, lineHeight: 1.65 }}>“{row.text}”</div>
          </div>
        ))}
      </div>
    </div>
  );
}
