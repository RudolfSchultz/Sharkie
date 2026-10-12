# Graph Report - Sharkie  (2026-10-12)

## Corpus Check
- 23 files · ~2,489,136 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 192 nodes · 256 edges · 22 communities (2 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f35c5883`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MovableObject
- Sharkie – Status & Umsetzungsplan
- game.js
- PlayerHud
- World
- Character
- CLAUDE.md
- PufferFish
- Endboss
- JellyFish
- AnimatedBar
- level1.js
- BossBar
- Coin
- HudElement
- Level
- BackgroundObjects
- Barrier
- keyboard.class.js
- Bubble
- Geometry
- PoisonBottle

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 27 edges
2. `World` - 22 edges
3. `Character` - 15 edges
4. `PlayerHud` - 14 edges
5. `Sharkie – Status & Umsetzungsplan` - 13 edges
6. `AnimatedBar` - 11 edges
7. `Geometry` - 7 edges
8. `JellyFish` - 6 edges
9. `PufferFish` - 6 edges
10. `createLevel1()` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (22 total, 20 thin omitted)

### Community 1 - "Sharkie – Status & Umsetzungsplan"
Cohesion: 0.14
Nodes (13): A – Git & Struktur, B – Funktionalität & Design, C – Charakter, D – Gegner, E – Spielablauf, F – Sound, G – Landingpage, H – Responsive / Mobile (+5 more)

### Community 11 - "level1.js"
Cohesion: 0.33
Nodes (9): createLevel1(), createLevel1Barriers(), createLevel1Coins(), createLevel1EasyEnemies(), createLevel1Enemies(), createLevel1HardEnemies(), createLevel1PoisonBottles(), level1BackgroundImages (+1 more)

## Knowledge Gaps
- **19 isolated node(s):** `Reihenfolge der Umsetzung`, `A – Git & Struktur`, `B – Funktionalität & Design`, `C – Charakter`, `D – Gegner` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 70 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Reihenfolge der Umsetzung`, `A – Git & Struktur`, `B – Funktionalität & Design` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MovableObject` be split into smaller, more focused modules?**
  _Cohesion score 0.10582010582010581 - nodes in this community are weakly interconnected._
- **Should `Sharkie – Status & Umsetzungsplan` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._