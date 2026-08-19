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

export interface NodeDAO {
    create(input: CreateNodeInput): Promise<Node>;
    getById(id: string): Promise<Node | undefined>;
    list(): Promise<Node[]>;
    update(id: string, input: UpdateNodeInput): Promise<Node>;
    delete(id: string): Promise<void>;
}

function generateNodeId(): string {
    return `node_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

function cloneNode(node: Node): Node {
    return {
        ...node,
        tags: [...node.tags],
        createdAt: new Date(node.createdAt),
    };
}

function validateTags(tags: string[] | undefined, operation: "saved" | "updated"): string[] {
    if (!Array.isArray(tags) || tags.length === 0) {
        throw new Error(`Node could not be ${operation} because tags is empty.`);
    }

    const normalizedTags = tags.map(tag => tag.trim());

    if (normalizedTags.some(tag => tag.length === 0)) {
        throw new Error(`Node could not be ${operation} because tags contains an empty value.`);
    }

    return normalizedTags;
}

function validateNodeInput(input: CreateNodeInput, operation: "saved" | "updated"): void {
    if (!isNonEmptyString(input.title)) {
        if (operation === "saved") {
            throw new Error("Node could not be saved because the title field is empty.");
        }

        throw new Error("Node could not be updated because title is empty.");
    }

    if (!isNonEmptyString(input.type)) {
        throw new Error(`Node could not be ${operation} because type is empty.`);
    }

    if (!(input.createdAt instanceof Date) || Number.isNaN(input.createdAt.getTime())) {
        throw new Error(`Node could not be ${operation} because createdAt is empty.`);
    }

    validateTags(input.tags, operation);
}

export class InMemoryNodeDAO implements NodeDAO {
    private readonly nodes = new Map<string, Node>();

    async create(input: CreateNodeInput): Promise<Node> {
        validateNodeInput(input, "saved");

        const node: Node = {
            id: generateNodeId(),
            title: input.title.trim(),
            type: input.type,
            tags: input.tags.map(tag => tag.trim()),
            notes: input.notes?.trim() || undefined,
            createdAt: new Date(input.createdAt),
        };

        this.nodes.set(node.id, node);
        return cloneNode(node);
    }

    async getById(id: string): Promise<Node | undefined> {
        const node = this.nodes.get(id);
        return node ? cloneNode(node) : undefined;
    }

    async list(): Promise<Node[]> {
        return Array.from(this.nodes.values()).map(node => cloneNode(node));
    }

    async update(id: string, input: UpdateNodeInput): Promise<Node> {
        const existingNode = this.nodes.get(id);

        if (!existingNode) {
            throw new Error(`Node with id ${id} was not found.`);
        }

        const mergedNode: CreateNodeInput = {
            title: input.title ?? existingNode.title,
            type: input.type ?? existingNode.type,
            tags: input.tags ?? existingNode.tags,
            notes: input.notes ?? existingNode.notes,
            createdAt: input.createdAt ?? existingNode.createdAt,
        };

        validateNodeInput(mergedNode, "updated");

        const updatedNode: Node = {
            ...existingNode,
            title: mergedNode.title.trim(),
            type: mergedNode.type,
            tags: mergedNode.tags.map(tag => tag.trim()),
            notes: mergedNode.notes?.trim() || undefined,
            createdAt: new Date(mergedNode.createdAt),
        };

        this.nodes.set(id, updatedNode);
        return cloneNode(updatedNode);
    }

    async delete(id: string): Promise<void> {
        const deleted = this.nodes.delete(id);

        if (!deleted) {
            throw new Error(`Node with id ${id} was not found.`);
        }
    }
}
