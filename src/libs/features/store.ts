/**
 * Reducer name convention : {feature_name}+Reducer
 * @example
 * import exampleReducer from "example/example.slices"
 */
import authReducer from "./auth/auth.slice"
import themeReducer from "./theme/theme.slice"
import localeReducer from "./locale/locale.slice"
import routeReducer from "./route/route.slice"

// export for redux configuration
export const storeReducer = {
    authReducer,
    themeReducer,
    localeReducer,
    routeReducer
}

// export for internal usage
export * from "./auth/auth.slice"
export * from "./theme/theme.slice"
export * from "./locale/locale.slice"
export * from "./route/route.slice"