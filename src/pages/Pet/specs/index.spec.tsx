import { act, cleanup, fireEvent, render, waitFor, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Pet from "../index";
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

describe("Pet page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    )
  });
  
  it("should be correctly rendered", () => {
    expect(screen.getByRole("heading").innerHTML).toMatch(en.pet.pageTitle);
    expect(screen.getAllByRole("button")[0].innerHTML).toMatch(en.buttonLabels.goBack);
    expect(screen.getAllByRole("button")[1].innerHTML).toMatch(en.buttonLabels.save);
  });

  it("should correctly handle click on Home button", () => {
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.goBack })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should correctly handle click on 'Save' button", () => {
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.save })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should show modal after click on Home button if name input is changed", async () => {
    act(() => fireEvent.change(screen.getByTestId("pet__input--name").children[0], { target: { value: "Francisco" } }));
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.leave })));
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show modal after click on Home button if species select is changed", async () => {
    act(() => fireEvent.change(screen.getByTestId("pet__select--species"), { target: { value: /feline/i } }));
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
  });

  it("should correctly handle click on modal's cancel button", async () => {
    act(() => fireEvent.change(screen.getByTestId("pet__select--species"), { target: { value: "feline" } }));
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: en.modal.leaveWithoutSaving.title })).toBeInTheDocument();
    });
    act(() => fireEvent.click(screen.getByRole("button", { name: en.buttonLabels.cancel })));
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});