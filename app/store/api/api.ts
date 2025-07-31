import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { environment } from "@/app/environment";

import { LocationCoordinates } from "@/app/hooks";
import {
  SearchLocation,
  SearchLocationResponse,
  WeatherResponse,
} from "../types";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiUrl,
  }) as BaseQueryFn<string | FetchArgs, unknown, unknown, {}>,
  tagTypes: ["Weather"],

  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, LocationCoordinates>({
      query: ({ latitude, longitude }) => ({
        url: `data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.weatherApiKey}`,
      }),
    }),
    getLocations: builder.query<SearchLocationResponse, SearchLocation>({
      query: ({ city }) => ({
        url: `geo/1.0/direct?q=${city}&limit=5&appid=${environment.weatherApiKey}`,
      }),
    }),
  }),
});

export const { useGetWeatherQuery, useLazyGetLocationsQuery } = api;
export { api };
