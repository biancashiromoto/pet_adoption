import { ReactElement, ReactNode } from 'react';

interface ModalButtonsProps {
  children: ReactNode;
}

const ModalButtons = ({ children }: ModalButtonsProps): ReactElement => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ModalButtons;