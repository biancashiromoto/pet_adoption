import { ReactElement } from 'react';

interface ModalSubtitleProps {
  content: string;
}

const ModalSubtitle = ({ content }: ModalSubtitleProps): ReactElement => {
  return (
    <span>{content}</span>
  )
}

export default ModalSubtitle;