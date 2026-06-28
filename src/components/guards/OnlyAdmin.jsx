import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

const OnlyAdmin = ({ children }) => {
  const { isLoggedIn, loggedUserRole } = useContext(AuthContext)

  if (!isLoggedIn) return <Navigate to='/auth' />
  if (loggedUserRole !== "admin") return <Navigate to='/' />

  return children
}

export default OnlyAdmin
