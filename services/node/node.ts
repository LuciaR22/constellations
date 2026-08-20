export type NodeType = "movie" | "book" | "album" | "song" | "dream" | "thought" | (string & {});

export interface Node {
    id: string;
    title: string;
    type: NodeType;
    tags: string[];
    notes?: string;
    createdAt: Date;
}

export interface CreateNodeInput {
    title: string;
    type: NodeType;
    tags: string[];
    notes?: string;
    createdAt: Date;
}

export type UpdateNodeInput = Partial<CreateNodeInput>;
