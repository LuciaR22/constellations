import type { CreateNodeInput, Node, UpdateNodeInput } from "./node";
import type { NodeDAO } from "./nodeDAO";
import { generateNodeId, validateNodeInput } from "./nodeValidation";

function cloneNode(node: Node): Node {
    return {
        ...node,
        tags: [...node.tags],
        createdAt: new Date(node.createdAt),
    };
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
