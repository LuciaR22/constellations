import Link from "next/link";

import { formatDate } from "@/lib/formatters";
import type { Node } from "@/types/node";

import { TagList } from "@/components/TagList/TagList";

interface NodeCardProps {
  node: Node;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

/**
 * Summary card for a node in the list view.
 */
export function NodeCard({ node, onDelete, isDeleting = false }: NodeCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Link
            href={`/nodes/${node.id}`}
            className="text-lg font-medium text-foreground hover:text-primary"
          >
            {node.title}
          </Link>
          <span className="text-sm capitalize text-muted">{node.type}</span>
        </div>
        <time className="text-xs text-muted">{formatDate(node.createdAt)}</time>
      </div>

      <TagList tags={node.tags} />

      {node.notes ? (
        <p className="line-clamp-2 text-sm text-muted">{node.notes}</p>
      ) : null}

      <div className="flex gap-2">
        <Link
          href={`/nodes/${node.id}/edit`}
          className="rounded-lg bg-accent px-3 py-1.5 text-sm text-accent-foreground hover:opacity-90"
        >
          Edit
        </Link>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(node.id)}
            disabled={isDeleting}
            className="rounded-lg bg-danger px-3 py-1.5 text-sm text-danger-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
