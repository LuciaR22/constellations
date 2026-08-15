import type { CreateNodeInput, Node, UpdateNodeInput } from "@/types/node";

const NODES_API = "/api/nodes";

/**
 * Parses API error responses and throws with a meaningful message.
 */
async function parseError(response: Response): Promise<never> {
  const data = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  throw new Error(data?.error ?? `Request failed with status ${response.status}`);
}

/**
 * Fetches all nodes from the API.
 */
export async function fetchNodes(): Promise<Node[]> {
  const response = await fetch(NODES_API);

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<Node[]>;
}

/**
 * Fetches a single node by id from the API.
 */
export async function fetchNodeById(id: string): Promise<Node> {
  const response = await fetch(`${NODES_API}/${id}`);

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<Node>;
}

/**
 * Creates a new node via the API.
 */
export async function createNode(input: CreateNodeInput): Promise<Node> {
  const response = await fetch(NODES_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<Node>;
}

/**
 * Updates an existing node via the API.
 */
export async function updateNode(
  id: string,
  input: UpdateNodeInput,
): Promise<Node> {
  const response = await fetch(`${NODES_API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json() as Promise<Node>;
}

/**
 * Deletes a node via the API.
 */
export async function deleteNode(id: string): Promise<void> {
  const response = await fetch(`${NODES_API}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    await parseError(response);
  }
}
