import { useState } from 'react';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { Modal } from '../../components/Modal';
import { en } from '../../helpers/en';

const Tutor = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleDirectNavigation,
    handleCancelNavigation,
  } = useNavigationBlocker(hasChanged);

  return (
    <div>
      <h1>{en.tutor.title}</h1>
      <p>{en.tutor.subtitle}</p>
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (hasChanged) {
              setShowModal(true);
            } else {
              handleDirectNavigation("/");
            }
          }}
        >
          {en.buttonLabels.goBack}
        </button>
      </div>
      <form>
        <label
          htmlFor='tutor__input--first-name'
        >
          First name: 
          <input
            data-testid="tutor__input--first-name"
            onChange={() => setHasChanged(true)}
            required
            title='tutor__input--first-name'
            type='text'
          />
        </label>
        <label
          htmlFor='tutor__input--last-name'
        >
          Last name: 
          <input
            data-testid="tutor__input--last-name"
            onChange={() => setHasChanged(true)}
            title='tutor__input--last-name'
            type='text'
          />
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleDirectNavigation("/");
          }}
        >
          {en.buttonLabels.save}
        </button>
      </form>
      {showModal && (
        <Modal.Root dataTestId='tutor__modal'>
          <Modal.Title content={en.modal.leaveWithoutSaving.title} />
          <Modal.Subtitle content={en.modal.leaveWithoutSaving.subtitle} />
          <Modal.Buttons
            handleCancelNavigation={handleCancelNavigation}
            handleDirectNavigation={handleDirectNavigation}
            previousLocation="/"
          />
        </Modal.Root>
      )}
    </div>
  )
}

export default Tutor