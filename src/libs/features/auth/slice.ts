import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISavedAccount } from "./interface";

// define state
export interface IAuthState {
	token: string;
	refreshToken: string;
	authority: string[];
	savedAccount?: ISavedAccount;
}

const initialState: IAuthState = {
	token: "",
	refreshToken: "",
	authority: [],
	savedAccount: undefined,
};

// define slice
export const authStore = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAppToken: (state, action: PayloadAction<{token: string, refreshToken: string}>) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
		},
		logout: (state) => {
			state.token = "";
			state.refreshToken = "";
			state.authority = [];
		},
		setSavedAccount: (
			state,
			action: PayloadAction<ISavedAccount | undefined>
		) => {
			state.savedAccount = action.payload;
		},
	},
});

export default authStore.reducer;
