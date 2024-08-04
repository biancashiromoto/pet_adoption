import { useState } from 'react';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { Modal } from '../../components/Modal';

const TutorForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleDirectNavigation,
    handleCancelNavigation,
  } = useNavigationBlocker(hasChanged);

  return (
    <div>
      <h1>TutorForm</h1>
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (hasChanged) {
              setShowModal(true);
            } else {
              handleDirectNavigation("/patient");
            }
          }}
        >
          Patient
        </button>
      </div>
      <form>
        <label
          htmlFor='tutor__input--first-name'
        >
          First name: 
          <input
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
            onChange={() => setHasChanged(true)}
            title='tutor__input--last-name'
            type='text'
          />
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleDirectNavigation("/home");
          }}
        >
          Save and go back to home
        </button>
      </form>
      {showModal && (
        <Modal.Root dataTestId='tutor__modal'>
          <Modal.Title content='Are you sure?' />
          <Modal.Subtitle content='All unsaved information will be lost.' />
          <Modal.Buttons>
            <button onClick={() => handleDirectNavigation("/patient")}>Yes, Leave</button>
            <button onClick={() => handleCancelNavigation()}>Cancel</button>
          </Modal.Buttons>
        </Modal.Root>
      )}
    </div>
  )
}

export default TutorForm