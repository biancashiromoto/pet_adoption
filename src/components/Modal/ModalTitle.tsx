import { ReactElement } from 'react';

interface ModalTitleProps {
  content: string;
}

const ModalTitle = ({ content }: ModalTitleProps): ReactElement => {
  return (
    <h2>{content}</h2>
  )
}

export default ModalTitle;