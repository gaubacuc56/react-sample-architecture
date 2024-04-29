import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISavedAccount } from './auth.interfaces';

// define state
interface IAuthState {
    token : string,
    authority: string[],
    savedAccount? : ISavedAccount
}

const initialState: IAuthState = {
   token: '',
   authority: [],
   savedAccount: undefined
};

// define slice
const authStore = createSlice({
    name:'login',
    initialState,
    reducers: {
        setAppToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout : (state) => {
            state.token = ""
            state.authority = []
            window.location.reload();
        },
        setSavedAccount: (state, action: PayloadAction<ISavedAccount|undefined>) => {
            state.savedAccount = action.payload
        },
    },
});

// export action
export const { setAppToken, logout, setSavedAccount } = authStore.actions;
export default authStore.reducer;