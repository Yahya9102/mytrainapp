import "./App.css"
import LoginForm from "./components/LoginForm"
import AdminPage from "./pages/AdminPage"
import { logoutUser } from "./service/userService"

function App() {
  return (
    <div className="container mt-5">
      <AdminPage />
      <LoginForm />
    </div>
  )
}

export default App
