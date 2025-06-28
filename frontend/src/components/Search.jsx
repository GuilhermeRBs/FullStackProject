import { useState } from 'react';
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
  );
}