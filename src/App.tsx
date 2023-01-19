import { BrowserRouter, Route, Routes } from "react-router-dom";
import CryptoTnx from "./pages/CryptoTnx/CryptoTnx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/crypto-transaction" element={<CryptoTnx />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
