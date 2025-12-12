import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <header className="header">
      <h1>GoGreen</h1>
      {isDashboard && <button onClick={() => navigate('/login')} className="logout-btn">Logout</button>}
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
