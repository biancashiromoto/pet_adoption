import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link
        to="/patient"
      >
        Register new patient
      </Link>
    </div>
  )
}

export default Home