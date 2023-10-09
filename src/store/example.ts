import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const name = 'login';

const initialState = {
    token: '',
};
const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});


const { login } = userSlice.actions;

export const loginActions = { login };

export default userSlice.reducer;
