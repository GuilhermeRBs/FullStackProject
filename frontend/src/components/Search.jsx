import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './axios';
import DashboardCard from './DashboardCard';

export default function Search() {
  const [ip, setIp] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleSearch = async () => {
    setErro('');
    setResultado(null);
    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/search', { ip }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResultado(res.data.resultado);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao buscar IP');
    }
  };

  return (
    <>
      <div className="container-centralizado">
        <div className="form-box">
          <h2>Buscar IP</h2>
          <input
            type="text"
            placeholder="Digite um IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          {resultado && (
            <>
              <DashboardCard title="IP" value={resultado.ip} />
              <DashboardCard title="Cidade" value={resultado.cidade} />
              <DashboardCard title="Estado" value={resultado.estado} />
              <DashboardCard title="País" value={resultado.pais} />
            </>
          )}
        </div>
      </div>

      {/* Botão fixo para inserção manual */}
      <Link to="/insert" style={{
        position: 'fixed',
        bottom: '40px',
        right: '30px',
        textDecoration: 'none',
        display: 'inline-block',
        zIndex: 1000
      }}>
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: 500,
          opacity: 0.9,
          transition: 'opacity 0.3s',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.9}
        >
          Inserir IP
        </button>
      </Link>
    </>
  );
}