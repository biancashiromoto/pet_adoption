import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TutorForm from "../index";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

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
        <TutorForm />
      </MemoryRouter>
    );

    expect(getByRole("heading").innerHTML).toMatch(/TutorForm/i);
    expect(getAllByRole("button")[0].innerHTML).toMatch(/Patient/i);
    expect(getAllByRole("button")[1].innerHTML).toMatch("Save and go back to home");
  });

  it("should correctly handle click on Patient button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: /patient/i })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/patient");
  });

  it("should correctly handle click on 'Save and go to tutor form' button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: /Save and go back to home/i })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should show modal after click on Patient button if name input is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--first-name"), { target: { value: "Francisco" } }));
    act(() => fireEvent.click(getByRole("button", { name: /Patient/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /yes, leave/i })));
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/patient");
    });
  });

  it("should show modal after click on Patient button if species select is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--first-name"), { target: { value: /jon/i } }));
    act(() => fireEvent.click(getByRole("button", { name: /patient/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
  });

  it("should correctly handle click on modal's cancel button", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("tutor__input--last-name"), { target: { value: /doe/i } }));
    act(() => fireEvent.click(getByRole("button", { name: /patient/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /cancel/i })));
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});