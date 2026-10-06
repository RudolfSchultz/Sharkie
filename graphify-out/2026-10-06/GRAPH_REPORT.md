# Graph Report - Sharkie  (2026-10-06)

## Corpus Check
- 13 files · ~2,480,289 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 90 nodes · 117 edges · 14 communities (0 shown, 12 thin omitted)
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
- HealthBar
- Level
- level1.js

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 26 edges
2. `HealthBar` - 11 edges
3. `World` - 9 edges
4. `Character` - 8 edges
5. `PufferFish` - 6 edges
6. `Endboss` - 5 edges
7. `Level` - 3 edges
8. `BackgroundObjects` - 2 edges
9. `keyboard` - 1 edges
10. `keyMap` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 12 thin omitted)

## Knowledge Gaps
- **5 isolated node(s):** `keyboard`, `keyMap`, `level1_backgroundImages`, `Keyboard`, `graphify`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 36 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MovableObject` connect `MovableObject` to `.getHitboxRect`, `.animated`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `keyboard`, `keyMap`, `level1_backgroundImages` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MovableObject` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._