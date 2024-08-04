import { ReactNode } from 'react';

interface ModalButtonsProps {
  children: ReactNode;
  className?: string;
}

const ModalButtons = ({
  children,
  className,
}: ModalButtonsProps): ReactNode => {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  )
}

export default ModalButtons;