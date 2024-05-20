import { createSelector } from "@reduxjs/toolkit";

import { StoreState } from "@app-core/redux-manager/rootReducer";
import { IAppCommonState, appCommonStore } from "./slice";

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

export const AppCommonActions = {
	...appCommonStore.actions,
};
