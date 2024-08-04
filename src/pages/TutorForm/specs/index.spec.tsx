import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TutorForm from "..";
import { MemoryRouter } from "react-router-dom";

const mockHistoryPush = vi.fn();
const mockUnblock = vi.fn();

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useHistory: () => ({
      push: mockHistoryPush,
      block: vi.fn(() => mockUnblock),
    }),
  };
});

vi.mock('../../hooks/useNavigationBlocker', () => ({
  useNavigationBlocker: () => ({
    showModal: false,
    setShowModal: vi.fn(),
    handleDirectNavigation: mockHistoryPush,
    handleCancelNavigation: vi.fn(),
  }),
}));

describe("TutorForm page", () => {
  beforeEach(() => cleanup())
  it("should be correctly rendered", () => {
    const { getAllByRole, getByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    expect(getByRole('heading').innerHTML).toMatch(/tutorform/i);
    expect(getAllByRole('button')[0].innerHTML).toMatch(/patient/i);
    expect(getAllByRole('button')[1].innerHTML).toMatch(/save and go back to home/i);
  });

  it("should correctly handle click on Patient button", async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TutorForm />
      </MemoryRouter>
    );

    act(() => fireEvent.click(getByRole('button', { name: /patient/i })));
    expect(mockHistoryPush).toHaveBeenCalledWith('/patient');
  });
});