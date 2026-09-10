# Graph Report - javascript  (2026-09-10)

## Corpus Check
- Corpus is ~564 words - fits in a single context window. You may not need a graph.

## Summary
- 37 nodes · 38 edges · 7 communities (0 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- World & Game Loop
- MovableObject Base
- Character Class
- Game Bootstrap & Input
- PufferFish Enemy
- Background Objects
- Keyboard Input

## God Nodes (most connected - your core abstractions)
1. `World` - 9 edges
2. `MovableObject` - 8 edges
3. `Character` - 4 edges
4. `PufferFish` - 3 edges
5. `BackgroundObjects` - 2 edges
6. `keyboard` - 1 edges
7. `Keyboard` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 7 thin omitted)

## Knowledge Gaps
- **2 isolated node(s):** `keyboard`, `Keyboard`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 21 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `keyboard`, `Keyboard` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._