import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRouteState {
    currentRouteKey: string;
}

export const initialState: IRouteState = {
    currentRouteKey: "",
};

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload;
        },
    },
});

export const { setCurrentRouteKey } = routeSlice.actions;

export default routeSlice.reducer;
