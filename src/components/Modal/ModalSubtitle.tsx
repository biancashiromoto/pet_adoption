import { ReactElement } from 'react';

interface ModalSubtitleProps {
  className?: string;
  content: string;
}


const ModalSubtitle = ({
  className,
  content,
}: ModalSubtitleProps): ReactElement => {
  return (
    <p className={className}>{content}</p>
  )
}

export default ModalSubtitle;