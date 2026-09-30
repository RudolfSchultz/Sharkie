# Graph Report - Sharkie  (2026-09-30)

## Corpus Check
- 12 files · ~2,479,066 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 64 nodes · 69 edges · 11 communities (1 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38ee5240`
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
1. `MovableObject` - 15 edges
2. `World` - 8 edges
3. `Character` - 6 edges
4. `PufferFish` - 6 edges
5. `Endboss` - 5 edges
6. `Level` - 2 edges
7. `BackgroundObjects` - 2 edges
8. `Keyboard` - 1 edges
9. `level1` - 1 edges
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
- **7 isolated node(s):** `Keyboard`, `level1`, `level1_backgroundImages`, `level1_backgroundObjects`, `keyboard` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 30 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Keyboard`, `level1`, `level1_backgroundImages` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._