# Graph Report - Sharkie  (2026-09-14)

## Corpus Check
- 9 files · ~2,478,685 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 49 nodes · 56 edges · 10 communities (0 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97ea7237`
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

## God Nodes (most connected - your core abstractions)
1. `MovableObject` - 13 edges
2. `World` - 9 edges
3. `PufferFish` - 6 edges
4. `Character` - 5 edges
5. `BackgroundObjects` - 2 edges
6. `Keyboard` - 1 edges
7. `keyboard` - 1 edges
8. `keyMap` - 1 edges
9. `graphify` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 8 thin omitted)

## Knowledge Gaps
- **4 isolated node(s):** `Keyboard`, `keyboard`, `keyMap`, `graphify`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 21 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MovableObject` connect `MovableObject` to `.respawn`, `.animated`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `Keyboard`, `keyboard`, `keyMap` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._