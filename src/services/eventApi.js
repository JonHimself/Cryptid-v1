import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const eventHeaders = {
  "x-rapidapi-host": "coingecko.p.rapidapi.com",
  "x-rapidapi-key": "d807e25ba2mshbe2e6f806e6c3c0p15218djsnbff9f0a79c5f",
};

const baseUrl = "https://coingecko.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: eventHeaders,
});

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => createRequest("/events"),
    }),
  }),
});

export const { useGetEventQuery } = eventApi;
