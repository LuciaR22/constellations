import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NodeForm } from "./NodeForm";

describe("NodeForm", () => {
  it("submits through the provided handler", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <NodeForm
        title="Blade Runner"
        type="movie"
        customType=""
        tagsInput="sci-fi"
        notes=""
        isSubmitting={false}
        error={null}
        submitLabel="Create node"
        onTitleChange={jest.fn()}
        onTypeChange={jest.fn()}
        onCustomTypeChange={jest.fn()}
        onTagsInputChange={jest.fn()}
        onNotesChange={jest.fn()}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Create node" }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("shows custom type field when custom is selected", () => {
    render(
      <NodeForm
        title=""
        type="custom"
        customType=""
        tagsInput=""
        notes=""
        isSubmitting={false}
        error={null}
        submitLabel="Create node"
        onTitleChange={jest.fn()}
        onTypeChange={jest.fn()}
        onCustomTypeChange={jest.fn()}
        onTagsInputChange={jest.fn()}
        onNotesChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByLabelText("Custom type")).toBeInTheDocument();
  });
});
