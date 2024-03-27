import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app-core/redux-manager/rootReducer';

// define state
interface IAuthState {
    token : string
}
const initialState: IAuthState = {
   token: '',
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
export const authToken = (state: RootState) => state.authReducer.token;

// export action
export const { setAppToken, logout } = authStore.actions;
export default authStore.reducer;