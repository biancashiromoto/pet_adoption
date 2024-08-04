import { ReactNode } from 'react';
import { en } from '../../helpers/en';

interface ModalButtonsProps {
  handleDirectNavigation: (path: string) => void;
  handleCancelNavigation: () => void;
  previousLocation: string;
}

const ModalButtons = ({
  handleDirectNavigation,
  handleCancelNavigation,
  previousLocation
}: ModalButtonsProps): ReactNode => {
  return (
    <div>
      <button
        onClick={() => handleDirectNavigation(previousLocation)}
        type='button'
      >
        {en.buttonLabels.leave}
      </button>
      <button
        onClick={() => handleCancelNavigation()}
        type='button'
      >
        {en.buttonLabels.cancel}
      </button>
    </div>
  )
}

export default ModalButtons;