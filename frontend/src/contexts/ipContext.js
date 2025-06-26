import React, { createContext, useState, useEffect } from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIpInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`);
        if (!response.ok) throw new Error("Falha na requisição da API");

        const data = await response.json();
        setIpData(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar informações de IP:", error);
        setError("Não foi possível obter as informações de conexão.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  return (
    <IpContext.Provider value={{ ipData, error, isLoading }}>
      {children}
    </IpContext.Provider>
  );
};
