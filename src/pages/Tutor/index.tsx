import { useState } from "react";
import { useForm, useNavigationBlocker } from "../../hooks/index";
import { Modal } from "../../components/Modal";
import { en } from "../../helpers/en";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

const Tutor = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const {
    showModal,
    setShowModal,
    handleDirectNavigation,
    handleCancelNavigation,
  } = useNavigationBlocker(hasChanged);
  const {
    form,
    handleChange,
  } = useForm(setHasChanged);

  return (
    <div>
      <h1>{en.tutor.title}</h1>
      <p>{en.tutor.subtitle}</p>
      <div>
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
      </div>
      <form>
        <Input
          className="tutor__input--first-name"
          dataTestId="tutor__input--first-name"
          label={en.tutor.firstName}
          name="tutor.firstName"
          onChange={(e) => handleChange(e)}
          title="tutor__input--first-name"
          value={form.tutor.firstName}
        />
        <Input
          className="tutor__input--last-name"
          dataTestId="tutor__input--last-name"
          label={en.tutor.lastName}
           name="tutor.lastName"
          onChange={(e) => handleChange(e)}
          title="tutor__input--last-name"
          value={form.tutor.lastName}
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
        <Modal.Root dataTestId="tutor__modal">
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