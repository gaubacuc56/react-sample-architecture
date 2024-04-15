import { useAppSelector } from "@/app-core/redux-manager/hooks";

export const useThemeConfig = () => {
  const themeColor = useAppSelector(state => state.themeReducer.themeColor);
  const primaryColorLevel = useAppSelector(state => state.themeReducer.primaryColorLevel);
  const mode = useAppSelector(state => state.themeReducer.mode);

  return { themeColor, primaryColorLevel, mode };
};
