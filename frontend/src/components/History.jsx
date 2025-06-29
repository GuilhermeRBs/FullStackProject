import { useEffect, useState } from 'react';
import api from './axios';

export default function History() {
  const [dados, setDados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [erro, setErro] = useState('');

  const carregarHistorico = async (pagina) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(`/history?page=${pagina}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setDados(res.data.historico);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    setErro('Erro ao carregar histórico');
    console.error(err);
  }
};

  useEffect(() => {
    carregarHistorico(page);
  }, [page]);

  return (
    <div className="container-centralizado">
      <div className="form-box">
        <h2>Histórico de Buscas</h2>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        {dados.length === 0 ? (
          <p>Nenhum histórico encontrado.</p>
        ) : (
          dados.map((item, index) => (
            <div key={index} className="card-historico" style={{ marginBottom: '16px' }}>
              <p><strong>IP:</strong> {item.resultado.ip}</p>
              <p><strong>Cidade:</strong> {item.resultado.cidade}</p>
              <p><strong>Estado:</strong> {item.resultado.estado}</p>
              <p><strong>País:</strong> {item.resultado.pais}</p>
              <p><strong>Data:</strong> {new Date(item.data).toLocaleString()}</p>
              <hr />
            </div>
          ))
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Próxima</button>
          </div>
        )}
      </div>
    </div>
  );
}