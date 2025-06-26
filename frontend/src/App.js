import React from "react";
import { IpProvider } from "./contexts/ipContext";
import Rotas from "./components/Rotas";

function App() {
  return (
    <IpProvider>
      <Rotas />
    </IpProvider>
  );
}

export default App;