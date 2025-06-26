import { useState } from 'react';
import api from './axios';

export default function Search() {
  const [ip, setIp] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const buscarIp = async (e) => {
    e.preventDefault();
    setErro('');
    setResultado(null);

    if (!ip.trim()) {
      setErro('Informe um IP válido');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/search',
        { ip },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResultado(res.data);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao buscar IP');
    }
  };

  return (
    <div>
      <h2>Buscar IP</h2>
      <form onSubmit={buscarIp}>
        <input
          type="text"
          placeholder="Digite o IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && (
        <pre>{JSON.stringify(resultado, null, 2)}</pre>
      )}
    </div>
  );
}