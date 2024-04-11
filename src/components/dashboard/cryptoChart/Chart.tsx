import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { Box, CircularProgress } from "@mui/material";
import { chartOptions } from "../../../core/constants";
import { fetchCandlestickData } from "../../../api/Chart";

const CandlestickChart = ({ selectedSymbol }: { selectedSymbol: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["candlestickData", selectedSymbol],
    queryFn: () => fetchCandlestickData({ selectedSymbol }),
    enabled: !!selectedSymbol,
  });

  const chartSeries = [{ data: data || [] }];

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <Box>Error fetching data</Box>;

  return (
    <Box sx={{ mt: 2, minHeight: "400px" }}>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="candlestick"
        height={350}
      />
    </Box>
  );
};

export default CandlestickChart;
