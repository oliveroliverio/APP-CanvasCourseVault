import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VaultPage from "./vault/VaultPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vault" element={<VaultPage />} />
    </Routes>
  );
}
