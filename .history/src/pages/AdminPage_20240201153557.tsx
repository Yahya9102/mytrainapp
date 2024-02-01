import React, { useEffect, useState } from "react"

import * as userService from "../service/userService"
import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"
import { User } from "../Types"

function AdminPage() {
  const [userData, setUserData] = useState<Array<User>>([])
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")

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
        setGlobalUsername={setUsername}
      />
      <Navbar username={username} />

      <h2 className="text-center mb-4">Admin Panel</h2>

      {userData && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Användarnamn</th>
              <th>Lösenord</th>
              <th>Roll</th>
              <th>Account Non Expired</th>
              <th>Account Non Locked</th>
              <th>Credentials Non Expired</th>
              <th>Aktiverad</th>
              <th>Behörigheter</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{user.accountNonExpired ? "Ja" : "Nej"}</td>
                <td>{user.accountNonLocked ? "Ja" : "Nej"}</td>
                <td>{user.credentialsNonExpired ? "Ja" : "Nej"}</td>
                <td>{user.enabled ? "Ja" : "Nej"}</td>
                <td>
                  {user.authorities
                    .map(
                      (authority: { authority: string }) => authority.authority
                    )
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminPage
