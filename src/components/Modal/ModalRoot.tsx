import { ReactElement, ReactNode } from 'react';

interface ModalRootProps {
  children: ReactNode;
}

const ModalRoot = ({ children }: ModalRootProps): ReactElement => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ModalRoot;