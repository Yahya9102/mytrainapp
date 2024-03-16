import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)

  /*
    const isAuthenticated = Boolean(localStorage.getItem("token"))
  const navigate = useNavigate()
    const [username, setUsername] = useState("")
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserDetails = async () => {
        try {
          const userDetailsResponse = await getUserDetails()
          console.log(userDetailsResponse)
          setUsername(userDetailsResponse || "Gäst")
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

  */
  const toggleModal = () => setShowModal(!showModal)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/bgimg-removebg-preview.png"
              alt="Bilden kunde inte laddas"
              width={100}
            />
          </Link>

          <button onClick={toggleModal} className="btn btn-info">
            Visa Info
          </button>
        </div>
      </nav>

      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex={-1}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Info om tjänsten</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Den här tjänsten är till för att enkelt hitta tåg som har varit
                försenade under dagen och söka ersättning på respektive bolag.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

{
  /*


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

              , <span>{username}</span>
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
              
              
              */
}
