import { ReactNode } from 'react';
import { ReactSVG as SVG } from 'react-svg';

interface ButtonIconProps {
  src: string;
}

const ButtonIcon = ({ src }: ButtonIconProps): ReactNode => {
  return (
    <SVG src={src} />
  )
}

export default ButtonIcon;