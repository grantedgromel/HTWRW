import { useMemo, useRef, useState } from 'react';
import { scaleLinear, scaleLog } from 'd3-scale';
import { color, font } from '../theme/tokens';
import { useInView } from './hooks';

export interface LinePoint {
  x: number; // typically a year
  y: number;
  label?: string; // marker headline (e.g. ship / chip name)
  note?: string; // secondary detail
}

const W = 820;
const H = 300;
const M = { top: 20, right: 24, bottom: 34, left: 56 };

function interpolateY(points: LinePoint[], x: number): number {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  if (x <= sorted[0].x) return sorted[0].y;
  if (x >= sorted[sorted.length - 1].x) return sorted[sorted.length - 1].y;
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (x >= a.x && x <= b.x) {
      const t = (x - a.x) / (b.x - a.x);
      return a.y + t * (b.y - a.y);
    }
  }
  return sorted[sorted.length - 1].y;
}

export default function LineChart({
  data,
  yFormat = (v: number) => String(Math.round(v)),
  yTicksLog = false,
  allowLogToggle = false,
  defaultLog = false,
  area = false,
  scrub = false,
  unit = '',
  accent = color.red,
  annotation,
}: {
  data: LinePoint[];
  yFormat?: (v: number) => string;
  yTicksLog?: boolean;
  allowLogToggle?: boolean;
  defaultLog?: boolean;
  area?: boolean;
  scrub?: boolean;
  unit?: string;
  accent?: string;
  annotation?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const [log, setLog] = useState(defaultLog);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverMarker, setHoverMarker] = useState<number | null>(null);

  const sorted = useMemo(() => [...data].sort((a, b) => a.x - b.x), [data]);
  const xs = sorted.map((d) => d.x);
  const ys = sorted.map((d) => d.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);

  const x = scaleLinear().domain([xMin, xMax]).range([M.left, W - M.right]);

  const yMaxRaw = Math.max(...ys);
  const yMinRaw = Math.min(...ys);
  const y = log
    ? scaleLog().domain([Math.max(yMinRaw, 1), yMaxRaw]).range([H - M.bottom, M.top]).clamp(true)
    : scaleLinear().domain([0, yMaxRaw * 1.08]).range([H - M.bottom, M.top]);

  const path = sorted.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(d.x).toFixed(1)},${y(d.y).toFixed(1)}`).join(' ');
  const areaPath =
    `${path} L${x(xMax).toFixed(1)},${H - M.bottom} L${x(xMin).toFixed(1)},${H - M.bottom} Z`;

  // y gridlines / ticks
  const yTicks = log
    ? (y.domain() && (scaleLog().domain(y.domain() as [number, number]).ticks(5) as number[])).filter((t) => t > 0)
    : (y as ReturnType<typeof scaleLinear<number, number>>).ticks(5);

  const onMove = (e: React.PointerEvent) => {
    if (!scrub || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const year = Math.round(x.invert(Math.max(M.left, Math.min(W - M.right, px))));
    setHoverX(Math.max(xMin, Math.min(xMax, year)));
  };

  const scrubVal = hoverX !== null ? interpolateY(sorted, hoverX) : null;

  return (
    <div ref={ref}>
      {annotation && (
        <div style={{ marginBottom: 12 }}>
          <span className="tag">{annotation}</span>
        </div>
      )}
      {allowLogToggle && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {[
            { k: false, t: 'Linear' },
            { k: true, t: 'Log scale' },
          ].map((o) => (
            <button
              key={String(o.k)}
              className="focusable"
              onClick={() => setLog(o.k)}
              style={{
                border: `1px solid ${log === o.k ? accent : color.rule}`,
                background: log === o.k ? accent : color.white,
                color: log === o.k ? color.white : color.gray1,
                fontFamily: font.sans,
                fontSize: 11,
                fontWeight: 600,
                padding: '5px 12px',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {o.t}
            </button>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none' }}
        onPointerMove={onMove}
        onPointerLeave={() => setHoverX(null)}
      >
        {/* y gridlines */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke={color.rule} strokeWidth={1} />
            <text x={M.left - 8} y={y(t) + 4} textAnchor="end" fontFamily={font.sans} fontSize={11} fill={color.gray3}>
              {yFormat(t)}
            </text>
          </g>
        ))}
        {/* x labels */}
        {sorted.map((d) => (
          <text key={d.x} x={x(d.x)} y={H - M.bottom + 18} textAnchor="middle" fontFamily={font.sans} fontSize={11} fill={color.gray3}>
            {d.x}
          </text>
        ))}

        {area && (
          <path d={areaPath} fill={accent} opacity={0.08} style={{ opacity: inView ? 0.08 : 0, transition: 'opacity 1s .3s' }} />
        )}

        {/* animated line draw */}
        <path
          d={path}
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: 'stroke-dashoffset 1.4s ease',
          }}
        />

        {/* markers */}
        {sorted.map((d, i) => (
          <g key={d.x} onMouseEnter={() => setHoverMarker(i)} onMouseLeave={() => setHoverMarker(null)} style={{ cursor: 'pointer' }}>
            <circle cx={x(d.x)} cy={y(d.y)} r={14} fill="transparent" />
            <circle
              cx={x(d.x)}
              cy={y(d.y)}
              r={hoverMarker === i ? 6 : 4}
              fill={color.white}
              stroke={accent}
              strokeWidth={2.5}
              style={{ opacity: inView ? 1 : 0, transition: `opacity .4s ${0.6 + i * 0.08}s, r .15s` }}
            />
            {hoverMarker === i && d.label && (
              <g>
                <rect
                  x={Math.min(Math.max(x(d.x) - 80, 4), W - 164)}
                  y={Math.max(y(d.y) - 52, 4)}
                  width={160}
                  height={40}
                  fill={color.ink}
                  rx={2}
                />
                <text
                  x={Math.min(Math.max(x(d.x) - 80, 4), W - 164) + 10}
                  y={Math.max(y(d.y) - 52, 4) + 17}
                  fontFamily={font.sans}
                  fontSize={12}
                  fontWeight={700}
                  fill={color.white}
                >
                  {d.label}
                </text>
                <text
                  x={Math.min(Math.max(x(d.x) - 80, 4), W - 164) + 10}
                  y={Math.max(y(d.y) - 52, 4) + 32}
                  fontFamily={font.sans}
                  fontSize={11}
                  fill="#CCC"
                >
                  {d.note ?? `${yFormat(d.y)}${unit}`}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* scrubber */}
        {scrub && hoverX !== null && scrubVal !== null && (
          <g>
            <line x1={x(hoverX)} x2={x(hoverX)} y1={M.top} y2={H - M.bottom} stroke={color.ink} strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={x(hoverX)} cy={y(scrubVal)} r={5} fill={accent} stroke={color.white} strokeWidth={2} />
            <g>
              <rect x={Math.min(x(hoverX) + 8, W - 120)} y={y(scrubVal) - 30} width={112} height={38} fill={color.ink} rx={2} />
              <text x={Math.min(x(hoverX) + 8, W - 120) + 9} y={y(scrubVal) - 13} fontFamily={font.sans} fontSize={13} fontWeight={700} fill={color.white}>
                {yFormat(scrubVal)}{unit}
              </text>
              <text x={Math.min(x(hoverX) + 8, W - 120) + 9} y={y(scrubVal) + 1} fontFamily={font.sans} fontSize={11} fill="#CCC">
                {hoverX}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
