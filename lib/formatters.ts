/**
 * Converts a comma-separated string into a normalized tag array.
 */
export function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Converts a tag array into a comma-separated string for form inputs.
 */
export function formatTagsForInput(tags: string[]): string {
  return tags.join(", ");
}

/**
 * Formats an ISO date string for display in the UI.
 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}
