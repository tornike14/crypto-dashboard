// Because of the CORS issues, I am not using the paths.
// But I leave this file because of best practice
export default {
  dashboard: {
    GET_CRYPTOCURRENCIES_OVERVIEW: "v1/cryptocurrency/quotes/latest",
    GET_CURRENCY_PRICE_HISTORY_5D: "/path/to/currency/priceChange/5days",
  },
  dex: {
    GET_CURRENCY_PAIR_PRICES: "/path/to/currency/pairs/prices",
  },
};
