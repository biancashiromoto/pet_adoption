import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import PatientForm from './pages/PatientForm'

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
      </Switch>
    </div>
  )
}

export default App
