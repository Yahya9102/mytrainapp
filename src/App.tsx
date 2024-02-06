// App.tsx
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import AdminPage from "./pages/AdminPage"
import Dashboard from "./pages/DashBoard"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Dashboard är nu tillgänglig för alla */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
