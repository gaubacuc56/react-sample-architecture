/**
 * Reducer name convention : {feature_name}+Reducer
 * @example
 * import exampleReducer from "example/example.slices"
 */
import authReducer from "./auth/auth.slice";
import themeReducer from "./theme/theme.slice";
import appCommonReducer from "./app-common/app-common.slice";

// export for redux configuration
export const storeReducer = {
	authReducer,
	themeReducer,
	appCommonReducer,
};

// export for internal usage
export * from "./auth/auth.slice";
export * from "./theme/theme.slice";
export * from "./app-common/app-common.slice";
