import { authenApi } from "./authen";

export const fetchReducer = {
    [authenApi.reducerPath]: authenApi.reducer
}
export const fetchMiddleware = [
    authenApi
]