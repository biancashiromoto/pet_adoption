interface SelectProps {
  dataTestId: string;
  label: string;
  options: string[];
  title: string;
}

const Select = ({
  dataTestId,
  label,
  options,
  title
}: SelectProps) => {
  return (
    <label htmlFor={title}>
      {label}
      <select data-testid={dataTestId} title={title}>
        {options.map((option, index) => (
          <option id={`${index}-${option}`}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export default Select