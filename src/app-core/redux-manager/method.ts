/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedError, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { StoreState, _storeReducer } from "./rootReducer";
import { HttpErrorMessage } from "../@types/http";

const ConfigureStore = configureStore({
	reducer: _storeReducer,
});
export type AppDispatch = typeof ConfigureStore.dispatch;
interface DataContainer<T> {
	data: T;
}

interface ErrorContainer {
	error: FetchBaseQueryError | SerializedError;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export const catchHttpError = (
	error: FetchBaseQueryError | SerializedError | undefined
) => {
	let errMsg = undefined;
	let errStatus = undefined;
	if (error && "data" in error && "status" in error) {
		errMsg = (error.data as HttpErrorMessage).message;
		errStatus = error.status;
	}
	return { errMsg, errStatus };
};

// Use when we need to get response data right after the Mutation request succeed.
// Example: get token after login.
export const catchMutationData = <T>(
	data: DataContainer<T> | ErrorContainer
) => {
	let res: T | undefined = undefined;
	if ("data" in data) {
		res = data.data;
	}
	return res;
};
