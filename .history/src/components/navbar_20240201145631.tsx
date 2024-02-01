const Navbar = () => {
  return
  ;<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Försenade Tåg
        </a>
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
              Välkommen, <span>Username</span>!
            </span>
            <a className="nav-link" href="/delete-account">
              Radera konto
            </a>
            <a className="nav-link" href="/change-password">
              Ändra Lösenord
            </a>
            <form action="/perform_logout" method="post" className="d-flex">
              <button type="submit" className="btn btn-danger">
                Logga ut
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  </div>
}

export default Navbar
