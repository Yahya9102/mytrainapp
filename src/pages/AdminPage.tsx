import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { getUsers } from "../service/userService"
import { User } from "../Types"

function AdminPage() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault()
    try {
      const gettingUserDetails = await getUsers()
      setUsers(gettingUserDetails)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container mt-5">
      <Navbar />

      <ul className="list-group">
        {users.map((item) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">Användarnamn: {item.username}</h5>
              <p className="mb-1">Roll: {item.role}</p>
            </div>
            <span className="badge bg-primary rounded-pill">
              {item.enabled} Aktiv konto
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPage
