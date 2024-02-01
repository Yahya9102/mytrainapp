import React, { useState } from "react"
import { loginUser } from "../service/userService"

interface LoginFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setGlobalUsername: React.Dispatch<React.SetStateAction<string>>
}

function LoginForm({ setIsAuthenticated, setGlobalUsername }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await loginUser({ username, password })
      setIsAuthenticated(true)
      setGlobalUsername(username)
      setError("")
    } catch (err) {
      console.error("Login error", err)
      setError("Fel vid inloggning")
    }
  }

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card-body p-5 text-center">
                    <form
                      className="mb-md-5 mt-md-4 pb-5"
                      onSubmit={handleSubmit}
                    >
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>
                      <button
                        className="btn btn-outline-success btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                      <div>
                        <p className="mb-0">
                          Don't have an account?{" "}
                          <a href="#!" className="text-success-50 fw-bold">
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginForm
