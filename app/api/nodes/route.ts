import { NextResponse } from "next/server";

import { nodeDAO } from "@/services/nodes/nodeDAO";
import type { CreateNodeInput } from "@/types/node";

/**
 * Returns all nodes sorted by creation date (newest first).
 */
export async function GET() {
  try {
    const nodes = await nodeDAO.findAll();
    return NextResponse.json(nodes);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch nodes";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Creates a new node from the request body.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateNodeInput;

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 },
      );
    }

    if (!body.type?.trim()) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    const node = await nodeDAO.create({
      title: body.title,
      type: body.type,
      tags: Array.isArray(body.tags) ? body.tags : [],
      notes: body.notes,
    });

    return NextResponse.json(node, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create node";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
