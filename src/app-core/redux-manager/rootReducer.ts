import { combineReducers } from '@reduxjs/toolkit';
import { fetchReducer } from '../../services';

import { storeCollection } from '../../store';

const reducerConfiguration = {
    ...storeCollection,
    ...fetchReducer
}
export default combineReducers(reducerConfiguration);