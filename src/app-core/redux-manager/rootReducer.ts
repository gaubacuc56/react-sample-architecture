import { combineReducers } from '@reduxjs/toolkit';

import { fetchReducer } from '@libs/features/services';
import { storeCollection } from '@libs/features/store';

export const storeReducer = combineReducers({
    ...storeCollection,
})

export type StoreState = ReturnType<typeof storeReducer>

const rootReducer = combineReducers({
    ...storeCollection,
    ...fetchReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;



