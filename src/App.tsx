import { BrowserRouter, Route, Routes } from "react-router-dom";

import CryptoTnx from "./pages/CryptoTnx/CryptoTnx";


import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/crypto-transaction" element={<CryptoTnx />} />

        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
