import React from "react";
import { IpProvider } from "./contexts/ipContext";
import Home from "./pages/Home";

function App() {
  return (
    <IpProvider>
      <Home />
    </IpProvider>
  );
}

export default App;
