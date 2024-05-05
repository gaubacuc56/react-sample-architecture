import { THEME_COLOR, THEME_ENUM } from "@constant/theme.constant";
import { ThemeConfig } from "@app-core/@types/theme";

export const themeConfig: ThemeConfig = {
    themeColor: THEME_COLOR.TEAL,
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    primaryColorLevel: 800,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_CLASSIC,
        sideNavCollapse: false,
    },
    panelExpand: false,
    navMode: THEME_ENUM.NAV_MODE_TRANSPARENT,
};
