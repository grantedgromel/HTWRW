# anime.js — Animation Shortlist for *How the World Really Works*

> **What this is.** An evaluation of [anime.js](https://animejs.com) (v4) against HTWRW's
> existing visualizations, to decide *which animations are worth including*. Scored
> per-component with adopt / maybe / skip calls and copy-paste snippets for the wins.
>
> **Prepared overnight, 2026-06-26, on branch `claude/animejs-animations-review-yrusbp`.**
> Findings are grounded in (a) a full read of every component in `src/viz/` + `src/chapters/`,
> and (b) the **published `animejs@4.5.0` package source** — types, license, bundle — since
> `animejs.com` is blocked by this environment's egress policy (see "Sourcing" at the end).

---

## TL;DR

1. **`framer-motion` is dead weight.** It's a dependency in `package.json` but is **imported in zero files**. Either delete it or actually use it. (Quick win, independent of anime.js.)
2. **anime.js is a good fit, but narrowly.** It's **MIT-licensed**, framework-agnostic, tree-shakes well, and is *best-in-class at exactly the things this app does by hand*: SVG line-drawing, shape morphing, motion-along-a-path, and grid/center staggers. Adopt it **surgically**, not wholesale.
3. **Three clear wins** justify pulling it in: `CO2Curve`, `LineChart` (line-draw, replacing a fragile magic number), and `RiskLadder` (the reorder that's promised in the catalog but currently *teleports*).
4. **Most components should stay as-is.** Slider-driven viz (`EnergyScrubber`, `ContainerShip`, `EnergyMixSlider`) and the count-up hook are already correct and cheap — anime.js would add a dependency for no gain.
5. **Two net-new "delight" ideas** worth a look if we want the Instagram-reel energy: a **dot traveling the curve as it draws** (`svg.createMotionPath`) and **scroll-scrubbed** chart reveals (`onScroll({ sync })`) for a scrollytelling feel.

**Recommended first move at 9:30:** approve the three Tier-1 conversions, and I'll prototype `CO2Curve` end-to-end so you can see the win live before we commit to the rest.

---

## How animation works here today (the baseline anime.js has to beat)

All hand-rolled, no animation library actually in use:

| Mechanism | Where | Notes |
|---|---|---|
| `useInView` (IntersectionObserver) | `src/viz/hooks.ts` | Flips a bool when a viz scrolls into view; gates entrance animations. |
| CSS `transition` on width/height/opacity | most viz | Bars, beakers, gauges, tiles grow via inline-style transitions. |
| `useCountUp` (rAF + easeOutCubic) | `hooks.ts`, `Overview` | Hero stat count-ups. Small and correct. |
| CSS `@keyframes` | `global.css` | `fadeUp`, `barGrow`, `dropPour`. |
| Manual SVG `stroke-dashoffset` | `CO2Curve` | Line-draw via a **hardcoded `strokeDasharray={900}`** — see below. |
| `prefers-reduced-motion` | `global.css` (global) + `useCountUp` | **Respected today. Anything we add must honor it too** — anime.js does not do this automatically; we gate via the existing `useInView`/media-query pattern. |

**Takeaway:** the baseline is genuinely good. anime.js only earns its place where the hand-rolled approach is *fragile* (magic-number dash lengths) or *missing* (position/reorder animation, motion paths). It should not replace CSS transitions that already work.

---

## anime.js v4 — the capabilities that matter for charts

Verified from `animejs@4.5.0` source. Full catalog in the appendix; the relevant subset:

| Capability | API | Why it matters here |
|---|---|---|
| **SVG line-drawing** | `svg.createDrawable(sel)` → animate `draw: ['0 0','0 1']` | Computes path length automatically. Kills the `strokeDasharray={900}` magic number. |
| **Shape morphing** | `svg.morphTo('#target')` | line→area, bar→bar, stacked-segment transitions. |
| **Motion along a path** | `svg.createMotionPath('#path')` → `{translateX,translateY,rotate}` | A marker dot that rides the trend line as it draws. |
| **Stagger** | `stagger(v, { from:'center', grid:[c,r] })` | Best-in-class; replaces manual `0.06 * i` delay math; enables grid ripples. |
| **Scroll scrub/trigger** | `onScroll({ sync, enter, leave })` | Scrollytelling — scrub a chart's draw to scroll position. |
| **Spring easing** | `createSpring({ stiffness, damping, bounce })` | Physical settle on a beaker fill / tooltip pop. |
| **Text split** | `text.splitText(el, { chars:true })` + stagger | Headline char reveals. |
| **Value tween → repaint** | `animate({value}, { onUpdate })` | Tween any JS number and repaint d3/canvas — bridges into the existing chart math. |
| **React integration** | `createScope({ root }).add(...)` + `scope.revert()` in cleanup | Scopes selectors to the mounted subtree; one-call teardown. **The only correct way to wire it into React** (StrictMode-safe). |

**License:** MIT (`Copyright (c) 2025 Julian Garnier`) — confirmed in the shipped package. Safe for commercial use. (There was a v4-alpha period under a sponsor-gated license that worried the community; the current public npm release is MIT.)

**Bundle:** whole UMD bundle ≈ **40 KB gzipped**, but it's fully modular ESM with per-feature subpaths and clean tree-shaking — a viz using only `animate`, `svg`, `stagger`, `createScope` ships a fraction of that. (The "~10 KB" figure you'll see quoted is a tree-shaken subset, not the whole lib.)

---

## The verdict, per component

Scored **Impact** (visual/UX gain) × **Effort** (to convert) → **Call**. Sorted by priority.

### Tier 1 — adopt (worth including)

| Component | What changes | Impact | Effort | Call |
|---|---|---|---|---|
| **`CO2Curve`** | Replace hand-rolled `strokeDasharray={900}` + CSS transition with `svg.createDrawable` (auto length). Fixes a latent bug: the `900` is wrong for the actual path and breaks if the data/viewBox changes. | High | Low | **Adopt** |
| **`LineChart`** (Moore's Law, population growth) | Same `createDrawable` line-draw on entry; optional log/linear *morph* via `morphTo`. The flagship growth-curve component — biggest single payoff. | High | Med | **Adopt** |
| **`RiskLadder`** | Rows currently **teleport** when you toggle fear↔danger — only bar *widths* transition, positions snap. The catalog literally promises "watch them reorder." Animate the reorder (FLIP via `createLayout`, or measure-and-`animate` the `y` deltas). | High | Med | **Adopt** |

> These three are the answer to "which ones are worth including." The first fixes a real fragility; the other two deliver motion the design *already promised* but doesn't render.

### Tier 2 — maybe (only if we're already touching the file)

| Component | What anime.js would add | Verdict |
|---|---|---|
| **`AnimatedBars`** | `stagger(40, { from:'center' })` instead of manual `0.06 * i` delays; cleaner, and unlocks grid ripples for the heatmap-style uses. CSS already works fine. | Nice-to-have. Adopt **only** if we standardize staggers app-wide. |
| **`CementShock`** | Same stagger story; block-bars could `morphTo` between states. Current CSS reveal is solid. | Low urgency. |
| **`MaterialPillars`** | Width transition on metric toggle is already smooth; a `morphTo` between proportions is marginal polish. | Skip unless bored. |
| **`DieselBeaker`** | A `createSpring` settle on the fill would feel nice (liquid overshoot). Genuine micro-delight, tiny change. | Optional delight. |
| **`WarmingThermometer`** | Spring settle on the gauge fill, same as the beaker. | Optional delight. |
| **`Overview` / `EnergyScrubber` count-ups** | `utils`/object-tween could drive these, but `useCountUp` is 25 lines and correct. | **Keep the hook.** No reason to swap. |

### Tier 3 — skip (anime.js adds nothing)

- **Slider-driven, value-follows-input:** `EnergyScrubber`, `ContainerShip`, `EnergyMixSlider`, `ForecastSpectrum`. The output is a pure function of the slider; there's no animation to choreograph. A library here is dead weight.
- **Map viz:** `EnergyMap`, `SupplyMap`, `EuropeFoodMap` — these are `d3-geo` driven; animation belongs in the d3/SVG layer, not anime.js.
- **`AmazonMyth`, `ForecastCards`, `PropertyComparator`, `FeedRatio`, `EniacChip`, `ScaleZoom`, `DistanceEquivalent`, `Energiewende`** — simple state toggles; CSS transitions are the right tool.

---

## Two net-new ideas (not fixing anything — adding wow)

These don't map to an existing weakness; they're the "is there something here worth *adding*" answer. Hold for a design call.

1. **Marker rides the curve.** As `CO2Curve` / `LineChart` draws in, send a small dot along the path with `svg.createMotionPath` so the eye follows the line being drawn. Cheap, high charm, very "data-journalism motion."
2. **Scroll-scrubbed reveals.** Swap fire-once `useInView` triggers for `onScroll({ sync })` on the flagship charts so the curve *draws as you scroll* and reverses when you scroll back. This is the scrollytelling idiom (NYT/Pudding/Economist interactives). Bigger change, biggest "feel" upgrade — worth a prototype to judge whether it fits the calm Economist tone or fights it.

---

## Risks & decisions for the morning

- **Don't let two systems fight over one property.** anime.js writes inline styles imperatively; if React state or a CSS transition also drives the same property, they conflict. Rule: **one owner per animated property.** Migrating `CO2Curve` means the dash animation leaves CSS entirely.
- **`prefers-reduced-motion` is on us.** The global CSS rule won't catch JS-driven anime.js tweens. We gate every anime.js call behind the reduced-motion check (reuse the `prefersReducedMotion()` helper already in `hooks.ts`) and jump to the end state.
- **StrictMode double-mount.** Must use `createScope(...).revert()` in `useEffect` cleanup or dev-mode double-invokes leak RAF loops + inline styles.
- **One dependency, used in ~3 files.** 40 KB whole / far less tree-shaken — fine. But if we adopt it for only 3 components, **delete `framer-motion`** in the same PR so we don't carry two animation libs.

**Open questions I need you on:**
- (a) Scrollytelling scrub — yes/no for the flagship charts? (Tone call.)
- (b) Standardize *all* staggers on anime.js, or leave the CSS ones alone?
- (c) The Instagram reel (`reel/DXHHJQ6kgic`) you saved as reference is **login-gated — I can't open it.** Describe it or drop a screenshot and I'll fold its style into the plan.

---

## Suggested sequencing

1. **PR 1 (cleanup):** remove unused `framer-motion`. Zero-risk.
2. **PR 2 (proof):** add `animejs`, convert `CO2Curve` to `createDrawable` behind the reduced-motion gate. One file, demonstrates the pattern + the React wiring.
3. **PR 3:** `LineChart` + `RiskLadder` reorder, reusing the established pattern.
4. **Spike (optional):** one scroll-scrubbed chart to judge the scrollytelling feel before committing.

---

## Copy-paste starters (v4 API, verified)

**React wiring (the pattern for every conversion):**
```tsx
import { useEffect, useRef } from 'react';
import { createScope, type Scope } from 'animejs';
import { useInView } from './hooks';

function useAnimeScope(run: () => void, active: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);
  useEffect(() => {
    if (!active) return;
    scope.current = createScope({ root }).add(run);
    return () => scope.current?.revert(); // kills tweens + clears inline styles
  }, [active]);
  return root;
}
```

**`CO2Curve` line-draw (replaces `strokeDasharray={900}`):**
```tsx
import { animate, svg } from 'animejs';
// inside the scope's run(), with the <path> carrying className="co2-line":
const [line] = svg.createDrawable('.co2-line');
animate(line, { draw: ['0 0', '0 1'], duration: 2000, ease: 'inOut(3)' });
// reduced-motion: skip animate(), set draw to '0 1' immediately.
```

**`RiskLadder` reorder (FLIP):**
```tsx
import { animate } from 'animejs';
// measure each row's box before the sort, re-measure after, animate the delta:
animate('.risk-row', { y: [/* prevY - newY */, 0], duration: 450, ease: 'out(3)' });
// or, simpler, adopt createLayout() on the row container for automatic FLIP.
```

**Stagger (if `AnimatedBars` migrates):**
```tsx
import { animate, stagger } from 'animejs';
animate('.bar-fill', { scaleX: [0, 1], delay: stagger(40, { from: 'center' }) });
```

---

## Appendix — Sourcing & full capability catalog

**Sourcing note.** `animejs.com` (homepage, `/documentation/`, showcase) is **blocked by this
environment's egress policy** (proxy returns 403 for that host). Rather than guess from memory,
the evaluation is grounded in the **published `animejs@4.5.0` package on npm** (allowlisted):
its `LICENSE.md`, `README.md`, `package.json`, bundle files, and TypeScript `.d.ts` definitions.
Every API name, signature, and default below is verified from shipped source. **Not** verifiable
this way and therefore flagged: the site's curated showcase gallery and marketing bundle-badge
copy. Grab those from the live docs (or the `juliangarnier/anime` repo `examples/`) when an
unblocked network path is available.

**Full v4 module map:** `animate`, `createTimer`, `createTimeline`, `stagger`, `createAnimatable`,
`createDraggable`, `createScope`, `createSpring`/`spring`, `onScroll`, `svg.{createDrawable,morphTo,createMotionPath}`,
`text.{splitText,scrambleText}`, `createLayout` (FLIP, v4.5), `waapi.animate` (Web Animations API adapter),
`engine`, and a deep `utils.*` (math: `clamp/round/snap/lerp/wrap/mapRange/damp`; `random/shuffle/createSeededRandom`;
`get/set`). All tree-shakeable via per-feature subpath imports (`animejs/svg`, `animejs/timeline`, …).
</content>
</invoke>
