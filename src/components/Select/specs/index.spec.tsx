import { render } from "@testing-library/react";
import { describe, expect } from "vitest";
import Select from "..";
import { MemoryRouter } from "react-router-dom";

describe("Select component" , () => {
  const species: string[] = [
    "Canine",
    "Feline",
    "Bird",
    "Rodent",
    "Reptile"
  ];

  it("should be correctly rendered", () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Select
          dataTestId="data-testid"
          label="species"
          options={species}
          title="title"
        />
      </MemoryRouter>
    );

    const options = getAllByRole('option');
    options.forEach((option, index) => {
      expect(option.textContent).toEqual(species[index]);
    });
  });
})