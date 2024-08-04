import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Tutor from "../index";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { en } from "../../../helpers/en";

const mockHistoryPush = vi.fn();
const mockUnblock = vi.fn();

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useHistory: () => ({
      push: mockHistoryPush,
      block: vi.fn(() => mockUnblock),
    }),
  };
});

vi.mock("../../hooks/useNavigationBlocker", () => ({
  useNavigationBlocker: () => ({
    showModal: false,
    setShowModal: vi.fn(),
    handleDirectNavigation: mockHistoryPush,
    handleCancelNavigation: vi.fn(),
  }),
}));

describe("TutorForm page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  })
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    expect(getByRole("heading").innerHTML).toMatch(en.tutor.title);
    expect(getByRole("paragraph").innerHTML).toMatch(en.tutor.subtitle);
    expect(getAllByRole("button")[0].innerHTML).toMatch(en.buttonLabels.goBack);
    expect(getAllByRole("button")[1].innerHTML).toMatch(en.buttonLabels.save);
  });

  it("should correctly handle click on Patient button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should correctly handle click on 'Save and go to tutor form' button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.save })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should show modal after click on Patient button if name input is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--first-name"), { target: { value: "Francisco" } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.leave })));
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show modal after click on Patient button if species select is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--first-name"), { target: { value: /jon/i } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
  });

  it("should correctly handle click on modal's cancel button", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Tutor />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--last-name"), { target: { value: /doe/i } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.cancel })));
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});