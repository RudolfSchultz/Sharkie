# Graph Report - Sharkie  (2026-10-06)

## Corpus Check
- 13 files · ~2,480,114 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 90 nodes · 119 edges · 15 communities (1 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e946fdb3`
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
7. `BackgroundObjects` - 2 edges
8. `Level` - 2 edges
9. `keyboard` - 1 edges
10. `keyMap` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (15 total, 11 thin omitted)

### Community 11 - "level1.js"
Cohesion: 0.50
Nodes (3): level1, level1_backgroundImages, level1_backgroundObjects

## Knowledge Gaps
- **7 isolated node(s):** `keyboard`, `keyMap`, `level1_backgroundImages`, `level1_backgroundObjects`, `level1` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 34 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MovableObject` connect `MovableObject` to `.getHitboxRect`, `.respawn`, `.animated`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `keyboard`, `keyMap`, `level1_backgroundImages` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._