# Graph Report - Sharkie  (2026-10-06)

## Corpus Check
- 16 files · ~2,480,912 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 107 nodes · 131 edges · 17 communities (0 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `55447f71`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- World
- MovableObject
- game.js
- Character
- PufferFish
- BackgroundObjects
- CLAUDE.md
- keyboard.class.js
- Endboss
- PlayerHud
- Level
- level1.js
- AnimatedBar
- BossBar
- HudElement

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 26 edges
2. `PlayerHud` - 12 edges
3. `World` - 10 edges
4. `Character` - 7 edges
5. `PufferFish` - 6 edges
6. `AnimatedBar` - 5 edges
7. `BossBar` - 5 edges
8. `Endboss` - 5 edges
9. `HudElement` - 3 edges
10. `Level` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (17 total, 15 thin omitted)

## Knowledge Gaps
- **5 isolated node(s):** `keyboard`, `keyMap`, `level1_backgroundImages`, `Keyboard`, `graphify`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 46 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MovableObject` connect `MovableObject` to `.getHitboxRect`, `.animated`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `keyboard`, `keyMap`, `level1_backgroundImages` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MovableObject` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._