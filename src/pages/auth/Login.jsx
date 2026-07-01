import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { login } from "../../services/auth.config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet
} from "@/components/ui/field"

const Login = () => {
  const [loginInput, setLoginInput] = useState("")
  const [password, setPassword] = useState("")
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
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError(false)
    setErrorMessage(undefined)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const reqBody = { login: loginInput, password }

    login(reqBody)
      .then(async (res) => {
        localStorage.setItem("authToken", res.data.authToken)
        await authenticateUser()
        navigate("/")
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage
        setLoginError(false)
        setPasswordError(false)

        if (
          errorDescription.includes("password") ||
          errorDescription.includes("Password")
        ) {
          setPasswordError(true)
          setErrorMessage("Your password does not match username")
        } else {
          setLoginError(true)
          setErrorMessage(
            "It looks like we don't know you, how about signing up?",
          )
        }
      })
  }

  return (

        <form onSubmit={handleLoginSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor='login'>Email or Username</FieldLabel>
                  <Input
                    className={loginError ? "border border-red-500" : "border"}
                    type='text'
                    name='login'
                    id='login'
                    value={loginInput}
                    onChange={handleLogin}
                    autoComplete='off'
                    aria-invalid={loginError}
                  />
                  {loginError && <FieldError>{errorMessage}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    className={
                      passwordError ? "border border-red-500" : "border"
                    }
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={handlePassword}
                    autoComplete='off'
                    aria-invalid={passwordError}
                  />
                  {passwordError && <FieldError>{errorMessage}</FieldError>}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field>
              <Button type='submit'>Log In</Button>
            </Field>
          </FieldGroup>
        </form>

  )
}

export default Login
