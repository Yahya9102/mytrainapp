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
        */
