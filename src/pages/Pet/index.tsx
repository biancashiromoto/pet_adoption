import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";
import Select from "../../components/Select";
import { useForm } from "../../hooks/useForm";
import { en } from "../../helpers/en";

const Pet = () => {
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
      <h2>{en.pet.pageTitle}</h2>
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
      <form>
        <label htmlFor='patient__input--name'>
          {en.pet.name}
          <input
            data-testid="patient__input--name"
            onChange={() => setHasChanged(true)}
            title='patient__input--name'
            type='text'
          />
        </label>
        <Select
          dataTestId="patient__select--species"
          label={en.pet.species}
          title="patient__select--species"
          onChange={(e) => handleChange(e)}
          options={species}
        />
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
        <Modal.Root
          className="patient__modal"
          data-testid="patient__modal"
        >
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
  );
};

export default Pet;
