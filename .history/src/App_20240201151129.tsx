import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import * as userService from "./service/userService"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import { User } from "./Types"

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
      <LoginForm
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Navbar />
    </div>
  )
}

export default App
