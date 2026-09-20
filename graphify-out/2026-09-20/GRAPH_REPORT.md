# Graph Report - Sharkie  (2026-09-20)

## Corpus Check
- 12 files · ~2,478,977 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 60 nodes · 65 edges · 11 communities (0 shown, 11 thin omitted)
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
10. `level1` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 11 thin omitted)

## Knowledge Gaps
- **5 isolated node(s):** `keyboard`, `keyMap`, `level1`, `Keyboard`, `graphify`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 27 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `keyboard`, `keyMap`, `level1` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._