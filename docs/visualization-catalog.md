# Visualization Catalog — *How the World Really Works*

The **"first cut"**: every striking statistic, comparison, and analogy in Vaclav
Smil's book that is a candidate for an interactive visualization, organized by
chapter. Two exhaustive passes over the source text (`HOW_TH~1.MD`, 9,040 lines)
surfaced **~320 candidate items**; this catalog curates the strongest of them,
notes the **source line(s)** in the book, proposes a **treatment**, and marks
what is **already built** in the React app (`src/`).

**Legend** — ✅ built · ★ shortlist (highest visual impact) · 📐 archetype

## Smil's recurring visualization archetypes
- **📐 Scale / orders-of-magnitude comparator** — billionaire vs. migrant (10 OOM); horse 750 W vs. jet 100 MW.
- **📐 Unit-conversion analogy** — diesel-per-loaf, adult-equivalent "phantom workers", tennis-courts of farmland.
- **📐 Log-scale growth timeline** — transistors, CO₂ ppm, energy per capita.
- **📐 Risk-per-hour ladder** — driving vs. flying vs. base-jumping vs. space debris.
- **📐 Composition / flow** — energy mix by year, the four material pillars, the oxygen cycle.
- **📐 Myth-busting before/after** — the Amazon "lungs", ocean microfibres.

---

## Overview
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Phantom-workers time machine | 0.05 → 34 GJ/person (1800→2020); 34 GJ ≈ 60 adults | 598–614 | ★ slider → figure army | ✅ `PhantomWorkers` |
| Orders-of-magnitude explorer | horse 750 W → jet 100 MW (130,000×); shrew→elephant 6 OOM; wealth 10 OOM | 8964–9039 | ★ 📐 selectable log span | ✅ `ScaleExplorer` |
| Hero count-ups | 84% fossil · 50% fed by ammonia · 700× energy | 144–153, 601–603 | count-up on scroll | ✅ `Overview` |

## 1 · Energy (lines 354–1525)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Energy mix over 220 yrs | biomass 98%→7%, fossils 2%→84% across 1800–2020 | 482–551 | ★ year-slider 100% stacked bar | ✅ `EnergyMixSlider` |
| Energy density ladder | wood 16 · coal 27 · diesel 46 GJ/t | 872–873 | 📐 hover comparator | ✅ `AnimatedBars` |
| Phantom workers by country | US 150 · JP 80 · CN 50 · world 34 GJ | 611–630 | unit-conversion army | ✅ `PhantomWorkers` |
| 700× useful energy | 1,500× total / ~700× useful since 1800 | 574–603 | ★ animated multiplier | partly (hero) |
| Capacity-factor reality | nuclear 90% vs offshore wind 45% vs solar 12–25% | 830–833 | radial gauges | backlog |
| Reserve lifetimes | coal ~120 yr, oil/gas ~50 yr | 1298–1299 | depletion countdown | backlog |
| Germany's Energiewende | capacity +73% (121→210 GW) yet output +5% | 1359–1367 | capacity-vs-output gap | backlog ★ |

## 2 · Food (lines 1526–2739)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Diesel embedded per food | tomato 660 · bread 400 · chicken 330 · shrimp 900 ml/kg | 1989–2199 | ★ click-to-expand + build-a-plate | ✅ `FoodDiesel` |
| Tomato's 3,745 km trip | 1,120 L diesel / 13 t load = 90 ml/kg | 2188–2192 | scrub-the-journey | ✅ `TomatoJourney` |
| Feed-conversion ratio | chicken 1.8 · pork 3 · beef 7 | 2036–2044 | grain-in→meat-out | ✅ `FeedRatio` |
| Malnutrition decline | 65% (1950) → 8.9% (2019) | 1608–1612 | falling-area timeline | backlog |
| Land per person | foraging 100 km² → farming 4,000 m² (6 tennis courts) | 1553–1582 | 📐 area analogy | backlog ★ |
| Almería greenhouse belt | 40,000 ha (20×20 km), ~3 Mt, 80% exported | 2176–2186 | satellite-scale tile | backlog |

