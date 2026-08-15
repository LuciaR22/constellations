import { render, screen } from "@testing-library/react";

import { Select } from "./Select";

describe("Select", () => {
  it("renders options", () => {
    render(
      <Select
        label="Type"
        options={[
          { value: "movie", label: "Movie" },
          { value: "book", label: "Book" },
        ]}
      />,
    );

    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Movie" })).toBeInTheDocument();
  });
});
