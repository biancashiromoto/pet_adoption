import { useState } from "react";
import { Prompt, useHistory } from "react-router-dom"

const PatientForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const history = useHistory();
  return (
    <div>
      <h2>PatientForm</h2>
      <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            history.push("/home");
          }}
        >
          Home
        </button>
      <form>
        <label
          htmlFor='patient__input--name'
        >
          Name: 
          <input
            onChange={() => setHasChanged(true)}
            title='patient__input--name'
            type='text'
          />
        </label>
        <label
          htmlFor='patient__input--species'
        >
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
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            history.push("/tutor");
          }}
        >
          Save and go to tutor form
        </button>
      </form>
      <Prompt
        message={(location, action) => {
          if (action === 'POP') {
            console.log("Backing up...")
          }

          return ((location.pathname.startsWith("/tutor") && hasChanged) || (location.pathname.startsWith("/home") && !hasChanged))
            ? true
            : `Are you sure you want to leave? All changes will be lost`
        }}
      />
    </div>
  )
}

export default PatientForm