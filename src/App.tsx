import { BrowserRouter, Route, Routes } from "react-router-dom";
import Approval from "./pages/Approval/Approval";

import CryptoTnx from "./pages/CryptoTnx/CryptoTnx";

import "./global.css";
import Login from "./pages/login/login";
import TwoFa from "./pages/twofa/TwoFa";
import CryptoTnxHistory from "./pages/CryptoTnxHistory/CryptoTnxHistory";
import RequireAuth from "./utils/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/crypto-transaction"
          element={
            <RequireAuth>
              <CryptoTnx />
            </RequireAuth>
          }
        />
        <Route
          path="/approval"
          element={
            <RequireAuth>
              <Approval />
            </RequireAuth>
          }
        />
        {/* <Route path="/twofa" element={<TwoFa />} /> */}
        <Route
          path="/crypto-txn-history"
          element={
            <RequireAuth>
              <CryptoTnxHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Login />
            </RequireAuth>
          }
        />

        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
