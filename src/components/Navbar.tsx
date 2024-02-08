import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserDetails, logoutUser } from "../service/userService"

const Navbar = () => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const isAuthenticated = Boolean(localStorage.getItem("token"))

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserDetails = async () => {
        try {
          const userDetailsResponse = await getUserDetails()
          console.log(userDetailsResponse)
          setUsername(userDetailsResponse || "Gäst") // Justera beroende på ditt API-svar
        } catch (error) {
          console.error("Error fetching user details:", error)
        }
      }

      fetchUserDetails()
    } else {
      setUsername("Gäst")
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      await logoutUser()
      localStorage.removeItem("token")
      navigate("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Försenade Tåg
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <span className="nav-item nav-link">
                Välkommen, <span>{username}</span>!
              </span>
              <Link className="navbar-brand" to="/admin">
                admin
              </Link>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn btn-danger">
                  Logga ut
                </button>
              ) : (
                <Link to="/login" className="btn btn-success">
                  Logga in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
