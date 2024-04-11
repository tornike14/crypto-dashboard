import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Key } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import NoTableData from "./NoTableData";
import { CoinMarketCapApiResponse, TableInput } from "../../../core/interfaces";
import { symbols } from "../../../core/constants";
import { fetchDashboardData } from "../../../api/Dashboard";

export const TableGenerator = ({
  tableKey,
  headings,
  renderRowId,
  renderRow,
}: TableInput) => {
  const $table: UseQueryResult<CoinMarketCapApiResponse, Error> = useQuery({
    queryKey: [...tableKey],
    queryFn: () => fetchDashboardData({ symbols }),
    refetchInterval: 30000, // Commenting for testing and cost saving purposes
  });

  const rows = $table.data
    ? Object.keys($table.data.data).map((key, index) => {
        const row = $table.data.data[key];
        return {
          id: renderRowId(row),
          cells: renderRow(row, index),
        };
      })
    : [];

  return (
    <TableContainer className="custom-table-container">
      <Table>
        <TableHead>
          <TableRow>
            {/* Mapping column titles */}
            {headings?.map((heading) => (
              <TableCell
                key={heading.id}
                color="secondary"
                sx={{ borderBottomColor: "#323546" }}
              >
                <Typography key={heading.id} noWrap>
                  {heading.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Mapping content */}
          {!$table.isLoading &&
            rows?.map(
              (
                row: { id: Key | null | undefined; cells: any[] },
                idx1: number
              ) => {
                return (
                  <TableRow key={`${row.id}-${idx1}`}>
                    {row?.cells?.map((cell, idx2) => (
                      <TableCell
                        sx={{ borderBottomColor: "#323546" }}
                        key={`${row.id}-${idx2}`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>

      {!$table.isLoading && rows?.length === 0 && <NoTableData />}

      {$table.isLoading && (
        <Box
          sx={{
            p: 2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </TableContainer>
  );
};
