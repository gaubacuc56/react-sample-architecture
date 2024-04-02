/**
 * Reducer name convention : {feature_name}+Reducer
 * @example
 * import exampleReducer from "example/example.slices"
 */
import authReducer from "./auth/auth.slice"
import themeReducer from "./theme/theme.slice"
import localeReducer from "./locale/locale.slice"

export const storeCollection = {
    authReducer: authReducer,
    themeReducer: themeReducer,
    localeReducer: localeReducer
}