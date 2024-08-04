import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";
import Select from "../../components/Select";
import { useForm } from "../../hooks/useForm";
import { en } from "../../helpers/en";
import Input from "../../components/Input";

const Pet = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const species: string[] = [
    "",
    "Canine",
    "Feline",
  ]
  const {
    showModal,
    setShowModal, 
    handleCancelNavigation,
    handleDirectNavigation,
  } = useNavigationBlocker(hasChanged);
  const {
    form,
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
        <Input
          className="pet__input--name"
          dataTestId="pet__input--name"
          label={en.pet.name}
          title="pet__input--name"
          onChange={(e) => handleChange(e)}
          value={form.pet.name}
        />
        <Select
          dataTestId="pet__select--species"
          label={en.pet.species}
          title="pet__select--species"
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
          className="pet__modal"
          data-testid="pet__modal"
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
