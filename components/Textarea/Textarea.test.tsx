import { render, screen } from "@testing-library/react";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a labeled textarea", () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
  });
});
