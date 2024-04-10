import { THEME_COLOR, THEME_ENUM } from "@constant/theme.constant";
import {
    Direction,
    Mode,
    ColorLevel,
    LayoutType,
} from "@app-core/@types/theme";

export type ThemeConfig = {
    themeColor: string;
    direction: Direction;
    mode: Mode;
    primaryColorLevel: ColorLevel;
    layout: {
        type: LayoutType;
        sideNavCollapse: boolean;
    };
};

export const themeConfig: ThemeConfig = {
    themeColor: THEME_COLOR.TEAL,
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_DARK,
    primaryColorLevel: 800,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_MODERN,
        sideNavCollapse: false,
    },
};
