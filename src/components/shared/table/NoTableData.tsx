import { Typography, Box } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoTableData = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      mt={2}
      mb={2}
      ml={"auto"}
    >
      <Box sx={{ marginRight: "4px", color: "#fff" }}>
        <SearchOffIcon />
      </Box>

      <Typography sx={{ color: "#fff" }} variant="body1">
        No Data Found
      </Typography>
    </Box>
  );
};

export default NoTableData;
