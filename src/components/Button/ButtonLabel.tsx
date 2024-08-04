import { ReactNode } from 'react'

interface ButtonLabelProps {
  content: string;
}

const ButtonLabel = ({ content }: ButtonLabelProps): ReactNode => {
  return (
    <p>{content}</p>
  )
}

export default ButtonLabel;