import { ReactNode } from 'react';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { en } from '../../helpers/lang_en';

interface ModalButtonsProps {
  className?: string;
  hasChanged: boolean;
  lastLocation: string
}

const ModalButtons = ({
  hasChanged,
  lastLocation
}: ModalButtonsProps): ReactNode => {
  const {
    handleDirectNavigation,
    handleCancelNavigation,
  } = useNavigationBlocker(hasChanged);
  return (
    <div
      className={`modal--buttons`}
    >
      <button
        onClick={() => handleDirectNavigation(lastLocation)}
        type='button'
      >
        {en.buttonsActions.leave}
      </button>
      <button
        onClick={() => handleCancelNavigation()}
        type='button'
      >
        {en.buttonsActions.cancel}
      </button>
    </div>
  )
}

export default ModalButtons;