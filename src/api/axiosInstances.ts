import axios, { AxiosInstance } from "axios";
import { AxiosInstanceConfig } from "../core/interfaces";
import { enqueueSnackbar } from "notistack";

const createInstance = ({
  baseURL,
  headers = {},
}: AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMsg = error.response?.statusText || "Unknown error";
      enqueueSnackbar(`Error: ${errorMsg}`, {
        variant: "error",
      });

      if (error.response?.status === 400) {
        enqueueSnackbar("Bad Request - Please check your input", {
          variant: "error",
        });
      } else if (error.response?.status >= 500) {
        enqueueSnackbar("Server Error - Try again later", {
          variant: "error",
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Because of the CORS issues, I am not using these Instances.
// But I leave this file because of best practice
const coinMarketCapAPI = createInstance({
  baseURL: import.meta.env.VITE_COINMARKETCAP_BASE_URL as string,
  headers: {
    "X-CMC_PRO_API_KEY": import.meta.env.VITE_COINMARKETCAP_API_KEY as string,
  },
});

const binanceAPI = createInstance({
  baseURL: import.meta.env.VITE_BINANCE_API_BASE_URL as string,
});

export { coinMarketCapAPI, binanceAPI };
