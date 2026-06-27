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

## Status — implemented on this branch

The Tier-1 plan was executed and verified (typecheck + production build + a Playwright
smoke test of the reorder). What actually shipped, and one correction to the original
analysis:

- ✅ **Removed `framer-motion`** (was imported nowhere).
- ✅ **`CO2Curve` fixed *natively*** with `pathLength={1}` — **no library needed**. See the
  correction below: the robust line-draw pattern already lived in `LineChart`.
- ✅ **Added `animejs@^4` and used it for `RiskLadder`'s reorder** (FLIP) — the one component
  where a library genuinely earns its place. Reduced-motion–gated; verified the rows reorder
  with no runtime errors.
- ✅ **`CO2Curve` marker-on-the-curve** (one of the two "delight" ideas below) — a dot rides the
  line's growing tip as it draws, using `svg.createMotionPath` with the same 2000ms/cubic-bezier
  timing as the stroke-draw so it stays on the tip, then fades out at the final point. Behind a
  `SHOW_CURVE_MARKER` flag, reduced-motion–gated. Browser-verified (travels left→right, no errors).
  This is a *prototype for your eye* — easy to flip off if it's too much motion for the tone.
- ↩️ **Correction:** `LineChart` was listed below as a conversion target. **It is not** — it
  already draws its line the correct, robust way (`pathLength={1}`, `LineChart.tsx:164`). No
  change made. That same pattern is what now fixes `CO2Curve`.

So anime.js is included for **one** thing (the reorder). If that one use doesn't justify the
dependency for you, reverting is a single commit — the line-draw fixes don't depend on it.

---

## TL;DR

1. **`framer-motion` was dead weight.** A dependency in `package.json` imported in **zero files**. Removed.
2. **anime.js is a good fit, but narrowly.** It's **MIT-licensed**, framework-agnostic, tree-shakes well, and is *best-in-class at exactly the things this app does by hand*: SVG line-drawing, shape morphing, motion-along-a-path, and grid/center staggers. Adopt it **surgically**, not wholesale.
3. **The genuinely library-worthy win is `RiskLadder`'s reorder** — promised in the catalog ("watch them reorder") but currently *teleporting*. Pure CSS can't animate a data-driven reorder; this is the case for anime.js (FLIP). The line-draws (`CO2Curve`, `LineChart`) are better done natively with `pathLength={1}`.
4. **Most components should stay as-is.** Slider-driven viz (`EnergyScrubber`, `ContainerShip`, `EnergyMixSlider`) and the count-up hook are already correct and cheap — anime.js would add a dependency for no gain.
5. **Two net-new "delight" ideas** worth a look if we want the Instagram-reel energy: a **dot traveling the curve as it draws** (`svg.createMotionPath`) and **scroll-scrubbed** chart reveals (`onScroll({ sync })`) for a scrollytelling feel. **Not yet built** — these depend on your tone call + the reel.

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

### Tier 1 — done (worth including)

| Component | What changed | Library? | Status |
|---|---|---|---|
| **`CO2Curve`** | Replaced the hardcoded `strokeDasharray={900}` magic number with `pathLength={1}` + normalized dash — the path length is now self-describing and can't drift from the data/viewBox. | **No** — native SVG | ✅ shipped |
| **`RiskLadder`** | Rows used to **teleport** on the fear↔danger toggle (only bar *widths* transitioned). Now a FLIP animation slides each row from its old slot to its new one. Reduced-motion–gated; synchronous "invert" so there's no first-frame flash. | **Yes** — `animate()` | ✅ shipped |
| **`LineChart`** (Moore's Law, population) | *Already correct* — uses `pathLength={1}` line-draw (`LineChart.tsx:164`). Originally mis-listed here as a target. | — | ⏹️ no change |

> The reorder is the real "worth including" answer — it delivers motion the design *already
> promised*. The `CO2Curve` fix is a robustness win that, on closer reading, didn't need a
> library at all (the codebase already had the right native pattern).

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

1. **Marker rides the curve.** ✅ *Prototyped on `CO2Curve`* (see Status above). As the line draws in, a small dot rides the path tip via `svg.createMotionPath`. Cheap, high charm, very "data-journalism motion." Could extend to `LineChart` (Moore's Law / population) if you like it here.
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
