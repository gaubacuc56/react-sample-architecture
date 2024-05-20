import { StoreState } from "@app-core/redux-manager/rootReducer";
import { IThemeState, themeStore } from "./slice";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: StoreState): IThemeState => state.themeReducer;

export const ThemeSelectors = {
	themeColor: createSelector(
		selectSelf,
		(state: IThemeState) => state.themeColor
	),
	direction: createSelector(
		selectSelf,
		(state: IThemeState) => state.direction
	),
	mode: createSelector(selectSelf, (state: IThemeState) => state.mode),
	primaryColorLevel: createSelector(
		selectSelf,
		(state: IThemeState) => state.primaryColorLevel
	),
	layout: createSelector(selectSelf, (state: IThemeState) => state.layout),
	panelExpand: createSelector(
		selectSelf,
		(state: IThemeState) => state.panelExpand
	),
	navMode: createSelector(selectSelf, (state: IThemeState) => state.navMode),
};

export const ThemeActions = {
	...themeStore.actions,
};
