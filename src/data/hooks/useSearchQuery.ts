import { useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { injectLazyReducer, useAppDispatch } from '../store';

type PartialStoreState = {
  searchQuery: {
    queryText: string;
    queryPage: number;
  };
};

/**
 *
 *
 */

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: {
    queryText: '',
    queryPage: 1,
  },
  reducers: {
    setText: (state, { payload }: PayloadAction<string>) => {
      state.queryText = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.queryPage = payload;
    },
  },
});

/**
 *
 *
 *
 */

const useSearchQuery = () => {
  const store = useStore();
  const dispatch = useAppDispatch();
  injectLazyReducer(store, {
    key: searchQuerySlice.name,
    reducer: searchQuerySlice.reducer,
  });

  const { queryPage, queryText } = useSelector(
    (state: PartialStoreState) => state.searchQuery
  );

  const setQueryText = useCallback(
    (text: string) => {
      dispatch(searchQuerySlice.actions.setText(text));
    },
    [dispatch]
  );

  const setQueryPage = useCallback(
    (page: number) => {
      dispatch(searchQuerySlice.actions.setPage(page));
    },
    [dispatch]
  );

  return {
    queryPage,
    queryText,
    setQueryPage,
    setQueryText,
  };
};

export default useSearchQuery;
