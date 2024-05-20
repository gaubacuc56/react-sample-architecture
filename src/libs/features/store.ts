/**
 * Reducer name convention : {feature_name}+Reducer
 * @example
 * import exampleReducer from "example/example.slices"
 */
import authReducer from "./auth/slice";
import themeReducer from "./theme/slice";
import appCommonReducer from "./app-common/slice";

// export for redux configuration
export const storeReducer = {
	authReducer,
	themeReducer,
	appCommonReducer,
};

// export for internal usage
export * from "./auth/operation";
export * from "./theme/operation";
export * from "./app-common/operation";
