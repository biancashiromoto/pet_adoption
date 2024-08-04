import { cleanup, render } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { Modal } from "..";
import { MemoryRouter } from "react-router-dom";

describe("Modal component", () => {
  const renderComponent = () => {
    cleanup();
    const {
      getAllByRole,
      getByRole,
    } = render (
      <MemoryRouter>
        <Modal.Root data-testid="data-testid">
          <Modal.Title content="title" />
          <Modal.Subtitle content="subtitle" />
          <Modal.Buttons
            hasChanged={true}
            className="tutor"
            lastLocation="/"
          />
        </Modal.Root>
      </MemoryRouter>
    );
    return { getAllByRole, getByRole };
  }
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = renderComponent();

    expect(getAllByRole('button').length).toEqual(2);
    expect(getByRole('heading').innerHTML).toMatch(/title/i);
    expect(getByRole('paragraph').innerHTML).toMatch(/subtitle/i);
    expect(getAllByRole('button')[0].innerHTML).toMatch(/yes, leave/i);
    expect(getAllByRole('button')[1].innerHTML).toMatch(/cancel/i);
  });
});