import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import AppRoutes from "../routes";

const App = () => {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
  };
  return (
    <>
      <div className="bg-zinc-100">
        {token ? <AppRoutes token={token} /> : <Login onLogin={handleLogin} />}
      </div>
    </>
  );
};

export default App;
