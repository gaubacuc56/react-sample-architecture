import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "@app-core/redux-manager/baseQuery";

export const LiveScoreService = createApi({
    reducerPath: "LiveScoreService",
    baseQuery: baseQueryWithReAuth("https://api.sportmonks.com/v3/football", {
        override: true,
        headers: {
            Authorization:
                "qBbxjCbfd5Zu23lw0UAhl6wInv7PXcUbkjEYK7dX0SwfEhGBXNuPFXvPnAZk",
            "Content-Type": "application/json",
        },
    }),
    endpoints: () => ({}),
});
