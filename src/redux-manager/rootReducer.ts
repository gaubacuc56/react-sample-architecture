import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { fetchCollection } from '../services';
import { storeCollection } from '../store';

interface IRtkQueryConfig {
    [name: string]: Reducer
}

const rtkQueryConfig: IRtkQueryConfig = {};

fetchCollection.forEach(item => {
    rtkQueryConfig[`${[item.reducerPath]}`] = item.reducer
})

const reducerConfiguration = {
    ...storeCollection,
    ...rtkQueryConfig
}
export default combineReducers(reducerConfiguration);