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
                Användarvillkor för MTRE Välkommen till MTRE! Vi tillhandahåller
                en tjänst som syftar till att underlätta för resenärer i
                Mälardalen genom att tillhandahålla uppdaterad information om
                tågförseningar.
                <br />
                <br />
                Tjänsten är avsedd att användas som en guide för att hjälpa dig
                att navigera i dina resplaner.
                <br />
                <br />
                1. Accept av Villkor Genom att använda MTRE, godkänner du dessa
                användarvillkor. Om du inte godkänner villkoren, bör du inte
                använda vår tjänst.
                <br />
                <br />
                2. Tjänstens Natur och Användning Tjänsten är gratis och kräver
                ingen inloggning. För närvarande är tjänsten endast tillgänglig
                för resenärer inom Mälardalen. MTRE tillhandahåller information
                om tågförseningar baserat på tillgängliga data. Användarna
                uppmanas att använda informationen som en guide och alltid
                dubbelkolla tågtiderna från flera källor för att få de mest
                exakta uppdateringarna.
                <br />
                <br />
                3. Ansvarsfriskrivning Medan MTRE strävar efter att
                tillhandahålla korrekt och aktuell information, kan det finnas
                fall där information om tågförseningar kan skilja sig någon
                minut. Vi tar inget ansvar för eventuella felaktigheter i den
                tillhandahållna informationen eller för några förluster eller
                skador som uppstår som ett resultat av att förlita sig på denna
                information. MTRE är inte ansvarig för innehållet på externa
                webbplatser som kan länkas till från vår tjänst.
                <br />
                <br />
                4. Ändringar i Tjänsten och Villkoren MTRE förbehåller sig
                rätten att när som helst ändra eller avbryta tjänsten utan
                förvarning. Vi förbehåller oss även rätten att ändra dessa
                användarvillkor. Eventuella ändringar träder i kraft när de
                publiceras på vår webbplats.
                <br />
                <br />
                5. Integritetspraxis Eftersom tjänsten är gratis och inte kräver
                någon inloggning, samlar vi inte in personlig information från
                våra användare. Genom att använda MTRE accepterar du dessa
                villkor i sin helhet.
                <br />
                Kom ihåg att alltid dubbelkolla tågtiderna från pålitliga källor
                för att försäkra dig om att du har den mest exakta och
                uppdaterade informationen.
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
