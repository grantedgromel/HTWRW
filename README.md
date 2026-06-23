# How the World Really Works — an interactive visual companion

A data‑visualization web app that turns the vivid statistics and analogies in
**Vaclav Smil's _How the World Really Works_** (Viking, 2022) into fun, interactive
graphics. It follows the book's seven chapters — energy, food, materials,
globalisation, risk, the environment, and our likely futures — in the visual
language of _The Economist_'s **Graphic Detail**.

> Built from a Claude Design handoff and overhauled into a real React app.
> Figures are the book's stated values; charts are illustrative, not exact.

## Tech stack

- **React 18 + Vite + TypeScript**
- **d3-geo** + **world-atlas** (Natural Earth geometry) for the maps
- **d3-scale** for log/linear scales; bespoke hand-rolled SVG/CSS charts (no heavy chart lib)
- Google Fonts: Playfair Display, IBM Plex Sans, IBM Plex Serif

## Getting started

```bash
npm install
npm run dev        # start the dev server (Vite)
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

Then open the printed local URL. Chapters are navigable from the top tabs or via
hash routes (`#/0` overview … `#/7` futures).

## Project structure

```
index.html · vite.config.ts · tsconfig.json
src/
  main.tsx · App.tsx            # shell + chapter routing (hash-based)
  theme/                        # design tokens + global CSS (Economist palette, fonts)
  components/                   # Header/nav, StatStrip, PullQuote, KeyInsights,
                                # ChartFrame, ChapterShell, InteractiveCard
  viz/                          # the interactive visualizations (see below) + hooks
  data/                         # typed figures, sourced to lines in the book
docs/visualization-catalog.md   # the "first cut": ~320 to-be-visualized items by chapter
data/visualizations.json        # machine-readable index of the built visualizations
HOW_TH~1.MD                     # the source text the figures are drawn from
```

## The visualizations

| Chapter | Highlights |
|---|---|
| Overview | Count-up hero stats · **orders-of-magnitude log-zoom** |
| 1 · Energy | **Energy scrubber** (1800→2020, phantom workers) · **per-capita energy world map** · energy-mix time-slider · density ladder |
| 2 · Food | **Diesel-beaker** food picker · **Almería→Stockholm journey map** · feed-conversion ratios |
| 3 · Materials | Four-pillar tiles · **cement-shock** block bars · steel property comparator |
| 4 · Globalization | **Container-ship** size slider · **supply-concentration map** · Moore's Law · **ENIAC-vs-chip** |
| 5 · Risks | **Risk-per-hour ladder** (fear vs. danger) · fear-vs-fact mortality · diet gap |
| 6 · Environment | **CO₂ Keeling curve** · **committed-warming gauge** · GHG potency · **Energiewende** · Amazon myth-buster |
| 7 · Futures | **Forecast-reveal cards** · apocalypse↔singularity spectrum · population-growth curve |

## Data & sourcing

Every figure traces back to *How the World Really Works* (line references live in
`src/data/*` and `docs/visualization-catalog.md`), supplemented in a few places by
public datasets (IEA / Our World in Data energy balances, IPCC). Numbers are the
book's stated values rounded for clarity; the charts are designed to convey the
*order of magnitude and the story*, not to serve as a precise dataset.

## Credits

Visual language inspired by _The Economist_'s Graphic Detail. Source material:
Vaclav Smil, _How the World Really Works_ (Viking, 2022).
