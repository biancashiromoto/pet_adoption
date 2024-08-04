import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";

const PatientForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleCancelNavigation,
    handleDirectNavigation,
  } = useNavigationBlocker(hasChanged);

  return (
    <div>
      <h2>PatientForm</h2>
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
        Home
      </button>
      <form>
        <label htmlFor='patient__input--name'>
          Name: 
          <input
            onChange={() => setHasChanged(true)}
            title='patient__input--name'
            type='text'
          />
        </label>
        <label htmlFor='patient__input--species'>
          Species: 
          <select
            onChange={() => setHasChanged(true)}
            title="patient__input--species"
          >
            <option>Canine</option>
            <option>Feline</option>
            <option>Bird</option>
            <option>Rodent</option>
            <option>Reptile</option>
          </select>
        </label>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleDirectNavigation("/tutor");
          }}
        >
          Save and go to tutor form
        </button>
      </form>
      {showModal && (
        <Modal.Root>
        <Modal.Title content='Are you sure?' />
        <Modal.Subtitle content='All unsaved information will be lost.' />
        <Modal.Buttons>
          <button onClick={() => handleDirectNavigation("/tutor")}>Yes, Leave</button>
          <button onClick={() => handleCancelNavigation()}>Cancel</button>
        </Modal.Buttons>
      </Modal.Root>
      )}
    </div>
  );
};

export default PatientForm;
