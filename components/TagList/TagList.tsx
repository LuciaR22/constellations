interface TagListProps {
  tags: string[];
}

/**
 * Displays a list of tags as compact chips.
 */
export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) {
    return <span className="text-sm text-muted">No tags</span>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
