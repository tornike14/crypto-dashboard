import BitcoinIcon from "../../assets/cryptocurrencies/bitcoin.svg";
import EthereumIcon from "../../assets/cryptocurrencies/ethereum.svg";
import DogecoinIcon from "../../assets/cryptocurrencies/dogecoin.svg";
import PolkadotIcon from "../../assets/cryptocurrencies/polkadot.svg";
import PolygonIcon from "../../assets/cryptocurrencies/polygon.svg";
import ShibaInuIcon from "../../assets/cryptocurrencies/shiba.svg";
import SolanaIcon from "../../assets/cryptocurrencies/solana.svg";
import UniswapIcon from "../../assets/cryptocurrencies/uniswap.svg";
import TetherIcon from "../../assets/cryptocurrencies/usdt.svg";
import ChainlinkIcon from "../../assets/cryptocurrencies/chainlink.svg";

import { Currency } from "../interfaces";

import { ApexOptions } from "apexcharts";

// for Crypto icon component
export const IconMap = {
  BTC: BitcoinIcon,
  ETH: EthereumIcon,
  DOGE: DogecoinIcon,
  DOT: PolkadotIcon,
  MATIC: PolygonIcon,
  SHIB: ShibaInuIcon,
  SOL: SolanaIcon,
  UNI: UniswapIcon,
  USDT: TetherIcon,
  LINK: ChainlinkIcon,
};

// For Crypto currency in select component
export const currenciesForSelect: Currency[] = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "LINK", name: "Chainlink" },
  { symbol: "DOGE", name: "Dogecoin" },
  { symbol: "DOT", name: "Polkadot" },
  { symbol: "MATIC", name: "Polygon" },
  { symbol: "SHIB", name: "Shiba Inu" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "UNI", name: "Uniswap" },
];

// table params for api call
export const symbols = "BTC,LINK,DOGE,ETH,DOT,MATIC,SHIB,SOL,UNI,USDT";

// Configuration for ApexCharts
export const chartOptions: ApexOptions = {
  chart: {
    type: "candlestick",
  },
  title: {
    text: "Crypto Candlestick Chart",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};
