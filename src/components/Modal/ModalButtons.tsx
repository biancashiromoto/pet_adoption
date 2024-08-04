import { ReactNode } from 'react';

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