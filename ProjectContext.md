# Constellations - Project Context

## What it is
Constellations is a personal media tracker that visualizes the "works" the
user consumes (TV shows, movies, songs, albums, dreams, thoughts, etc.) as a
network of interconnected nodes. Connections represent why those entries
resonate emotionally with one another.

## Stack
- Next.js (App Router)
- React (functional components + hooks)
- TypeScript
- Tailwind CSS
- Storage: for now, local files/JSON, using a DAO pattern so it can migrate
  to a real database later without rewriting business logic.

## Entity: Node

```typescript
type NodeType =
  | "movie"
  | "book"
  | "album"
  | "song"
  | "dream"
  | "thought"
  | (string & {}); // allows custom types without losing autocomplete

interface Node {
  id: string;        // uuid, primary key
  title: string;
  type: NodeType;
  tags: string[];
  notes?: string;
  createdAt: Date;
}
```

## Design decisions relevant to this CRUD
- `id` is auto-generated as the primary key (NOT name+author, to avoid
  collisions when two distinct entries share the same name/author).
- `type` is flexible (union type + escape hatch), not a strict enum.
- Storage sits behind a DAO pattern (e.g. `NodeDAO`) so the UI and business
  logic don't depend on whether storage is a JSON file or a database.
- No special uniqueness validations for now (to be defined later).

## Out of scope for this CRUD
- Connections between nodes (tag-based auto-connect, manual connections)
- Graph visualization
- Authentication / multi-user