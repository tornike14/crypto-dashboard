# Cryptocurrency Dashboard

## როგორ ავამუშავოთ პროექტი ლოკალურად

 დააინსტალირე პრეოქტისთვის საჭირო ნოუდ მოდულები:
   ```bash
   npm install
  ```

 დააინსტალირე Firebase-ი თუ არ გაქვს, გლობალურად:
   ```bash
   npm install -g firebase-tools
  ```

 გაუშვი შემდეგი ბრძანება, რომ გაეშვას დეველოპმენტ სერვერი:
   ```bash
   npm run dev
  ```


## ლაივ ვერსია

დაჰოსტილი ვებსაიტის ლინკი: [Cryptocurrency Dashboard](https://bonny-group-task-7aafe.web.app).


## ტექნოლოგიები

პროექტი დავბილდე Vite-ის გამოყენებით

პროექტში გამოყენებული არის:

- **React.js & TypeScript**: მთავარი ტექნოლოგიები
- **Axios & React Query**: ინფორმაციის წამოღება API-დან და მასზე მანიპულაცია
- **MaterialUI**: დიზაინი (დავალების მაშტაბიდან გამომდინარე, მივყევი inline styling-ს მინიმალური სტილებისათვის)
- **SASS**: კონკრეტული სტილები
- **ApexCharts**: ლინკი ([ApexCharts](https://apexcharts.com/))

## Firebase Cloud Functions

CORS-ის პრობლემებიდან გამომდინარე, მომიწია გამომეყენებინა Firebase cloud function-ი, ერთ-ერთი მიზეზი იყო API Key-ის კლიენტის მხარეს არ გამოჩენა.
მეორე ალტერნატივა იყო ის რომ, თქვენს მხარეს, ბრაუზერზე უნდა გაგეთიშათ CORS-ი, რაც არ მინდოდა.
ქვემოთ არის მოცემული თითოეული ფუნცქციის კოდ სორსი.

ამ პრობლემიდან გამომდინარე, ის მეთოდები რითიც დავიწყე პროექტის გაკეთება მივატოვე, მაგრამ მაინც დავტოვე საჩვენებლად.

### Cloud Functions

1. **fetchCryptoData**: მოაქვს კრიპრო ვალუტების ინფორმაცია დეშბორდისთვის 

```javascript
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
  
  exports.fetchCryptoData = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      const api = axios.create({
        baseURL: "https://pro-api.coinmarketcap.com/",
        headers: {
          "X-CMC_PRO_API_KEY": "0a794595-fb8c-461c-84f1-50433b7a8052",
          Accept: "application/json",
        },
      });
  
      if (!isQueryParams(req.query)) {
        return res
          .status(400)
          .send({ error: "Symbol query parameter is required." });
      }
  
      try {
        const { symbol } = req.query as QueryParams;
        if (!symbol) {
          return res
            .status(400)
            .send({ error: "Symbol query parameter is required." });
        }
  
        const response = await api.get("/v1/cryptocurrency/quotes/latest", {
          params: { symbol },
        });
  
        return res.json(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  });
```

2. **fetchCandlestickData**: მოაქვს ჩართის ინფორმაცია

```javascript
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
```
   



