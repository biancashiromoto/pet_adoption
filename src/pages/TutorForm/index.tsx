import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";
import { useForm } from "../../hooks/useForm";

const TutorForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleDirectNavigation,
  } = useNavigationBlocker(hasChanged);
  const {
    handleChange,
  } = useForm(setHasChanged);

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
          htmlFor="tutor__input--first-name"
        >
          First name: 
          <input
            data-testid="tutor__input--first-name"
            onChange={(e) => handleChange(e)}
            required
            title="tutor__input--first-name"
            type="text"
          />
        </label>
        <label
          htmlFor="tutor__input--last-name"
        >
          Last name: 
          <input
            data-testid="tutor__input--last-name"
            onChange={(e) => handleChange(e)}
            title="tutor__input--last-name"
            type="text"
          />
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleDirectNavigation("/");
          }}
        >
          Save and go back to home
        </button>
      </form>
      {showModal && (
        <Modal.Root dataTestId="tutor__modal">
          <Modal.Title content="Are you sure?" />
          <Modal.Subtitle content="All unsaved information will be lost." />
          <Modal.Buttons
            hasChanged={hasChanged}
            className="tutor"
            lastLocation="/patient"
          />
        </Modal.Root>
      )}
    </div>
  )
}

export default TutorForm