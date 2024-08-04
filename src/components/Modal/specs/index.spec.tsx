import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Modal } from "..";
import { en } from "../../../helpers/en";

describe("Modal component", () => {
  beforeEach(() => cleanup())
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = render(
      <Modal.Root data-testid="data-testid">
        <Modal.Title content="title" />
        <Modal.Subtitle content="subtitle" />
        <Modal.Buttons
          handleCancelNavigation={vi.fn()}
          handleDirectNavigation={vi.fn()}
          previousLocation="/"
        />
      </Modal.Root>
    );

    expect(getAllByRole('button').length).toEqual(2);
    expect(getByRole('heading').innerHTML).toMatch(/title/i);
    expect(getByRole('paragraph').innerHTML).toMatch(/subtitle/i);
    expect(getAllByRole('button')[0].innerHTML).toMatch(en.buttonLabels.leave);
    expect(getAllByRole('button')[1].innerHTML).toMatch(en.buttonLabels.cancel);
  });

  it("should correctly handle click on agree button", () => {
    const onClickAgreeMock: ReturnType<typeof vi.fn> = vi.fn();
    const { getAllByRole } = render(
      <Modal.Root data-testid="data-testid">
        <Modal.Title content="title" />
        <Modal.Buttons
          handleCancelNavigation={vi.fn()}
          handleDirectNavigation={onClickAgreeMock}
          previousLocation="/"
        />
      </Modal.Root>
    );
    act(() => fireEvent.click(getAllByRole('button')[0]));
    expect(onClickAgreeMock).toHaveBeenCalled();
  });

  it("should correctly handle click on cancel button", () => {
    const onClickCancelMock: ReturnType<typeof vi.fn> = vi.fn();
    const { getAllByRole } = render(
      <Modal.Root data-testid="data-testid">
        <Modal.Title content="title" />
        <Modal.Buttons
          handleCancelNavigation={onClickCancelMock}
          handleDirectNavigation={vi.fn()}
          previousLocation="/"
        />
      </Modal.Root>
    );
    act(() => fireEvent.click(getAllByRole('button')[1]));
    expect(onClickCancelMock).toHaveBeenCalled();
  });
});