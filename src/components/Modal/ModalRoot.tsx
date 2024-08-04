import { ReactElement, ReactNode } from 'react';

interface ModalRootProps {
  children: ReactNode;
  className?: string
  dataTestId?: string;
}

const ModalRoot = ({
  children,
  className,
  dataTestId
}: ModalRootProps): ReactElement => {
  return (
    <div
      className={className}
      data-testid={dataTestId}
    >
      {children}
    </div>
  )
}

export default ModalRoot;