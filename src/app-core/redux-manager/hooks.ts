/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { StoreState, storeReducer } from './rootReducer';

const ConfigureStore = configureStore({
    reducer: storeReducer,
  })
export type AppDispatch = typeof ConfigureStore.dispatch
  
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector