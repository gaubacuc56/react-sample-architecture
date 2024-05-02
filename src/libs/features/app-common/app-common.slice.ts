import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppCommonState {
	currentRouteKey: string;
	appIsFetching: boolean;
}

export const initialState: IAppCommonState = {
	currentRouteKey: "",
	appIsFetching: false,
};

export const appCommonSlice = createSlice({
	name: "app-common",
	initialState,
	reducers: {
		setCurrentRouteKey: (state, action: PayloadAction<string>) => {
			state.currentRouteKey = action.payload;
		},
		setAppIsFetching: (state, action: PayloadAction<boolean>) => {
			state.appIsFetching = action.payload;
		},
	},
});

export const { setCurrentRouteKey, setAppIsFetching } = appCommonSlice.actions;

export default appCommonSlice.reducer;