## 3 · Materials (lines 2740–3837)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Four pillars | cement 4.5 Gt · steel 1.8 Gt · plastics 370 Mt · ammonia 150 Mt; ~25% of CO₂ | 2811–2849 | ★ proportional tiles, production↔CO₂ | ✅ `MaterialPillars` |
| China cement shock | 4.4 Gt in 2 yrs ≈ US 20th-century 4.56 Gt | 3687–3689 | ★ animated reveal | ✅ `CementShock` |
| Steel vs metals | tensile 7× Al; hardness 4× Al; melts 1,425 °C | 3268–3277 | metric-switch comparator | ✅ `PropertyComparator` |
| Plastics growth | 20 kt (1925) → 370 Mt (2019) | 3190–3192 | 📐 log curve | backlog |
| Concrete vs tensile | concrete 2–5 MPa vs steel 100+ MPa | 3580–3581 | strength gap | backlog |
| Future demand multiples | steel 15× · cement 10× · plastics 30× to lift the poor | 3764–3767 | scenario bars | backlog ★ |

## 4 · Globalization (lines 3838–5060)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Supplier concentration | gloves 70% · rare earths 60% · TSMC 54% · CN steel 56% | 5023–5027 | ★ hover bars | ✅ `AnimatedBars` |
| Container capacity | 226 (1968) → 23,756 (2019) TEU | 4439–4762 | log/linear line | ✅ `LineChart` |
| Moore's Law | 2,300 (1971) → 39.5 B (2019); 17.1 bn× | 4809–4835 | ★ 📐 log scatter | ✅ `LineChart` |
| Speed of trade | sail 4.7 → jet 900 km/h | 4060–4172 | acceleration bars | ✅ `AnimatedBars` |
| ENIAC vs a chip | 5 M× lighter, 40,000× less power, 500× faster | 4820–4825 | 📐 ratio trio | backlog ★ |
| Boeing 747 reach | carried 5.9 bn people ≈ 75% of humanity | 4507–4525 | cumulative counter | backlog |

## 5 · Risks (lines 5061–6425)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Risk-per-hour ladder | space debris 1e-12 → flying 2.8e-8 → driving 5e-7 → base-jump 4e-2 | 5712–6018 | ★ 📐 log ladder, filterable | ✅ `RiskLadder` |
| Fear vs. fact mortality | heart 1,700/M … terrorism 0.03/M | CDC/WHO | orders-of-magnitude bars | ✅ `AnimatedBars` |
| US vs Japan diet | fat +45%, sugar +70% | 5225–5238 | extra-per-year bars | ✅ `AnimatedBars` |
| Pandemic mortality | 1957 38 · 1968 28 · 2009 3 per 100k | 6197–6207 | timeline dots | backlog ★ |
| COVID age skew | 65+ = 81% of deaths; <35 = 0.1% | 6256–6260 | age pyramid | backlog |
| Solar-flare odds | 12% / decade (Carrington); $2–20 tn damage | 6170–6187 | probability dial | backlog |

## 6 · Environment (lines 6426–7958)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| CO₂ Keeling curve | 270 (pre-1800) → 420 ppm (2020) | 6905–7060 | ★ scrubbable line | ✅ `LineChart` |
| GHG potency | CH₄ 28–36× · N₂O 265–298× CO₂ | 6919–6937 | multiplier comparator | ✅ `AnimatedBars` |
| Decarbonisation by sector | electricity ~28% … aviation/shipping ~0% | IEA | "barely started" bars | ✅ `AnimatedBars` |
| Amazon "lungs" myth | net O₂ ≈ 0; burn all biomass = 0.1% of O₂ | 6550–6609 | ★ myth-buster toggle | ✅ `AmazonMyth` |
| Committed warming | already locked to ~2.3 °C | 7495–7507 | thermometer gauge | backlog ★ |
| China consumption | cars/100 households 0.34→40 (100×); A/C 400× | 7562–7576 | explosive growth | backlog |

## 7 · Futures (lines 7959–9040)
| Item | Figure | Lines | Treatment | Status |
|---|---|---|---|---|
| Apocalypse↔singularity | Smil sits in the middle | 8245–8252 | ★ draggable spectrum | ✅ `ForecastSpectrum` |
| Failed predictions | pop. "infinite" by 2026; peak oil; nuclear flight | 8130–8263 | ★ click-to-reveal reality | ✅ `FailedPredictions` |
| Population growth rate | peak 2.1% (late 1950s) → 1.08% (2019) | 8130–8159 | scrubbable curve | ✅ `LineChart` |
| Renewables vs fossils | new renewables ×50 yet fossils 87%→85% | 8409–8414 | substitution gap | backlog ★ |
| Climate cost break-even | net benefit only ~2080 | 8757–8765 | intergenerational timeline | backlog |

---

*Source: Vaclav Smil, How the World Really Works (Viking, 2022). Figures are the
book's stated values; charts are illustrative. Line numbers reference the source
text included in this repository. The structured machine-readable version of the
built visualizations lives in `data/visualizations.json` and `src/data/`.*
