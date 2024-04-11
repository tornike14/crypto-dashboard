import { Container } from "@mui/material";
import CryptoDashboard from "../../components/dashboard/cryptoDashboard";
import CandlestickChartView from "../../components/dashboard/cryptoChart";

const CryptoDashboardView = () => {
  return (
    <Container maxWidth="lg">
      <CryptoDashboard />
      <CandlestickChartView />
    </Container>
  );
};

export default CryptoDashboardView;
