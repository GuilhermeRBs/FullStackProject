import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-centralizado">
      <div className="form-box">
        <h1>Sistema de Busca de IPs</h1>
        <p>
          Esta aplicação web em 3 camadas permite realizar login, buscar informações de IP e registrar dados,
          com autenticação segura e histórico salvo no banco de dados.
        </p>
        <button onClick={() => navigate('/login')}>Acessar o sistema</button>
      </div>
    </div>
  );
}