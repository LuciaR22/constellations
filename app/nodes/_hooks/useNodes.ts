"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createNode,
  deleteNode,
  fetchNodeById,
  fetchNodes,
  updateNode,
} from "@/app/nodes/_services/nodesService";
import type { CreateNodeInput, Node, UpdateNodeInput } from "@/types/node";

interface UseNodesState {
  nodes: Node[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  removeNode: (id: string) => Promise<void>;
}

/**
 * Manages the nodes list state with fetch and delete operations.
 */
export function useNodes(): UseNodesState {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchNodes();
      setNodes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load nodes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeNode = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await deleteNode(id);
        setNodes((current) => current.filter((node) => node.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete node");
        throw err;
      }
    },
    [],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { nodes, isLoading, error, refresh, removeNode };
}

interface UseNodeState {
  node: Node | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Manages a single node fetch by id.
 */
export function useNode(id: string): UseNodeState {
  const [node, setNode] = useState<Node | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchNodeById(id);
      setNode(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load node");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { node, isLoading, error, refresh };
}

interface UseNodeFormOptions {
  initialNode?: Node;
  onSuccess: (node: Node) => void;
}

interface UseNodeFormState {
  title: string;
  type: string;
  customType: string;
  tagsInput: string;
  notes: string;
  isSubmitting: boolean;
  error: string | null;
  setTitle: (value: string) => void;
  setType: (value: string) => void;
  setCustomType: (value: string) => void;
  setTagsInput: (value: string) => void;
  setNotes: (value: string) => void;
  submit: () => Promise<void>;
}

/**
 * Manages create/edit form state and submission for a node.
 */
export function useNodeForm({
  initialNode,
  onSuccess,
}: UseNodeFormOptions): UseNodeFormState {
  const isCustomInitial =
    initialNode !== undefined &&
    !["movie", "book", "album", "song", "dream", "thought"].includes(
      initialNode.type,
    );

  const [title, setTitle] = useState(initialNode?.title ?? "");
  const [type, setType] = useState(
    isCustomInitial ? "custom" : (initialNode?.type ?? "movie"),
  );
  const [customType, setCustomType] = useState(
    isCustomInitial ? initialNode.type : "",
  );
  const [tagsInput, setTagsInput] = useState(
    initialNode?.tags.join(", ") ?? "",
  );
  const [notes, setNotes] = useState(initialNode?.notes ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    const resolvedType = type === "custom" ? customType.trim() : type;
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload: CreateNodeInput = {
      title: title.trim(),
      type: resolvedType,
      tags,
      notes: notes.trim() || undefined,
    };

    try {
      const node = initialNode
        ? await updateNode(initialNode.id, payload as UpdateNodeInput)
        : await createNode(payload);

      onSuccess(node);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save node");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    customType,
    initialNode,
    notes,
    onSuccess,
    tagsInput,
    title,
    type,
  ]);

  return {
    title,
    type,
    customType,
    tagsInput,
    notes,
    isSubmitting,
    error,
    setTitle,
    setType,
    setCustomType,
    setTagsInput,
    setNotes,
    submit,
  };
}
