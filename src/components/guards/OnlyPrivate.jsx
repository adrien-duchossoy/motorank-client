import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"


const OnlyPrivate = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) return children
    return <Navigate to="/login"/>
}


export default OnlyPrivate