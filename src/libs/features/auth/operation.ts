import { StoreState } from "@app-core/redux-manager/rootReducer";
import { IAuthState, authStore } from "./slice";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: StoreState): IAuthState => state.authReducer;

export const AuthSelectors = {
	token: createSelector(selectSelf, (state: IAuthState) => state.token),
	authority: createSelector(
		selectSelf,
		(state: IAuthState) => state.authority
	),
	savedAccount: createSelector(
		selectSelf,
		(state: IAuthState) => state.savedAccount
	),
};

export const AuthActions = {
	...authStore.actions,
};
