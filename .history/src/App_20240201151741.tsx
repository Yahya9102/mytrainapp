import React, { useEffect, useState } from "react"
import "./App.css"
import * as userService from "./service/userService"
import LoginForm from "./components/LoginForm"

import { User } from "./Types"
import AdminPage from "./pages/AdminPage"

function App() {
  const [userData, setUserData] = useState<Array<User>>([])
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
    if (token) {
      userService
        .getUsers()
        .then((data) => {
          setUserData(Array.isArray(data) ? data : [])
          setUsersLoaded(true)
        })
        .catch((error) => {
          console.error("Fel vid hämtning av användare:", error)
          setUserData([])
        })
    }
  }, [isAuthenticated])

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <AdminPage />
      ) : (
        <LoginForm
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  )
}

export default App
