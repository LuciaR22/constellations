import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save node</Button>);
    expect(screen.getByRole("button", { name: "Save node" })).toBeInTheDocument();
  });

  it("applies the danger variant", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "bg-danger",
    );
  });
});
