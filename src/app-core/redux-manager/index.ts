import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from "redux-persist";

import rootReducer from "./rootReducer";
import { rtkQueryMiddleware } from "./baseQuery";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [""],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			rtkQueryMiddleware.map((item) => item.middleware)
		),
	devTools: true,
});
setupListeners(store.dispatch);
export default store;
