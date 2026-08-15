"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useNode } from "@/app/nodes/_hooks/useNodes";
import { deleteNode } from "@/app/nodes/_services/nodesService";
import { Button } from "@/components/Button/Button";
import { TagList } from "@/components/TagList/TagList";
import { formatDate } from "@/lib/formatters";

/**
 * Detail page for a single node.
 */
export default function NodeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { node, isLoading, error } = useNode(params.id);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this node? This cannot be undone.");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteNode(params.id);
      router.push("/nodes");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete node",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted">Loading node...</p>;
  }

  if (error || !node) {
    return (
      <section className="flex flex-col gap-4">
        <Link href="/nodes" className="text-sm text-muted hover:text-foreground">
          ← Back to nodes
        </Link>
        <p className="text-sm text-danger">{error ?? "Node not found"}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <Link href="/nodes" className="text-sm text-muted hover:text-foreground">
        ← Back to nodes
      </Link>

      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {node.title}
            </h1>
            <p className="mt-1 capitalize text-sm text-muted">{node.type}</p>
          </div>
          <time className="text-sm text-muted">{formatDate(node.createdAt)}</time>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <h2 className="mb-2 text-sm font-medium text-foreground">Tags</h2>
            <TagList tags={node.tags} />
          </div>

          <div>
            <h2 className="mb-2 text-sm font-medium text-foreground">Notes</h2>
            <p className="text-sm text-muted">
              {node.notes ?? "No notes for this node."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/nodes/${node.id}/edit`}>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={() => void handleDelete()} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {deleteError ? <p className="text-sm text-danger">{deleteError}</p> : null}
    </section>
  );
}
