import { useContext } from "react";
import { ThemeContext } from "@libs/provider/theme";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return {
        ThemeActions: {
            setDirection: context.setDirection,
            setMode: context.setMode,
            setLayout: context.setLayout,
            setPreviousLayout: context.setPreviousLayout,
            setSideNavCollapse: context.setSideNavCollapse,
            setThemeColor: context.setThemeColor,
            setThemeColorLevel: context.setThemeColorLevel,
            setPanelExpand: context.setPanelExpand,
            setNavMode: context.setNavMode,
        },
        themeColor: context.state.themeColor,
        direction: context.state.direction,
        mode: context.state.mode,
        primaryColorLevel: context.state.primaryColorLevel,
        layout: context.state.layout,
        panelExpand: context.state.panelExpand,
        navMode: context.state.navMode,
    };
};
