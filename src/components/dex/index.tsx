import { Box, Container, SelectChangeEvent, Stack } from "@mui/material";
import { SwapVert } from "@mui/icons-material";
import CurrencyExchangeContainer from "../../components/dex/CurrencyExchangeContainer";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchPairPrice } from "../../api/Dex";
import { Currencies } from "../../core/interfaces";
import debounce from "lodash/debounce";
import { enqueueSnackbar } from "notistack";
import LoadingOverlay from "../shared/overlay";
import { inputTypeNumberRegex } from "../../libs/regex";

const Dex = () => {
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [payCurrency, setPayCurrency] = useState<Currencies>("BTC");
  const [receiveCurrency, setReceiveCurrency] = useState<Currencies>("ETH");
  const [pairPrice, setPairPrice] = useState<number | null>(null);

  const $fetchPrice = useMutation({
    mutationFn: fetchPairPrice,
  });

  const calculateReceiveAmount = debounce(
    (amount: string, pairPrice: number) => {
      if (amount.length === 0 || (amount.length === 1 && amount === ".")) {
        setReceiveAmount("");
        return;
      }

      if (!pairPrice) return;
      const calculatedAmount = Number(amount) * pairPrice;
      setReceiveAmount(calculatedAmount.toFixed(7));
    },
    300
  );

  const calculatePayAmount = debounce((amount: string, pairPrice: number) => {
    if (amount.length === 0 || (amount.length === 1 && amount === ".")) {
      setPayAmount("");
      return;
    }

    if (!pairPrice) return;
    const calculatedAmount = Number(amount) / pairPrice;
    setPayAmount(calculatedAmount.toFixed(7));
  }, 300);

  const handlePayAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;

    if (!inputTypeNumberRegex.test(amount)) return;
    setPayAmount(amount);

    if (pairPrice) calculateReceiveAmount(amount, pairPrice);
  };

  const handleReceiveAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;

    if (!inputTypeNumberRegex.test(amount)) return;
    setReceiveAmount(amount);

    if (pairPrice) calculatePayAmount(amount, pairPrice);
  };

  const handleSwap = () => {
    setPayCurrency(receiveCurrency);
    setReceiveCurrency(payCurrency);
    setPayAmount(receiveAmount);
    setReceiveAmount(payAmount);
  };

  const handleCurrencyChange = (
    changingCurrency: "pay" | "receive",
    newValue: Currencies
  ) => {
    if (changingCurrency === "pay") {
      setPayCurrency(newValue);
    } else {
      setReceiveCurrency(newValue);
    }

    $fetchPrice.mutate(
      {
        payCurrency: changingCurrency === "pay" ? newValue : payCurrency,
        receiveCurrency:
          changingCurrency === "receive" ? newValue : receiveCurrency,
      },
      {
        onSuccess: (data: number) => {
          setPairPrice(data);

          if (changingCurrency === "pay") {
            calculateReceiveAmount(payAmount, data);
          } else {
            calculatePayAmount(receiveAmount, data);
          }
        },
        onError: () => {
          setPairPrice(null);
          enqueueSnackbar("Failed to fetch currency price", {
            variant: "error",
          });
        },
      }
    );
  };

  useEffect(() => {
    $fetchPrice.mutate(
      { payCurrency, receiveCurrency },
      {
        onSuccess: (data) => {
          setPairPrice(data);
        },
        onError: () => {
          enqueueSnackbar("Failed to fetch Currencies price", {
            variant: "error",
          });
        },
      }
    );
  }, []);

  return (
    <Container maxWidth="lg">
      {$fetchPrice.isPending && <LoadingOverlay />}
      <Stack spacing={2} alignItems="center" mt={8}>
        <CurrencyExchangeContainer
          title="You Pay"
          amount={payAmount}
          selectedCurrency={payCurrency}
          onCurrencyChange={(e: SelectChangeEvent) =>
            handleCurrencyChange("pay", e.target.value as Currencies)
          }
          onAmountChange={handlePayAmountChange}
        />
        <Box className="swapCircle" onClick={handleSwap}>
          <SwapVert />
        </Box>
        <CurrencyExchangeContainer
          title="You Receive"
          amount={receiveAmount}
          selectedCurrency={receiveCurrency}
          onCurrencyChange={(e: SelectChangeEvent) =>
            handleCurrencyChange("receive", e.target.value as Currencies)
          }
          onAmountChange={handleReceiveAmountChange}
        />
      </Stack>
    </Container>
  );
};

export default Dex;
