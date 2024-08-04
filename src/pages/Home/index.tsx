import { Link } from 'react-router-dom'
import { en } from '../../helpers/en'

const Home = () => {
  return (
    <div>
      <h1>{en.home.title}</h1>
      <ul>
        <li>
          <Link
            to="/pet"
          >
            {en.home.registerNew}
          </Link>
        </li>
        <li>
          <Link
            to="/tutor"
          >
            {en.home.adoptAPet}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Home