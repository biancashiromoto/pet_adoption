import { ChangeEvent } from 'react';
import { Input as ShadCnInput } from '../../components/ui/input'

interface InputProps {
  className: string;
  dataTestId: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  title: string;
  value: string;
}

const Input = ({
  className,
  dataTestId,
  label,
  onChange,
  title,
  value
}: InputProps): React.ReactNode => {
  return (
    <label className={`${className} input`} data-testid={dataTestId}>
      {label}
      <ShadCnInput
        onChange={onChange}
        title={title}
        type="text"
        value={value}
      />
    </label>
  )
}

export default Input