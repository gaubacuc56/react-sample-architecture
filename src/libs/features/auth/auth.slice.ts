import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@app-core/redux-manager/rootReducer';
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

// export state
export const appToken = (state: RootState) => state.authReducer.token;
export const userAuthority = (state: RootState) => state.authReducer.authority;
export const savedAccount = (state: RootState) => state.authReducer.savedAccount;

// export action
export const { setAppToken, logout, setSavedAccount } = authStore.actions;
export default authStore.reducer;