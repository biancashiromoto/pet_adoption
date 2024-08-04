import { ReactNode } from 'react';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';

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
        Yes, Leave
      </button>
      <button
        onClick={() => handleCancelNavigation()}
        type='button'
      >
        Cancel
      </button>
    </div>
  )
}

export default ModalButtons;