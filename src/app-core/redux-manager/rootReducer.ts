import { combineReducers } from '@reduxjs/toolkit';

import { fetchReducer } from '@/features/services';
import { storeCollection } from '@/features/store';

const rootReducer = combineReducers({
    ...storeCollection,
    ...fetchReducer
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
