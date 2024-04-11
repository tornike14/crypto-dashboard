import { Box, Input, Stack, Typography } from "@mui/material";
import CurrencySelect from "../shared/currencySelect";
import { CurrencyExchangeContainerProps } from "../../core/interfaces";

const CurrencyExchangeContainer = ({
  title,
  amount,
  selectedCurrency,
  onAmountChange,
  onCurrencyChange,
}: CurrencyExchangeContainerProps) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundColor: "#1B1B1B",
        maxWidth: "450px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body1">{title}</Typography>
          <Input
            type="text"
            disableUnderline
            value={amount}
            onChange={onAmountChange}
            placeholder="0"
            sx={{
              fontSize: "2.2rem",
              "&::placeholder": {
                fontSize: "2.2rem",
              },
            }}
          />
        </Stack>

        <CurrencySelect
          selectedSymbol={selectedCurrency}
          handleChange={onCurrencyChange}
        />
      </Stack>
    </Box>
  );
};

export default CurrencyExchangeContainer;
