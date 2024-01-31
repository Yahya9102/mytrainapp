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
  authorities: Array<{ authority: string }> // En array med objekt som har en authority-attribut
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
    <div className="App">
      {userData && (
        <div>
          <h2>Användardata:</h2>
          {userData.map((user, index) => (
            <li key={index}>
              <strong>Användarnamn:</strong> {user.username} <br />
              <strong>Lösenord:</strong> {user.password} <br />
              <strong>Roll:</strong> {user.role} <br />
              <strong>Account Non Expired:</strong>{" "}
              {user.accountNonExpired ? "Ja" : "Nej"} <br />
              <strong>Account Non Locked:</strong>{" "}
              {user.accountNonLocked ? "Ja" : "Nej"} <br />
              <strong>Credentials Non Expired:</strong>{" "}
              {user.credentialsNonExpired ? "Ja" : "Nej"} <br />
              <strong>Aktiverad:</strong> {user.enabled ? "Ja" : "Nej"} <br />
              <strong>Behörigheter:</strong>{" "}
              {user.authorities
                .map((authority: { authority: string }) => authority.authority)
                .join(", ")}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
