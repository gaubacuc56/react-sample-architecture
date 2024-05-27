/* eslint-disable @typescript-eslint/no-unused-vars */
export const toQueryString = <T>(params: Partial<T>): string => {
	return Object.entries(params)
		.filter(([_, value]) => value !== undefined)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
		)
		.join("&");
};
