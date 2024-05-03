import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface DataContainer<T> {
	data: T;
}

interface ErrorContainer {
	error: FetchBaseQueryError | SerializedError;
}

export const getMutationData = <T>(data: DataContainer<T> | ErrorContainer) => {
	let res: T | undefined = undefined;
	if ("data" in data) {
		res = data.data;
	}
	return res;
};
