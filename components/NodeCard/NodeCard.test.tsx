import { render, screen } from "@testing-library/react";

import type { Node } from "@/types/node";

import { NodeCard } from "./NodeCard";

const node: Node = {
  id: "1",
  title: "Blade Runner",
  type: "movie",
  tags: ["sci-fi"],
  notes: "A rainy future classic.",
  createdAt: "2026-01-01T12:00:00.000Z",
};

describe("NodeCard", () => {
  it("renders node details and actions", () => {
    render(<NodeCard node={node} onDelete={jest.fn()} />);

    expect(screen.getByRole("link", { name: "Blade Runner" })).toHaveAttribute(
      "href",
      "/nodes/1",
    );
    expect(screen.getByText("movie")).toBeInTheDocument();
    expect(screen.getByText("sci-fi")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
