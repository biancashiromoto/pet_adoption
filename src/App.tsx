import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pet from './pages/Pet'
import Tutor from './pages/Tutor'
import { en } from './helpers/en'

function App() {

  return (
    <div>
      <h1>{en.app.title}</h1>
      <Switch>
        <Route
          component={Home}
          exact
          path="/"
        />
        <Route
          component={Pet}
          path="/pet"
        />
        <Route
          component={Tutor}
          path="/tutor"
        />
      </Switch>
    </div>
  )
}

export default App
