import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"


const OnlyVerified = ({children}) => {
  const { isLoggedIn, loggedUserRole } = useContext(AuthContext)

  if (!isLoggedIn) return <Navigate to="/auth" />
  if (loggedUserRole !== "verified" && loggedUserRole !== "admin") return <Navigate to="/" />

  return children
}

export default OnlyVerified