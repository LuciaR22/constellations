"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useNode, useNodeForm } from "@/app/nodes/_hooks/useNodes";
import { NodeForm } from "@/components/NodeForm/NodeForm";
import type { Node } from "@/types/node";

interface EditNodeFormProps {
  node: Node;
}

/**
 * Form wrapper that mounts only after the node has loaded.
 */
function EditNodeForm({ node }: EditNodeFormProps) {
  const router = useRouter();

  const form = useNodeForm({
    initialNode: node,
    onSuccess: (updatedNode) => {
      router.push(`/nodes/${updatedNode.id}`);
    },
  });

  return (
    <NodeForm
      title={form.title}
      type={form.type}
      customType={form.customType}
      tagsInput={form.tagsInput}
      notes={form.notes}
      isSubmitting={form.isSubmitting}
      error={form.error}
      submitLabel="Save changes"
      onTitleChange={form.setTitle}
      onTypeChange={form.setType}
      onCustomTypeChange={form.setCustomType}
      onTagsInputChange={form.setTagsInput}
      onNotesChange={form.setNotes}
      onSubmit={() => void form.submit()}
      onCancel={() => router.push(`/nodes/${node.id}`)}
    />
  );
}

/**
 * Page for editing an existing node.
 */
export default function EditNodePage() {
  const params = useParams<{ id: string }>();
  const { node, isLoading, error } = useNode(params.id);

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
    <section className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <Link
          href={`/nodes/${node.id}`}
          className="text-sm text-muted hover:text-foreground"
        >
          ← Back to node
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          Edit node
        </h1>
        <p className="text-sm text-muted">Update details for {node.title}.</p>
      </div>

      <EditNodeForm node={node} />
    </section>
  );
}
