# Graph Report - Sharkie  (2026-09-20)

## Corpus Check
- 11 files · ~2,478,764 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 56 nodes · 61 edges · 10 communities (0 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b4538080`
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
- Level
- level1.js

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 13 edges
2. `World` - 9 edges
3. `Character` - 6 edges
4. `PufferFish` - 6 edges
5. `BackgroundObjects` - 2 edges
6. `Level` - 2 edges
7. `keyboard` - 1 edges
8. `keyMap` - 1 edges
9. `level1_backgroundObjects` - 1 edges
10. `level1_enemies` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 10 thin omitted)

## Knowledge Gaps
- **6 isolated node(s):** `keyboard`, `keyMap`, `level1_backgroundObjects`, `level1_enemies`, `Keyboard` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `keyboard`, `keyMap`, `level1_backgroundObjects` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._