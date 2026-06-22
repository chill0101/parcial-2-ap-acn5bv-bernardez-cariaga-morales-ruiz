import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from './auth/Login.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

export default function App() {
  return (
    <div>
      <nav className="brutalist-nav">
        <Link to="/" className="brutalist-brand">TRACK IT</Link>
        <NavLink to="/hu-01" className="brutalist-navlink"
                 style={({ isActive }) => isActive ? { background: '#000', color: '#fff' } : {}}>
          Login
        </NavLink>
        <NavLink to="/dashboard" className="brutalist-navlink"
                 style={({ isActive }) => isActive ? { background: '#000', color: '#fff' } : {}}>
          Dashboard
        </NavLink>
      </nav>
      <main className="brutalist-main">
        <Routes>
          <Route path="/" element={
            <div className="brutalist-card">
              <h1 className="brutalist-title">BIENVENIDO A TRACK IT</h1>
              <p>Gestión centralizada de activos IT para PyMEs</p>
            </div>
          } />
          <Route path="/hu-01" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
