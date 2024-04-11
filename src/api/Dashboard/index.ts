import axios from "axios";
import { CoinMarketCapApiResponse } from "../../core/interfaces";

export const fetchDashboardData = async ({
  symbols,
}: {
  symbols: string;
}): Promise<CoinMarketCapApiResponse> => {
  const response = await axios.get<CoinMarketCapApiResponse>(
    `${import.meta.env.VITE_FIREBASE_CLOUD_FUNCTIONS_BASE_URL}fetchCryptoData`,
    {
      params: {
        symbol: symbols,
      },
    }
  );

  return response.data;
};
