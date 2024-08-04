import { cleanup, render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from 'vitest';
import TutorForm from "..";
import { MemoryRouter } from "react-router-dom";

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
});