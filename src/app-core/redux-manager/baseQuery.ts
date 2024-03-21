import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "../config";

export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}`,
})