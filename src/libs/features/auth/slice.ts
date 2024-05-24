import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISavedAccount } from "./interface";

// define state
export interface IAuthState {
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
export const authStore = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAppToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		logout: (state) => {
			state.token = "";
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
