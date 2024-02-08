const Register = () => {
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Registrera Konto
                    </h2>
                    <form className="mb-4">
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="username">
                          Användarnamn
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Lösenord
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="confirm-password"
                          name="confirmPassword"
                          className="form-control form-control-lg"
                          required
                        />
                        <label
                          className="form-label"
                          htmlFor="confirm-password"
                        >
                          Bekräfta Lösenord
                        </label>
                      </div>
                      <div className="col-md-sm mb-3">
                        <label className="form-label" htmlFor="chosing-rolls">
                          Välj roll
                        </label>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Registrera
                      </button>
                    </form>
                    <p className="mb-0">
                      Har du redan ett konto?{" "}
                      <a href="/login" className="text-white-50 fw-bold">
                        Logga in här
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
