import axios from "axios";
import { CoinMarketCapApiResponse, Currencies } from "../../core/interfaces";

export const fetchPairPrice = async ({
  payCurrency,
  receiveCurrency,
}: {
  payCurrency: Currencies;
  receiveCurrency: Currencies;
}) => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_CLOUD_FUNCTIONS_BASE_URL}fetchCryptoData`,
    {
      params: {
        symbol: `${payCurrency},${receiveCurrency}`,
      },
    }
  );

  const prices: CoinMarketCapApiResponse = response.data;

  const payCurrencyPriceInUSD =
    prices.data[payCurrency as Currencies].quote.USD.price;
  const receiveCurrencyPriceInUSD =
    prices.data[receiveCurrency as Currencies].quote.USD.price;

  // Calculate the exchange rate
  const pairPrice = payCurrencyPriceInUSD / receiveCurrencyPriceInUSD;

  return pairPrice;
};
