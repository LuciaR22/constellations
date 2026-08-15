"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useNodeForm } from "@/app/nodes/_hooks/useNodes";
import { NodeForm } from "@/components/NodeForm/NodeForm";

/**
 * Page for creating a new node.
 */
export default function NewNodePage() {
  const router = useRouter();

  const form = useNodeForm({
    onSuccess: (node) => {
      router.push(`/nodes/${node.id}`);
    },
  });

  return (
    <section className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <Link href="/nodes" className="text-sm text-muted hover:text-foreground">
          ← Back to nodes
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          New node
        </h1>
        <p className="text-sm text-muted">
          Add a work, dream, or thought to your constellation.
        </p>
      </div>

      <NodeForm
        title={form.title}
        type={form.type}
        customType={form.customType}
        tagsInput={form.tagsInput}
        notes={form.notes}
        isSubmitting={form.isSubmitting}
        error={form.error}
        submitLabel="Create node"
        onTitleChange={form.setTitle}
        onTypeChange={form.setType}
        onCustomTypeChange={form.setCustomType}
        onTagsInputChange={form.setTagsInput}
        onNotesChange={form.setNotes}
        onSubmit={() => void form.submit()}
        onCancel={() => router.push("/nodes")}
      />
    </section>
  );
}
