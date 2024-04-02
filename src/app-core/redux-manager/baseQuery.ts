import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_PREFIX } from "../config";

export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_PREFIX}`,
})