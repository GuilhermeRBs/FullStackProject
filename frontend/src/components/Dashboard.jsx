import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { IpContext } from "../contexts/ipContext";

const Dashboard = () => {
  const { isLoading, error } = useContext(IpContext);

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold">Informações da sua Conexão</Typography>
      </Grid>

      <Grid item xs={12}>
        {isLoading ? (
          <Typography variant="h6" color="primary">Buscando informações...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <Typography variant="h6" color="success">Dados carregados com sucesso!</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
