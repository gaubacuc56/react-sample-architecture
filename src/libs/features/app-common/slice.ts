import { Locales, LocaleType } from "@app-core/locale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppCommonState {
	currentRouteKey: string;
	appIsFetching: boolean;
	language: LocaleType;
}

const initialState: IAppCommonState = {
	currentRouteKey: "",
	appIsFetching: false,
	language: Locales.ENGLISH,
};

export const appCommonStore = createSlice({
	name: "app-common",
	initialState,
	reducers: {
		setCurrentRouteKey: (state, action: PayloadAction<string>) => {
			state.currentRouteKey = action.payload;
		},
		setAppIsFetching: (state, action: PayloadAction<boolean>) => {
			state.appIsFetching = action.payload;
		},
		setAppLanguage: (state, action: PayloadAction<LocaleType>) => {
			state.language = action.payload;
		},
	},
});

export default appCommonStore.reducer;
