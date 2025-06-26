import React, { useContext, useState, useMemo } from 'react';
import Dashboard from './Dashboard';
import DashboardCard from '../components/DashboardCard';
import { IpContext } from '../contexts/ipContext';
import validator from 'validator';
import DOMPurify from 'dompurify';

const Home = () => {
  const { ipData, error } = useContext(IpContext);
  const [manualIp, setManualIp] = useState('');
  const [manualData, setManualData] = useState(null);
  const [manualError, setManualError] = useState(null);

  // Validação e sanitização do input
  const handleInputChange = (e) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setManualIp(sanitizedInput);
  };

  // Busca informações de IP manualmente
  const fetchManualIp = async () => {
    if (!validator.isIP(manualIp)) {
      setManualError("IP inválido! Digite um IP válido.");
      return;
    }

    setManualError(null);
    try {
      const response = await fetch(`https://ipinfo.io/${manualIp}/json`);
      if (!response.ok) throw new Error("Falha na requisição da API");

      const data = await response.json();
      setManualData(data);
    } catch (error) {
      setManualError("Erro ao buscar informações do IP digitado.");
    }
  };

  const formattedLocation = useMemo(() => {
    if (!ipData) return "Carregando...";
    return `${ipData.city}, ${ipData.region}, ${ipData.country}`;
  }, [ipData]);

  return (
    <div style={{ padding: '2rem', textAlign: "center" }}>
      <h1>Consulta de IPs</h1>

      {/* Input para busca manual */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Digite um IP..."
          value={manualIp}
          onChange={handleInputChange}
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchManualIp}
          style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer" }}
        >
          Buscar IP
        </button>
      </div>

      {manualError && <p style={{ color: 'red', fontWeight: "bold" }}>{manualError}</p>}
      {error && <p style={{ color: 'red', fontWeight: "bold" }}>{error}</p>}

      {/* Exibe IP automático */}
      {!error && ipData && (
        <>
          <DashboardCard title="Seu IP" value={ipData.ip} />
          <DashboardCard title="Sua Localização" value={formattedLocation} />
        </>
      )}

      {/* Exibe IP manual */}
      {manualData && (
        <>
          <DashboardCard title="IP Pesquisado" value={manualData.ip} />
          <DashboardCard title="Localização Pesquisada" value={`${manualData.city}, ${manualData.region}, ${manualData.country}`} />
        </>
      )}
    </div>
  );
};

export default Home;
