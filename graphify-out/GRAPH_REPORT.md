# Graph Report - Sharkie  (2026-09-20)

## Corpus Check
- 12 files · ~2,479,018 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 62 nodes · 67 edges · 11 communities (1 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c441f770`
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
- Level
- level1.js

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 13 edges
2. `World` - 8 edges
3. `Character` - 6 edges
4. `PufferFish` - 6 edges
5. `Endboss` - 5 edges
6. `BackgroundObjects` - 2 edges
7. `Level` - 2 edges
8. `keyboard` - 1 edges
9. `keyMap` - 1 edges
10. `level1_backgroundImages` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 10 thin omitted)

### Community 11 - "level1.js"
Cohesion: 0.50
Nodes (3): level1, level1_backgroundImages, level1_backgroundObjects

## Knowledge Gaps
- **7 isolated node(s):** `keyboard`, `keyMap`, `level1_backgroundImages`, `level1_backgroundObjects`, `level1` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 28 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `keyboard`, `keyMap`, `level1_backgroundImages` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._