import { Box, SelectChangeEvent } from "@mui/material";
import CandlestickChart from "./Chart";
import { useState } from "react";
import CurrencySelect from "../../shared/currencySelect";

const CandlestickChartView = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTC");

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedSymbol(e.target.value as string);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <CurrencySelect
        handleChange={handleChange}
        selectedSymbol={selectedSymbol}
      />

      <CandlestickChart selectedSymbol={selectedSymbol} />
    </Box>
  );
};

export default CandlestickChartView;
