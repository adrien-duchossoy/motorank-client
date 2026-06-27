import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { login } from '../../services/auth.config'


const Login = () => {

    const [loginInput, setLoginInput] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)

    const handleLogin = (e) => {
        setLoginInput(e.target.value)
        setLoginError(false)
        setPasswordError(false)
        setErrorMessage(undefined)
    }
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const reqBody = { login: loginInput, password }

        login(reqBody)
            .then((res) => {
                console.log("JWT token", res.data.authToken)

                localStorage.setItem("authToken", res.data.authToken)
                authenticateUser()
                navigate('/')

            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage
                setLoginError(false)
                setPasswordError(false)

                if (errorDescription.includes('password') || errorDescription.includes('Password')) {
                    setPasswordError(true)
                    setErrorMessage('Your password does not match username.')
                } else {
                    setLoginError(true)
                    setErrorMessage('This email or username does not exist. Please sign up first.')
                }
            })
    }



    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <h3>Login</h3>
                <label htmlFor='login'>Email</label>
                <input 
                    className={loginError ? 'border border-red-500' : 'border'}
                    type='text'
                    name='login'
                    id='login'
                    value={loginInput}
                    onChange={handleLogin}
                    autoComplete='off'
                />

                <label htmlFor="password">Password</label>
                <input 
                    className={passwordError ? 'border border-red-500' : 'border'}
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={handlePassword}
                    autoComplete='off'
                />

                <button
                    type='submit'
                >
                    Log In
                </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Link to={"/signup"}> Sign Up</Link>

        </div>
    )
}

export default Login