import * as functions from "firebase-functions";
import axios from "axios";
import * as corsLib from "cors";
const cors = corsLib({ origin: true });

interface QueryParams {
  symbol: string;
}

function isQueryParams(query: any): query is QueryParams {
  return query && typeof query.symbol === "string";
}

exports.fetchCandlestickData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const binanceAPI = axios.create({
      baseURL: "https://api.binance.us/",
      headers: {
        Accept: "application/json",
      },
    });

    if (!isQueryParams(req.query)) {
      return res
        .status(400)
        .send({ error: "Symbol query parameter is required." });
    }

    try {
      const { symbol } = req.query;

      const response = await binanceAPI.get("/api/v3/klines", {
        params: {
          symbol: `${symbol}USDT`,
          interval: "1d",
          limit: "5",
        },
      });

      const transformedData = response.data.map((kline: any) => ({
        x: new Date(kline[0]).toISOString(),
        y: [kline[1], kline[2], kline[3], kline[4]].map(Number),
      }));

      return res.json(transformedData);
    } catch (error) {
      console.log(error);

      console.error("Error fetching candlestick data:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });
});
