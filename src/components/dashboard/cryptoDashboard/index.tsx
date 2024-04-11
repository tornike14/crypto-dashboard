import { TableGenerator } from "../../shared/table";
import { Box } from "@mui/material";
import CryptoIcon from "../../shared/Icon/CryptoIcon";
import { getColorBasedOnValue } from "../../../libs/functions/styleHelpers";
import PriceChangeIcon from "../../shared/Icon/PriceChangeIcon";

const CryptoDashboard = () => {
  return (
    <TableGenerator
      tableKey={["cryptoCurrencyOverview"]}
      headings={[
        { id: "index", label: "#" },
        { id: "currency", label: "Name" },
        { id: "price", label: "Price" },
        { id: "change24h", label: "24h %" },
        { id: "change7d", label: "7d %" },
        { id: "change30d", label: "30d %" },
        { id: "marketCap", label: "Market Cap" },
      ]}
      renderRowId={(row: { id: number }) => row.id}
      renderRow={(row, index) => {
        return [
          <Box key={`index-${row.id}`} sx={{ py: 1 }}>
            {index + 1}
          </Box>,
          <Box key={`currency-${row.id}`} className="flexCenterVertical">
            <CryptoIcon symbol={row.symbol} />
            {row.name}
          </Box>,
          <Box key={`price-${row.id}`} sx={{ py: 1 }}>
            ${row.quote.USD.price.toFixed(2)}
          </Box>,
          <Box
            key={`change24h-${row.id}`}
            className="flexCenterVertical"
            sx={{
              color: getColorBasedOnValue(row.quote.USD.percent_change_24h),
            }}
          >
            <PriceChangeIcon
              isPositive={row.quote.USD.percent_change_24h > 0}
            />
            {row.quote.USD.percent_change_24h.toFixed(2)}%
          </Box>,
          <Box
            key={`change7d-${row.id}`}
            className="flexCenterVertical"
            sx={{
              color: getColorBasedOnValue(row.quote.USD.percent_change_7d),
            }}
          >
            <PriceChangeIcon isPositive={row.quote.USD.percent_change_7d > 0} />
            {row.quote.USD.percent_change_7d.toFixed(2)}%
          </Box>,
          <Box
            key={`change30d-${row.id}`}
            className="flexCenterVertical"
            sx={{
              color: getColorBasedOnValue(row.quote.USD.percent_change_30d),
            }}
          >
            <PriceChangeIcon
              isPositive={row.quote.USD.percent_change_30d > 0}
            />
            {row.quote.USD.percent_change_30d.toFixed(2)}%
          </Box>,
          <Box key={`marketCap-${row.id}`} sx={{ py: 1 }}>
            ${row.quote.USD.market_cap.toLocaleString()}
          </Box>,
        ];
      }}
    />
  );
};

export default CryptoDashboard;
