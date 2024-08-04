import React from "react";

interface SelectProps {
  dataTestId: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  title: string;
}

const Select = ({
  dataTestId,
  label,
  onChange,
  options,
  title
}: SelectProps) => {
  return (
    <label htmlFor={title}>
      {label}
      <select data-testid={dataTestId} onChange={onChange} title={title}>
        {options.map((option, index) => (
          <option key={index} id={`${index}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
