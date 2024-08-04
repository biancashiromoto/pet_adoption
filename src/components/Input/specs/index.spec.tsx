import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Input from "..";

describe("Input component", () => {
  it("should be correctly rendered", () => {
    const { getByTestId } = render(
      <Input
        className="test"
        dataTestId="input"
        label="label"
        name="name"
        onChange={vi.fn()}
        title="input"
        value=""
      />
    );

    expect(getByTestId("input").classList).toContain("input");
    expect(getByTestId("input").classList).toContain("test");
  });
}) 