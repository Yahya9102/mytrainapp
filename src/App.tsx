import React, { useEffect, useState } from "react"
import "./App.css"
import LoginForm from "./components/LoginForm"
import AdminPage from "./pages/AdminPage"
import { logoutUser } from "./service/userService" // Importera logoutUser här om den används globalt

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUsername = localStorage.getItem("username")
    if (token) {
      setIsAuthenticated(true)
      setUsername(savedUsername || "Gäst")
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    setIsAuthenticated(false)
    setUsername("")
  }

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <AdminPage username={username} handleLogout={handleLogout} />
      ) : (
        <LoginForm
          setIsAuthenticated={setIsAuthenticated}
          setGlobalUsername={setUsername}
        />
      )}
    </div>
  )
}

export default App
