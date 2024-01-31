import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import * as userService from "./service/userService"

// MOVE THIS TO USER.TS
interface User {
  username: string
  password: string
  role: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  authorities: Array<{ authority: string }>
}

function App() {
  const [userData, setUserData] = useState<Array<any>>([])

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUserData(data)
        console.log(data) // Logga resultatet i konsolen
      })
      .catch((error) => {
        console.error("Fel vid hämtning av användare:", error)
      })
  }, [])

  return (
    <div className="container mt-5">
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

export default App
