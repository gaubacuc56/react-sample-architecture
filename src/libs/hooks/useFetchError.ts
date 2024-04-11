import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { HttpErrorMessage } from "@app-core/@types/http";

export const useFetchError = (
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
