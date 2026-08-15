"use client";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { Textarea } from "@/components/Textarea/Textarea";
import { DEFAULT_NODE_TYPES } from "@/types/node";

interface NodeFormProps {
  title: string;
  type: string;
  customType: string;
  tagsInput: string;
  notes: string;
  isSubmitting: boolean;
  error: string | null;
  submitLabel: string;
  onTitleChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCustomTypeChange: (value: string) => void;
  onTagsInputChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

const TYPE_OPTIONS = [
  ...DEFAULT_NODE_TYPES.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  })),
  { value: "custom", label: "Custom" },
];

/**
 * Shared form for creating and editing nodes.
 */
export function NodeForm({
  title,
  type,
  customType,
  tagsInput,
  notes,
  isSubmitting,
  error,
  submitLabel,
  onTitleChange,
  onTypeChange,
  onCustomTypeChange,
  onTagsInputChange,
  onNotesChange,
  onSubmit,
  onCancel,
}: NodeFormProps) {
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Input
        label="Title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        required
      />

      <Select
        label="Type"
        options={TYPE_OPTIONS}
        value={type}
        onChange={(event) => onTypeChange(event.target.value)}
      />

      {type === "custom" ? (
        <Input
          label="Custom type"
          value={customType}
          onChange={(event) => onCustomTypeChange(event.target.value)}
          required
        />
      ) : null}

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(event) => onTagsInputChange(event.target.value)}
        placeholder="comma, separated, tags"
      />

      <Textarea
        label="Notes"
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        placeholder="Optional notes about this node"
      />

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
