import { ChangeEvent, ReactNode } from "react";
import { IconMap } from "../constants";
import { SelectChangeEvent } from "@mui/material";

// src/api
export interface AxiosInstanceConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// table
export type TableInput = {
  tableKey: string[];
  // requestUrl: string;
  headings: Array<{ id: string; label: string }>;
  renderRowId: (row: any) => number;
  renderRow: (row: any, index: number) => Array<ReactNode>;
};

interface CryptoCurrencyQuote {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
}

interface CryptoCurrencyData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: CryptoCurrencyQuote;
  };
}

export interface CoinMarketCapApiResponse {
  data: Record<string, CryptoCurrencyData>;
}

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
    };
  };
}

export interface RowProps {
  row: CryptoData;
  index: number;
}

// For Crypto Icon component constant
export interface CryptoIconProps {
  symbol: keyof typeof IconMap;
}

// For Crypto currency in select component
export interface Currency {
  symbol: keyof typeof IconMap;
  name: string;
}

// For Currency Select component props
export interface CurrencySelectProps {
  selectedSymbol: string;
  handleChange: (event: SelectChangeEvent) => void;
}

// CurrencyExchangeContainer component props
export interface CurrencyExchangeContainerProps {
  title: string;
  amount: string;
  selectedCurrency: string;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (event: SelectChangeEvent) => void;
}

export type Currencies =
  | "BTC"
  | "ETH"
  | "LINK"
  | "DOGE"
  | "DOT"
  | "MATIC"
  | "SHIB"
  | "SOL"
  | "UNI";
