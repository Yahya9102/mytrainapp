// App.tsx
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/DashBoard"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

/* Dashboard är nu tillgänglig för alla 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPage />} />



        
/*

import jwt_decode, { jwtDecode } from "jwt-decode"




axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")

  if (token) {
    // This ensures token is not null
    // Assuming jwtDecode is correctly imported as suggested fixes above
    const decodedToken: any = jwtDecode(token) // Use the correct import method for jwtDecode
    const currentTime = Date.now() / 1000

    if (decodedToken.exp < currentTime) {
      try {
        const response = await axios.post(baseURL + "renewToken")
        const newToken = response.data
        localStorage.setItem("token", newToken)
        config.headers.Authorization = `Bearer ${newToken}`
      } catch (error) {
        console.error("Token renewal error: ", error)
        // Additional error handling as needed
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

export async function getUserDetails() {
  try {
    const response = await axios.get(baseURL + "userdetails", {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function logoutUser() {
  try {
    await axios.get(baseURL + "logout")

    localStorage.removeItem("token")
  } catch (error) {
    throw error
  }
}
   headers: {
        trainInfo: "0f83f5c3-7be8-4e41-b54d-8588e9e57e82",
      },
*/
