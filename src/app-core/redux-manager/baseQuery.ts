import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_PREFIX } from "@/constant/http.constant";

export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_PREFIX}`,
})