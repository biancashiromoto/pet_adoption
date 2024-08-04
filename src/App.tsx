import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientForm from './pages/PatientForm'
import TutorForm from './pages/TutorForm'

function App() {

  return (
    <div>
      <h1>Vet form</h1>
      <Switch>
        <Route
          component={Home}
          exact
          path="/"
        />
        <Route
          component={PatientForm}
          path="/patient"
        />
        <Route
          component={TutorForm}
          path="/tutor"
        />
      </Switch>
    </div>
  )
}

export default App
