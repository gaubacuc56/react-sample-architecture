import { combineReducers } from '@reduxjs/toolkit';

import { rtkQueryService } from '@libs/features/services';
import { storeReducer } from '@libs/features/store';

export const _storeReducer = combineReducers({
    ...storeReducer,
})

export type StoreState = ReturnType<typeof _storeReducer>

const rootReducer = combineReducers({
    ...storeReducer,
    ...rtkQueryService
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;



