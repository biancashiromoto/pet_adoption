import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
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
  });
  
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    expect(getByRole("heading").innerHTML).toMatch(en.pet.pageTitle);
    expect(getAllByRole("button")[0].innerHTML).toMatch(en.buttonLabels.goBack);
    expect(getAllByRole("button")[1].innerHTML).toMatch(en.buttonLabels.save);
  });

  it("should correctly handle click on Home button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should correctly handle click on 'Save' button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.save })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should show modal after click on Home button if name input is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__input--name"), { target: { value: "Francisco" } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /yes, leave/i })));
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show modal after click on Home button if species select is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__select--species"), { target: { value: /feline/i } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
  });

  it("should correctly handle click on modal's cancel button", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <Pet />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__select--species"), { target: { value: "feline" } }));
    act(() => fireEvent.click(getByRole("button", { name: en.buttonLabels.goBack })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /cancel/i })));
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});