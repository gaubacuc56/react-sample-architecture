import { toast } from "react-toastify";
import {
	isRejectedWithValue,
	Middleware,
	AnyAction,
	isFulfilled,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";

import { HttpResponse } from "@app-core/@types/http";

const errorNotify = (action: AnyAction) => {
	const error = action.payload as FetchBaseQueryError;
	const msg = (error.data as HttpResponse).message;
	if (msg) toast.error(msg);
};

const successNotify = (action: AnyAction) => {
	const res = action.payload as HttpResponse;
	if (res.message) toast.success(res.message);
};

export const notifyRtkQueryOutcome: Middleware =
	() => (next) => (action: AnyAction) => {
		if (isRejectedWithValue(action)) {
			errorNotify(action);
		} else if (isFulfilled(action)) {
			successNotify(action);
		}
		return next(action);
	};
