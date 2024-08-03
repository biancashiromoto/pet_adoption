import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link
        to="/patient"
      >
        Patient
      </Link>
    </div>
  )
}

export default Home