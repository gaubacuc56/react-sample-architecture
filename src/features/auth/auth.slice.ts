import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app-core/redux-manager/rootReducer';

const name = 'login';

const initialState = {
    token: '',
};
const authStore = createSlice({
    name,
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const authToken = (state: RootState) => state.authReducer.token;

// const currentUser = createSelector(selector, ({ user }) => user);
// const currentToken = createSelector(selector, ({ token }) => token);

//export const loginSelector = { currentUser, currentToken };

export const { login } = authStore.actions;
export default authStore.reducer;