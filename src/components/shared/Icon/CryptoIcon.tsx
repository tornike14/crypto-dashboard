import React, { ReactElement } from "react";
import { IconMap } from "../../../core/constants";
import { Box } from "@mui/material";
import { CryptoIconProps } from "../../../core/interfaces";

const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol }): ReactElement => {
  const IconComponent = IconMap[symbol];
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginRight: 1 }}>
      <img
        src={IconComponent}
        alt={`${symbol} icon`}
        style={{ width: 24, height: 24 }}
      />
    </Box>
  );
};

export default CryptoIcon;