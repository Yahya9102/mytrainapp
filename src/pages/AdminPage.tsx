import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { User, AdminProps } from "../Types"
import * as userService from "../service/userService"

function AdminPage({ username, handleLogout }: AdminProps) {
  const [userData, setUserData] = useState<Array<User>>([])
  const [usersLoaded, setUsersLoaded] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <div className="container mt-5">
      <Navbar username={username} handleLogout={handleLogout} />
      {/* Resten av AdminPage-komponenten */}
    </div>
  )
}

export default AdminPage
