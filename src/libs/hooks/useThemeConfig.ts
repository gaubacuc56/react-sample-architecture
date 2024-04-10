import { useSelector } from "react-redux";
import {
  themeColor as appThemeColor,
  primaryColorLevel as appPrimaryColorLevel,
} from "@libs/features/theme/theme.slice";

export const useThemeConfig = () => {
  const themeColor = useSelector(appThemeColor);
  const primaryColorLevel = useSelector(appPrimaryColorLevel);

  return { themeColor, primaryColorLevel };
};
