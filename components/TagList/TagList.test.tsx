import { render, screen } from "@testing-library/react";

import { TagList } from "./TagList";

describe("TagList", () => {
  it("renders tags as chips", () => {
    render(<TagList tags={["sci-fi", "nostalgia"]} />);
    expect(screen.getByText("sci-fi")).toBeInTheDocument();
    expect(screen.getByText("nostalgia")).toBeInTheDocument();
  });

  it("shows fallback when there are no tags", () => {
    render(<TagList tags={[]} />);
    expect(screen.getByText("No tags")).toBeInTheDocument();
  });
});
