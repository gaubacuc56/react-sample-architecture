import { AnyAction, isFulfilled, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { toast } from "react-toastify";
import { HttpError, HttpStatus } from "@app-core/@types/http";

const excludeErrorEndpoints = [""];
const excludeSuccessEndpoints = [""];

const errorNotify = (action: AnyAction) => {
    const endpointName = action.meta?.arg?.endpointName;
    const error = action.payload as FetchBaseQueryError;
    const status = error.status as number;
    const msg = (error.data as HttpError).message;
    if (
        msg &&
        status !== HttpStatus.UNAUTHORIZED &&
        !excludeErrorEndpoints.includes(endpointName)
    )
        toast.error(msg);
};

const successNotify = (action: AnyAction) => {
    const endpointName = action.meta?.arg?.endpointName;
    const msg = action.payload?.message; // Assuming the payload contains a message field
    if (msg && !excludeSuccessEndpoints.includes(endpointName)) {
        toast.success(msg);
    }
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
