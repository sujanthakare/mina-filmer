import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResponse } from './types';
import { urlQueryBuilder } from './utils';

const BASE_URL = `${process.env.REACT_APP_TMDB_API_URL}/3`;

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 360,
  endpoints: (builder) => ({
    /**
     *
     *  Search movies
     */
    searchMovies: builder.query<
      SearchResponse,
      { page: number; searchQuery: string }
    >({
      query: (inputs) => {
        const queryParams = urlQueryBuilder()
          .add('api_key', `${process.env.REACT_APP_TMDB_API_KEY}`)
          .add('language', 'en-US')
          .add('page', `${inputs.page}`)
          .add('query', inputs.searchQuery)
          .build();

        return `/search/movie?${queryParams}`;
      },
    }),
  }), // endPoints
});

export default queryApi;
