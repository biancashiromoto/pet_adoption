import { useState } from "react";
import { useNavigationBlocker } from "../../hooks/useNavigationBlocker";
import { Modal } from "../../components/Modal";
import Select from "../../components/Select";
import { useForm } from "../../hooks/useForm";
import { en } from "../../helpers/en";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

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
      <Button.Root
        className="pet__button--go-back"
        type="button"
        onClick={() => {
          if (hasChanged) {
            setShowModal(true);
          } else {
            handleDirectNavigation("/");
          }
        }}
      >
        <Button.Label content={en.buttonLabels.goBack} />
      </Button.Root>
      <form>
        <Input
          className="pet__input--name"
          dataTestId="pet__input--name"
          label={en.pet.name}
          name="pet.name"
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
        <Button.Root
          className="pet__button--save"
          type="submit"
          onClick={() => {
            handleDirectNavigation("/");
          }}
        >
          <Button.Label content={en.buttonLabels.save} />
        </Button.Root>
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
