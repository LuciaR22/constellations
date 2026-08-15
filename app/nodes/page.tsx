"use client";

import Link from "next/link";
import { useState } from "react";

import { useNodes } from "@/app/nodes/_hooks/useNodes";
import { NodeCard } from "@/components/NodeCard/NodeCard";

/**
 * Lists all nodes with create and delete actions.
 */
export default function NodesPage() {
  const { nodes, isLoading, error, removeNode } = useNodes();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this node? This cannot be undone.");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await removeNode(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Nodes</h1>
          <p className="text-sm text-muted">
            Manage the works, dreams, and thoughts in your constellation.
          </p>
        </div>
        <Link
          href="/nodes/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          New node
        </Link>
      </div>

      {isLoading ? <p className="text-sm text-muted">Loading nodes...</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      {!isLoading && nodes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-foreground">No nodes yet.</p>
          <p className="mt-2 text-sm text-muted">
            Create your first node to start building your constellation.
          </p>
          <Link
            href="/nodes/new"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Create node
          </Link>
        </div>
      ) : null}

      <ul className="grid gap-4">
        {nodes.map((node) => (
          <li key={node.id}>
            <NodeCard
              node={node}
              onDelete={handleDelete}
              isDeleting={deletingId === node.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
