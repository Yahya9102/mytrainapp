import React, { useState } from "react"
import { loginUser, logoutUser } from "../service/userService"

interface LoginFormProps {
  isAuthenticated: boolean // Define the prop
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> // Define the prop
}

function LoginForm({ isAuthenticated, setIsAuthenticated }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted", { username, password }) // Logga vid formulärsubmission
    try {
      await loginUser({ username, password })
      setIsAuthenticated(true)
      setError("")

      console.log(username, password)
    } catch (err) {
      console.error("Login error", err)
      setError("Fel vid inloggning")
    }
  }

  const handleLogout = () => {
    logoutUser() // Call the new logoutUser function
    setIsAuthenticated(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Logga In</button>
        {error && <p>{error}</p>}
      </form>
      {isAuthenticated ? (
        <div>
          <p>You are logged in as {username}</p>
          <button onClick={handleLogout}>Logga Ut</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>{/* ... rest of your login form */}</form>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginForm
