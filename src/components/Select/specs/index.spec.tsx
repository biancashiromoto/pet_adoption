import { render } from "@testing-library/react";
import { describe, expect } from "vitest";
import Select from "..";

describe("Select component" , () => {
  const species = [
    "Canine",
    "Feline",
    "Bird",
    "Rodent",
    "Reptile"
  ];

  it("should be correctly rendered", () => {
    const { getAllByRole } = render(
      <Select
        dataTestId="data-testid"
        label="species"
        options={species}
        title="title"
      />
    );

    const options = getAllByRole('option');
    options.forEach((option, index) => {
      expect(option.textContent).toEqual(species[index]);
    });
  });
})