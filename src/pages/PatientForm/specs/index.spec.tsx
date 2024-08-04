import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PatientForm from "../index";
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

describe("PatientForm page", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  })
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    expect(getByRole("heading").innerHTML).toMatch(/patientform/i);
    expect(getAllByRole("button")[0].innerHTML).toMatch(/home/i);
    expect(getAllByRole("button")[1].innerHTML).toMatch(/save and go to tutor form/i);
  });

  it("should correctly handle click on Home button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: /home/i })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/home");
  });

  it("should correctly handle click on 'Save and go to tutor form' button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole("button", { name: /Save and go to tutor form/i })));
    expect(mockHistoryPush).toHaveBeenCalledWith("/tutor");
  });

  it("should show modal after click on Home button if name input is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__input--name"), { target: { value: "Francisco" } }));
    act(() => fireEvent.click(getByRole("button", { name: /home/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /yes, leave/i })));
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/home");
    });
  });

  it("should show modal after click on Home button if species select is changed", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__input--species"), { target: { value: /feline/i } }));
    act(() => fireEvent.click(getByRole("button", { name: /home/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
  });

  it("should correctly handle click on modal's cancel button", async () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <MemoryRouter>
        <PatientForm />
      </MemoryRouter>
    );

    act(() => fireEvent.change(getByTestId("patient__input--species"), { target: { value: "feline" } }));
    act(() => fireEvent.click(getByRole("button", { name: /home/i })));
    await waitFor(() => {
      expect(queryByRole("heading", { name: /are you sure/i })).toBeInTheDocument();
    });
    act(() => fireEvent.click(getByRole("button", { name: /cancel/i })));
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });
});