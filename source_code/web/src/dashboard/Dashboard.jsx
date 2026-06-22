import { useEffect, useState } from 'react';

const SIM = {
  activosTotales: 48,
  disponibles: 22,
  asignados: 19,
  enReparacion: 4,
  enTransito: 3,
  porRenovar: 7,
  stockBajo: 2,
  devolucionesPendientes: 3,
  solicitudesAbiertas: 5,
  onboardingsMes: 4,
  offboardingsMes: 2,
  alertas: [
    { id: 1, tipo: 'renovacion', texto: 'Notebook NB-012 vence en 15 días', nivel: 'media' },
    { id: 2, tipo: 'stock', texto: 'Stock bajo: Auriculares (1 unidad)', nivel: 'alta' },
    { id: 3, tipo: 'devolucion', texto: 'Monitor MN-007 pendiente de devolución (5 días)', nivel: 'alta' },
    { id: 4, tipo: 'renovacion', texto: 'Celular PH-003 vence en 30 días', nivel: 'baja' },
    { id: 5, tipo: 'envio', texto: 'Envío #18 retrasado (2 días)', nivel: 'media' }
  ],
  porTipo: [
    { tipo: 'Notebook', total: 18 },
    { tipo: 'Celular', total: 12 },
    { tipo: 'Monitor', total: 8 },
    { tipo: 'Auriculares', total: 6 },
    { tipo: 'Periféricos', total: 4 }
  ]
};

export default function Dashboard() {
  const [m, setM] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setM(SIM), 400);
    return () => clearTimeout(t);
  }, []);

  if (!m) return (
    <div className="brutalist-card">
      <h2 className="brutalist-title">DASHBOARD</h2>
      <p>Cargando métricas...</p>
    </div>
  );

  const maxTipo = Math.max(...m.porTipo.map(t => t.total));

  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      <div className="brutalist-card" style={{ maxWidth: 'none' }}>
        <h2 className="brutalist-title">DASHBOARD OPERATIVO</h2>
        <p style={{ fontSize: '0.75rem', marginBottom: '1.5rem' }}>
          Track IT — Métricas operativas
        </p>

        {/* Métricas generales */}
        <h3 style={{ borderTop: '4px solid #000', paddingTop: '0.5rem', marginTop: 0 }}>MÉTRICAS GENERALES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <Metric label="Activos totales" value={m.activosTotales} />
          <Metric label="Disponibles" value={m.disponibles} bg="#b6f5b6" />
          <Metric label="Asignados" value={m.asignados} bg="#fff3b6" />
          <Metric label="En reparación" value={m.enReparacion} bg="#ffd6b6" />
          <Metric label="En tránsito" value={m.enTransito} bg="#c6e0ff" />
        </div>

        {/* Alertas visuales */}
        <h3 style={{ borderTop: '4px solid #000', paddingTop: '0.5rem' }}>ALERTAS OPERATIVAS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <Metric label="Por renovar" value={m.porRenovar} bg="#ffd6b6" />
          <Metric label="Stock bajo" value={m.stockBajo} bg="#ff5a1f" color="#fff" />
          <Metric label="Devoluciones pend." value={m.devolucionesPendientes} bg="#ff5a1f" color="#fff" />
          <Metric label="Solicitudes abiertas" value={m.solicitudesAbiertas} bg="#fff3b6" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Lista de alertas */}
          <div>
            <h3 style={{ borderTop: '4px solid #000', paddingTop: '0.5rem' }}>LISTADO DE ALERTAS</h3>
            <ul className="brutalist-list">
              {m.alertas.map(a => (
                <li key={a.id} style={{
                  borderLeft: `8px solid ${a.nivel === 'alta' ? '#ff5a1f' : a.nivel === 'media' ? '#ffd6b6' : '#b6f5b6'}`,
                  paddingLeft: '0.8rem'
                }}>
                  <strong>[{a.tipo}]</strong> {a.texto}
                </li>
              ))}
            </ul>
          </div>

          {/* Gráfico de barras: activos por tipo */}
          <div>
            <h3 style={{ borderTop: '4px solid #000', paddingTop: '0.5rem' }}>ACTIVOS POR TIPO</h3>
            <div style={{ marginTop: '0.5rem' }}>
              {m.porTipo.map(t => (
                <div key={t.tipo} style={{ marginBottom: '0.6rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {t.tipo} — {t.total}
                  </div>
                  <div style={{ border: '3px solid #000', background: 'var(--bg)', height: '18px' }}>
                    <div style={{
                      height: '100%',
                      width: `${(t.total / maxTipo) * 100}%`,
                      background: '#000',
                      minWidth: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen RRHH */}
        <h3 style={{ borderTop: '4px solid #000', paddingTop: '0.5rem', marginTop: '1.5rem' }}>PROCESOS RRHH (MES ACTUAL)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          <Metric label="Onboardings" value={m.onboardingsMes} bg="#b6f5b6" />
          <Metric label="Offboardings" value={m.offboardingsMes} bg="#ffd6b6" />
        </div>

        <p style={{ fontSize: '0.7rem', marginTop: '1.5rem', borderTop: '2px solid #000', paddingTop: '0.5rem' }}>
          Datos actualizados automáticamente — Track IT
        </p>
      </div>
    </div>
  );
}

function Metric({ label, value, bg, color }) {
  return (
    <div style={{
      border: '3px solid #000',
      background: bg || '#fff',
      color: color || '#000',
      padding: '0.8rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.3rem' }}>
        {label}
      </div>
    </div>
  );
}
