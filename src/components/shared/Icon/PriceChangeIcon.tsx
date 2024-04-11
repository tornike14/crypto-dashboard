import { ReactElement } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const PriceChangeIcon = ({
  isPositive,
}: {
  isPositive: boolean;
}): ReactElement => {
  return isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
};

export default PriceChangeIcon;
