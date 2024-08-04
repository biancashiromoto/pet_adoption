import { useState } from 'react';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';

const TutorForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleCancelNavigation,
    handleDirectNavigation,
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
              handleDirectNavigation("/home");
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
        <div>
          <h1>Are you sure you want to leave? All changes will be lost</h1>
          <button onClick={() => handleDirectNavigation("/home")}>Yes, Leave</button>
          <button onClick={() => handleCancelNavigation()}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default TutorForm