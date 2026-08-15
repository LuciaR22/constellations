import { render, screen } from "@testing-library/react";

import { Input } from "./Input";

describe("Input", () => {
  it("renders a labeled input", () => {
    render(<Input label="Title" />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("shows validation error text", () => {
    render(<Input label="Title" error="Title is required" />);
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });
});
