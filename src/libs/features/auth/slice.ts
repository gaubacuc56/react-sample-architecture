import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ISavedAccount } from "./interface";
import { authService } from "./service";

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
		setAppToken: (state, action: PayloadAction<{ token: string, refreshToken: string }>) => {
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
	extraReducers: (builder) => {
		builder.addMatcher(
			isAnyOf(authService.endpoints.login.matchFulfilled),
			(state, { payload }) => {
				state.token = payload.data.token;
				state.refreshToken = payload.data.refreshToken;
			}
		);
	},
});

export default authStore.reducer;
