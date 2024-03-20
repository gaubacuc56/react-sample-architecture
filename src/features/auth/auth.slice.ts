import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export const { login } = authStore.actions;
export default authStore.reducer;