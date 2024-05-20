import { Locales, LocaleType } from "@app-core/locale";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "@app-core/redux-manager/rootReducer";
interface IAppCommonState {
	currentRouteKey: string;
	appIsFetching: boolean;
	language: LocaleType;
}

const initialState: IAppCommonState = {
	currentRouteKey: "",
	appIsFetching: false,
	language: Locales.ENGLISH,
};

const appCommonStore = createSlice({
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

export const AppCommonActions = {
	...appCommonStore.actions,
};

const selectSelf = (state: StoreState): IAppCommonState =>
	state.appCommonReducer;

export const AppCommonSelectors = {
	currentRouteKey: createSelector(
		selectSelf,
		(state: IAppCommonState) => state.currentRouteKey
	),
	appIsFetching: createSelector(
		selectSelf,
		(state: IAppCommonState) => state.appIsFetching
	),
	language: createSelector(
		selectSelf,
		(state: IAppCommonState) => state.language
	),
};

export default appCommonStore.reducer;
