import { ReactNode } from 'react'

interface ButtonRootProps {
  children?: ReactNode;
  className: string;
  onClick: () => void;
  type: "button" | "submit";
}

const ButtonRoot = ({
  children,
  className,
  onClick,
  type
}: ButtonRootProps): ReactNode => {
  return (
    <button
      className={`${className} button`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonRoot;