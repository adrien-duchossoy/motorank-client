import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { ThemeToggle } from './ThemeToggle'





const Navbar = () => {

  const navigate = useNavigate()

  const { authenticateUser, isLoggedIn } = useContext(AuthContext)

  const handleLogout = () => {
    // remove the token
    localStorage.removeItem("authToken")

    // updating global states
    authenticateUser()

    // navigating public page
    navigate("/login")
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {!isLoggedIn ? (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/private-page-example">Private Page Example</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;