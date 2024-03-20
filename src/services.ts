// Common configuration
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './app-core/config';
// Api slices import
import { authService } from './features/auth/auth.service';

// App base query
export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}`,
})

export const fetchReducer = {
    [authService.reducerPath]: authService.reducer
}
export const fetchMiddleware = [
    authService
]