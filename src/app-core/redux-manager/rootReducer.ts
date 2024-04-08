import { combineReducers } from '@reduxjs/toolkit';

import { fetchReducer } from '@libs/features/services';
import { storeCollection } from '@libs/features/store';

const rootReducer = combineReducers({
    ...storeCollection,
    ...fetchReducer
})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
