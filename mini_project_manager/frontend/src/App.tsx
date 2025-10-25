import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    setSignedIn(!!token);
    setUsername(user || "");
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setSignedIn(false);
    setUsername("");
    navigate('/auth');
  }

  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/">Dashboard</Link>
        </div>
        <div>
          {signedIn ? (
            <>
              {username && <span style={{ marginRight: 8 }}>Signed in as <strong>{username}</strong></span>}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login / Register</Link>
          )}
        </div>
      </nav>
      <main style={{ padding: 10 }}>
        <Routes>
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}
