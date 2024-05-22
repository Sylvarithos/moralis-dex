import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useState } from "react";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect({});

  const [connected, setConnected] = useState(false);
  const accountConnect = () => {
    if (connected) {
      setConnected(false);
      disconnect();
    } else {
      setConnected(true);
      connect();
    }
  };

  return (
    <div className="App">
      <Header
        connect={accountConnect}
        isConnected={isConnected}
        address={address}
      />
      <div className="mainWindow">
        <Routes>
          <Route
            path="/"
            element={<Swap isConnected={isConnected} address={address} />}
          />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
