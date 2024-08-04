import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";
import Select from "../../components/Select";
import { useForm } from "../../hooks/useForm";

const PatientForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const species: string[] = [
    "",
    "Canine",
    "Feline",
    "Bird",
    "Rodent",
    "Reptile"
  ]
  const {
    showModal,
    setShowModal, 
    handleCancelNavigation,
    handleDirectNavigation,
  } = useNavigationBlocker(hasChanged);
  const {
    handleChange,
  } = useForm(setHasChanged);

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
            handleDirectNavigation("/");
          }
        }}
      >
        Home
      </button>
      <form>
        <label htmlFor='patient__input--name'>
          Name: 
          <input
            data-testid="patient__input--name"
            onChange={() => setHasChanged(true)}
            title='patient__input--name'
            type='text'
          />
        </label>
        <Select
          dataTestId="patient__select--species"
          label="Species: "
          title="patient__select--species"
          onChange={(e) => handleChange(e)}
          options={species}
        />
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
        <Modal.Root className="patient__modal" data-testid="patient__modal">
        <Modal.Title content='Are you sure?' />
        <Modal.Subtitle content='All unsaved information will be lost.' />
        <Modal.Buttons
          handleCancelNavigation={handleCancelNavigation}
          handleDirectNavigation={handleDirectNavigation}
          previousLocation="/"
        />
      </Modal.Root>
      )}
    </div>
  );
};

export default PatientForm;
