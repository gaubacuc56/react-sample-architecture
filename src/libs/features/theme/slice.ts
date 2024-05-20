import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeConfig } from "@config/theme.config";
import type {
	LayoutType,
	Mode,
	ColorLevel,
	Direction,
	NavMode,
} from "@app-core/@types/theme";
import { THEME_ENUM } from "@constant/theme.constant";

export interface IThemeState {
	themeColor: string;
	direction: Direction;
	mode: Mode;
	primaryColorLevel: ColorLevel;
	layout: {
		type: LayoutType;
		sideNavCollapse: boolean;
		previousType?: LayoutType;
	};
	panelExpand: boolean;
	navMode: NavMode;
}

const initialState: IThemeState = {
	themeColor: themeConfig.themeColor,
	direction: themeConfig.direction,
	mode: themeConfig.mode,
	primaryColorLevel: themeConfig.primaryColorLevel,
	layout: themeConfig.layout,
	panelExpand: themeConfig.panelExpand,
	navMode: themeConfig.navMode,
};

export const themeStore = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setDirection: (state, action: PayloadAction<Direction>) => {
			state.direction = action.payload;
		},
		setMode: (state, action: PayloadAction<Mode>) => {
			state.mode = action.payload;
		},
		setLayout: (state, action: PayloadAction<LayoutType>) => {
			state.layout = {
				...state.layout,
				...{ type: action.payload },
			};
		},
		setPreviousLayout: (state, action) => {
			state.layout.previousType = action.payload;
		},
		setSideNavCollapse: (state, action) => {
			state.layout = {
				...state.layout,
				...{ sideNavCollapse: action.payload },
			};
		},
		setThemeColor: (state, action: PayloadAction<string>) => {
			state.themeColor = action.payload;
		},
		setThemeColorLevel: (state, action) => {
			state.primaryColorLevel = action.payload;
		},
		setPanelExpand: (state, action: PayloadAction<boolean>) => {
			state.panelExpand = action.payload;
		},
		setNavMode: (state, action: PayloadAction<NavMode | "default">) => {
			if (action.payload !== "default") {
				state.navMode = action.payload;
			}
			// Classic Layout
			/* else {
                if (state.mode === THEME_ENUM.MODE_LIGHT)
                    state.navMode = THEME_ENUM.NAV_MODE_LIGHT;
                else state.navMode = THEME_ENUM.NAV_MODE_DARK;
            } */
			// Modern layout
			else state.navMode = THEME_ENUM.NAV_MODE_TRANSPARENT;
		},
	},
});

export default themeStore.reducer;
