import { BrowserRouter, Route, Routes } from "react-router-dom";
import Approval from "./pages/Approval/Approval";

import CryptoTnx from "./pages/CryptoTnx/CryptoTnx";

import "./global.css";
import Login from "./pages/login/login";
import TwoFa from "./pages/twofa/TwoFa";
import CryptoTnxHistory from "./pages/CryptoTnxHistory/CryptoTnxHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crypto-transaction" element={<CryptoTnx />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/twofa" element={<TwoFa />} />
        <Route path="/crypto-txn-history" element={<CryptoTnxHistory />} />

        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
