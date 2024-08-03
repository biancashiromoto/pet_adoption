import { useEffect, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom'

const TutorForm = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isGoingBack) {
      history.push("/home");
      setIsGoingBack(false);
    }
  }, [isGoingBack, history]);

  return (
    <div>
      <h1>TutorForm</h1>
      <div>
      <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsGoingBack(true);
          }}
        >
          Home
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
          onClick={(e) => {
            e.preventDefault();
            history.push("/home");
          }}
          type='submit'
        >
          Save
        </button>
      </form>
      <Prompt
        message={(location, action) => {
          if (action === 'POP') {
            console.log("Backing up...")
          }

          return (location.pathname.startsWith("/home") && !hasChanged)
            ? true
            : `Are you sure you want to leave? All changes will be lost`
        }}
      />
    </div>
  )
}

export default TutorForm