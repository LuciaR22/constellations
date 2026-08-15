import { NextResponse } from "next/server";

import { nodeDAO } from "@/services/nodes/nodeDAO";
import type { UpdateNodeInput } from "@/types/node";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Returns a single node by id.
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const node = await nodeDAO.findById(id);

    if (!node) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    return NextResponse.json(node);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch node";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Updates an existing node by id.
 */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as UpdateNodeInput;

    if (body.title !== undefined && !body.title.trim()) {
      return NextResponse.json(
        { error: "Title cannot be empty" },
        { status: 400 },
      );
    }

    if (body.type !== undefined && !body.type.trim()) {
      return NextResponse.json({ error: "Type cannot be empty" }, { status: 400 });
    }

    const node = await nodeDAO.update(id, {
      title: body.title,
      type: body.type,
      tags: Array.isArray(body.tags) ? body.tags : undefined,
      notes: body.notes,
    });

    return NextResponse.json(node);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update node";

    if (message.includes("not found")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Deletes a node by id.
 */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await nodeDAO.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete node";

    if (message.includes("not found")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
