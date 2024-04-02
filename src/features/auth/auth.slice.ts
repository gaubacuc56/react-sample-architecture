import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app-core/redux-manager/rootReducer';

// define state
interface IAuthState {
    token : string,
    authority?: string[]
}
const initialState: IAuthState = {
   token: '',
   authority: []
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
        }
    },
});

// export state
export const appToken = (state: RootState) => state.authReducer.token;
export const userAuthority = (state: RootState) => state.authReducer.authority;

// export action
export const { setAppToken, logout } = authStore.actions;
export default authStore.reducer;