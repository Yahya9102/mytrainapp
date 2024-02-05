import "./App.css"
import LoginForm from "./components/LoginForm"
import AdminPage from "./pages/AdminPage"
import Dashboard from "./pages/DashBoard"

function App() {
  return (
    <div className="container mt-5">
      <AdminPage />
      <Dashboard />
      <LoginForm />
    </div>
  )
}

export default App
