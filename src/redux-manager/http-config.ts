import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constant/baseUrl';
export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
})