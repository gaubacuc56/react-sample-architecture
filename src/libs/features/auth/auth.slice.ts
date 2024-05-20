import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ISavedAccount } from "./auth.interfaces";
import { StoreState } from "@app-core/redux-manager/rootReducer";

// define state
interface IAuthState {
	token: string;
	authority: string[];
	savedAccount?: ISavedAccount;
}

const initialState: IAuthState = {
	token: "",
	authority: [],
	savedAccount: undefined,
};

// define slice
const authStore = createSlice({
	name: "login",
	initialState,
	reducers: {
		setAppToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.token = "";
			state.authority = [];
			window.location.reload();
		},
		setSavedAccount: (
			state,
			action: PayloadAction<ISavedAccount | undefined>
		) => {
			state.savedAccount = action.payload;
		},
	},
});

export const AuthActions = {
	...authStore.actions,
};

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

export default authStore.reducer;
