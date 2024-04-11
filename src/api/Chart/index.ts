import axios from "axios";

export const fetchCandlestickData = async ({
  selectedSymbol,
}: {
  selectedSymbol: string;
}) => {
  if (!selectedSymbol) return;

  const response = await axios.get(
    `${
      import.meta.env.VITE_FIREBASE_CLOUD_FUNCTIONS_BASE_URL
    }fetchCandlestickData`,
    {
      params: {
        symbol: selectedSymbol,
      },
    }
  );

  return response.data;
};
