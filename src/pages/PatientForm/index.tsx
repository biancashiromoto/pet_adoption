import { Link } from "react-router-dom"

const PatientForm = () => {
  return (
    <div>
      <h2>PatientForm</h2>
      <Link
        to="/"
      >
        Home
      </Link>
      <form>
        <label
          htmlFor='patient__input--name'
        >
          Name: 
          <input
            title='patient__input--name'
            type='text'
          />
        </label>
        <label
          htmlFor='patient__input--species'
        >
          Species: 
          <select title="patient__input--species">
            <option>Canine</option>
            <option>Feline</option>
            <option>Bird</option>
            <option>Rodent</option>
            <option>Reptile</option>
          </select>
        </label>
      </form>
    </div>
  )
}

export default PatientForm