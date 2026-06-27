import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { signup } from "../../services/auth.config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field"

const Signup = () => {
  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

  const [errorMessage, setErrorMessage] = useState(undefined)
  const [handleError, setHandleError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [displayNameError, setDisplayNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const handleDisplayName = (e) => {
    setDisplayName(e.target.value)
    setDisplayNameError(false)
    setErrorMessage(undefined)
  }

  const handleHandleUser = (e) => {
    setHandle(e.target.value)
    setHandleError(false)
    setErrorMessage(undefined)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError(false)
    setErrorMessage(undefined)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError(false)
    setErrorMessage(undefined)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordError(false)
    setErrorMessage(undefined)
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      setErrorMessage("Passwords do not match")
      return
    }

    const reqBody = { handle, email, password, displayName }

    signup(reqBody)
      .then((res) => {
        localStorage.setItem("authToken", res.data.authToken)
        authenticateUser()
        navigate("/")
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage
        const errorCode = error.response.data.errorCode
        setDisplayNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        setHandleError(false)

        if (errorCode === "AUTH_CREDENTIALS_REQUIRED") {
          setPasswordError(true)
          setEmailError(true)
          setErrorMessage(errorDescription)
        } else if (errorCode === "AUTH_PASSWORD_TOO_WEAK") {
          setPasswordError(true)
          setErrorMessage(errorDescription)
        } else if (errorCode === "AUTH_EMAIL_INVALID") {
          setEmailError(true)
          setErrorMessage(errorDescription)
        } else if (errorCode === "AUTH_HANDLE_INVALID") {
          setHandleError(true)
          setErrorMessage(errorDescription)
        } else if (errorCode === "AUTH_EMAIL_ALREADY_TAKEN") {
          setEmailError(true)
          setErrorMessage(errorDescription)
        } else if (errorCode === "AUTH_HANDLE_ALREADY_TAKEN") {
          setHandleError(true)
          setErrorMessage(errorDescription)
        }
      })
  }

  return (
    <form onSubmit={handleSignupSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Display Name</FieldLabel>
              <Input
                className={
                  displayNameError ? "border border-red-500" : "border"
                }
                type='text'
                name='displayName'
                id='displayName'
                value={displayName}
                onChange={handleDisplayName}
                autoComplete='off'
                aria-invalid={displayNameError}
              />
              {displayNameError && <FieldError>{errorMessage}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Username</FieldLabel>
              <div className='relative'>
                <span className='absolute inset-y-0 left-3 flex items-center text-muted-foreground select-none pointer-events-none'>
                  @
                </span>
                <Input
                  className={`pl-7 ${handleError ? "border border-red-500" : "border"}`}
                  type='text'
                  name='handle'
                  id='handle'
                  value={handle}
                  onChange={handleHandleUser}
                  autoComplete='off'
                  aria-invalid={handleError}
                />
              </div>
              {handleError && <FieldError>{errorMessage}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                className={emailError ? "border border-red-500" : "border"}
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={handleEmail}
                autoComplete='off'
                aria-invalid={emailError}
              />
              {emailError && <FieldError>{errorMessage}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                className={passwordError ? "border border-red-500" : "border"}
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

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                className={
                  confirmPasswordError ? "border border-red-500" : "border"
                }
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={handleConfirmPassword}
                autoComplete='off'
                aria-invalid={confirmPasswordError}
              />
              {confirmPasswordError && <FieldError>{errorMessage}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field>
          <Button type='submit'>Sign up</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default Signup
