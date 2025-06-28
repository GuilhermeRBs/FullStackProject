import { useState } from 'react';
import api from './axios';
import '../App.css'; 

export default function Insert() {
  const [ip, setIp] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/insert', { ip, nome }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('IP inserido com sucesso!');
      setIp('');
      setNome('');
    } catch (err) {
      setMensagem('Erro ao inserir IP');
    }
  };

  return (
    <div className="container-centralizado">
      <div className="form-box">
        <h2>Inserir IP Manual</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome associado"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <button type="submit">Inserir</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}