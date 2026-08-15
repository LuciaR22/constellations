export type NodeType =
  | "movie"
  | "book"
  | "album"
  | "song"
  | "dream"
  | "thought"
  | (string & {});

export interface Node {
  id: string;
  title: string;
  type: NodeType;
  tags: string[];
  notes?: string;
  createdAt: string;
}

export interface CreateNodeInput {
  title: string;
  type: NodeType;
  tags: string[];
  notes?: string;
}

export interface UpdateNodeInput {
  title?: string;
  type?: NodeType;
  tags?: string[];
  notes?: string;
}

export const DEFAULT_NODE_TYPES: NodeType[] = [
  "movie",
  "book",
  "album",
  "song",
  "dream",
  "thought",
];
