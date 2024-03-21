import { combineReducers } from '@reduxjs/toolkit';
import { fetchReducer } from '../../features/services';

import { storeCollection } from '../../features/store';

const reducerConfiguration = {
    ...storeCollection,
    ...fetchReducer
}
export default combineReducers(reducerConfiguration);