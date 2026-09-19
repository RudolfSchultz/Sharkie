# Graph Report - Sharkie  (2026-09-20)

## Corpus Check
- 11 files · ~2,478,757 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 54 nodes · 58 edges · 12 communities (0 shown, 10 thin omitted)
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
2. `World` - 8 edges
3. `Character` - 6 edges
4. `PufferFish` - 6 edges
5. `BackgroundObjects` - 2 edges
6. `Level` - 2 edges
7. `keyboard` - 1 edges
8. `keyMap` - 1 edges
9. `level1` - 1 edges
10. `Keyboard` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (12 total, 10 thin omitted)

## Knowledge Gaps
- **5 isolated node(s):** `keyboard`, `keyMap`, `level1`, `Keyboard`, `graphify`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MovableObject` connect `MovableObject` to `.respawn`, `.animated`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `keyboard`, `keyMap`, `level1` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._