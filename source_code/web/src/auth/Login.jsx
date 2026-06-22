import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('trackit_token', 'jwt-sim-' + Date.now());
      setMsg(<div className="brutalist-ok">Login OK — redirigiendo al dashboard...</div>);
    } else {
      setMsg(<div className="brutalist-alert">Credenciales inválidas</div>);
    }
  };

  return (
    <div className="brutalist-card">
      <h1 className="brutalist-title">TRACK IT</h1>
      <p style={{ fontWeight: 700, borderBottom: '4px solid #000', paddingBottom: '0.5rem' }}>INGRESO AL SISTEMA</p>
      <form onSubmit={handleSubmit} className="brutalist-form">
        <label className="brutalist-label">EMAIL</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="brutalist-input" required />
        <label className="brutalist-label">CONTRASEÑA</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="brutalist-input" required />
        <button type="submit" className="brutalist-btn">ENTRAR</button>
        {msg}
      </form>
    </div>
  );
}
