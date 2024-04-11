import { Route, Routes } from "react-router-dom";
import ROUTES from "../libs/routes/index";
import CryptoDashboardView from "./dashboard";
import DexView from "./dex";

const Views = () => {
  return (
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={<CryptoDashboardView />} />
      <Route path={ROUTES.DEX} element={<DexView />} />
    </Routes>
  );
};

export default Views;
