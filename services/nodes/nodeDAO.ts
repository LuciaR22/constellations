import { promises as fs } from "fs";
import path from "path";

import type {
  CreateNodeInput,
  Node,
  UpdateNodeInput,
} from "@/types/node";

const DATA_FILE = path.join(process.cwd(), "data", "nodes.json");

export interface NodeDAO {
  findAll(): Promise<Node[]>;
  findById(id: string): Promise<Node | null>;
  create(input: CreateNodeInput): Promise<Node>;
  update(id: string, input: UpdateNodeInput): Promise<Node>;
  delete(id: string): Promise<void>;
}

/**
 * Reads all nodes from the JSON storage file.
 * Returns an empty array when the file is missing or empty.
 */
async function readNodes(): Promise<Node[]> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content) as Node[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persists the full node list to the JSON storage file.
 */
async function writeNodes(nodes: Node[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(nodes, null, 2), "utf-8");
}

/**
 * JSON file implementation of the NodeDAO interface.
 * Used as the storage layer until a database is introduced.
 */
export const nodeDAO: NodeDAO = {
  async findAll(): Promise<Node[]> {
    const nodes = await readNodes();
    return nodes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  async findById(id: string): Promise<Node | null> {
    const nodes = await readNodes();
    return nodes.find((node) => node.id === id) ?? null;
  },

  async create(input: CreateNodeInput): Promise<Node> {
    const nodes = await readNodes();
    const node: Node = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      type: input.type,
      tags: input.tags,
      notes: input.notes?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    nodes.push(node);
    await writeNodes(nodes);
    return node;
  },

  async update(id: string, input: UpdateNodeInput): Promise<Node> {
    const nodes = await readNodes();
    const index = nodes.findIndex((node) => node.id === id);

    if (index === -1) {
      throw new Error(`Node with id "${id}" was not found`);
    }

    const existing = nodes[index];
    const updated: Node = {
      ...existing,
      title: input.title?.trim() ?? existing.title,
      type: input.type ?? existing.type,
      tags: input.tags ?? existing.tags,
      notes:
        input.notes !== undefined
          ? input.notes.trim() || undefined
          : existing.notes,
    };

    nodes[index] = updated;
    await writeNodes(nodes);
    return updated;
  },

  async delete(id: string): Promise<void> {
    const nodes = await readNodes();
    const index = nodes.findIndex((node) => node.id === id);

    if (index === -1) {
      throw new Error(`Node with id "${id}" was not found`);
    }

    nodes.splice(index, 1);
    await writeNodes(nodes);
  },
};
