import { createContext, useEffect, useState } from "react";
import { verifyLogin } from "../services/auth.config"
import { myProfile } from "../services/user.config"

const AuthContext = createContext()

const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [loggedUserRole, setLoggedUserRole] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  async function authenticateUser() {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setIsAuthenticating(false)
      return
    }

    try {
      const response = await verifyLogin()
      const profile = await myProfile()
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setLoggedUserRole(profile.data.status)
      setIsAuthenticating(false)
    } catch {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setIsAuthenticating(false)
    }
  }

  const passedContext = { isLoggedIn, loggedUserId, authenticateUser, loggedUserRole }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { authenticateUser() }, [])

  if (isAuthenticating) {
    return <h3>... authenticating user</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthWrapper }
