import { useSelector } from "react-redux";
import {
  themeColor as appThemeColor,
  primaryColorLevel as appPrimaryColorLevel,
  mode as appMode,

} from "@libs/features/theme/theme.slice";

export const useThemeConfig = () => {
  const themeColor = useSelector(appThemeColor);
  const primaryColorLevel = useSelector(appPrimaryColorLevel);
  const mode = useSelector(appMode);

  return { themeColor, primaryColorLevel, mode };
};
