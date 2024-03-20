/**
 * Reducer name convention : {feature_name}+Reducer
 * @example
 * import exampleReducer from "example/example.slices"
 */
import authReducer from "./features/auth/auth.slice"

export const storeCollection = {
    authReducer: authReducer
}