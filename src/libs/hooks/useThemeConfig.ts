import { useAppSelector } from "@/app-core/redux-manager/hooks";

export const useThemeConfig = () => {
    const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
    const direction = useAppSelector((state) => state.themeReducer.direction);
    const mode = useAppSelector((state) => state.themeReducer.mode);
    const primaryColorLevel = useAppSelector(
        (state) => state.themeReducer.primaryColorLevel
    );
    const layout = useAppSelector((state) => state.themeReducer.layout);
    const panelExpand = useAppSelector(
        (state) => state.themeReducer.panelExpand
    );
    const navMode = useAppSelector((state) => state.themeReducer.navMode);

    console.log("panelExpand", panelExpand);
    console.log("navMode", navMode);

    return {
        themeColor,
        primaryColorLevel,
        mode,
        direction,
        layout,
        panelExpand,
        navMode,
    };
};
