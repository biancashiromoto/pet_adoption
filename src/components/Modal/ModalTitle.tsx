import { ReactElement } from 'react';

interface ModalTitleProps {
  className?: string;
  content: string;
}

const ModalTitle = ({
  className,
  content,
 }: ModalTitleProps): ReactElement => {
  return (
    <h2 className={className}>{content}</h2>
  )
}

export default ModalTitle;