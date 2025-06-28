import { useState } from 'react';
import api from './axios';

export default function Insert() {
  const [ip, setIp] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/insert', { ip }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('IP inserido com sucesso!');
      setIp('');
    } catch (err) {
      setMensagem('Erro ao inserir IP');
    }
  };

  return (
    <div>
      <h2>Inserir IP manual</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit">Inserir</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}