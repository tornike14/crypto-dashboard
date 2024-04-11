import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { currenciesForSelect } from "../../../core/constants";
import CryptoIcon from "../Icon/CryptoIcon";
import { CurrencySelectProps } from "../../../core/interfaces";

const CurrencySelect = ({
  selectedSymbol,
  handleChange,
}: CurrencySelectProps) => {
  return (
    <FormControl>
      <Select
        value={selectedSymbol}
        onChange={handleChange}
        renderValue={(selected) => {
          const currency = currenciesForSelect.find(
            (c) => c.symbol === selected
          );
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currency?.symbol.length && (
                <CryptoIcon symbol={currency.symbol} />
              )}
              <Box sx={{ mr: 3 }}> {currency?.symbol}</Box>
            </Box>
          );
        }}
      >
        {currenciesForSelect.map((currency) => (
          <MenuItem key={currency.symbol} value={currency.symbol}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currency?.symbol.length && (
                <CryptoIcon symbol={currency.symbol} />
              )}
              {currency.symbol}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
