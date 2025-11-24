import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
    }),
    endpoints: (builder) => ({
        
        generateEstimate: builder.mutation({
            query: (data) => ({
                url: "/estimate",
                method: "POST",
                body: data,
            }),
        }),
    
    }),
});

export const {useGenerateEstimateMutation} = api;