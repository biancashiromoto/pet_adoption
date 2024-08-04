import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "..";

describe("Button component", () => {
  const mockOnClick = vi.fn();
  const mockProps = {
    className: "button-className",
    label: "button-label",
    onClick: mockOnClick,
    icon: "icon.svg"
  }
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    render(
      <Button.Root
        className={mockProps.className}
        type="button"
        onClick={mockProps.onClick}
      >
        <Button.Label content={mockProps.label} />
        <Button.Icon src={mockProps.icon} />
      </Button.Root>
    )
  })
  it("should be correctly rendered", async () => {
    expect(screen.getByRole("button").textContent).toMatch(mockProps.label);
    expect(screen.getByRole("button").classList).toContain(mockProps.className);
  });

  it("should correctly handle click", async () => {
    act(() => fireEvent.click(screen.getByRole("button")));
    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    })
  })
}); 