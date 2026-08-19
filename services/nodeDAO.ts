import type { CreateNodeInput, Node, UpdateNodeInput } from "./node";

export type { CreateNodeInput, Node, NodeType, UpdateNodeInput } from "./node";

export { InMemoryNodeDAO } from "./inMemoryNodeDAO";

export interface NodeDAO {
    create(input: CreateNodeInput): Promise<Node>;
    getById(id: string): Promise<Node | undefined>;
    list(): Promise<Node[]>;
    update(id: string, input: UpdateNodeInput): Promise<Node>;
    delete(id: string): Promise<void>;
}
