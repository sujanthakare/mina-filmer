import { useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import StorageService from '../services/storage-service';
import { injectLazyReducer, useAppDispatch } from '../store';
import { IMovie } from '../types';

const WATCH_LIST = 'WATCH_LIST';

type PartialStoreState = {
  watchList: Array<IMovie>;
};

/**
 *
 *
 */

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: StorageService.get<Array<IMovie>>(WATCH_LIST) || [],
  reducers: {
    addItem: (state, { payload }: PayloadAction<IMovie>) => {
      if (!state.some((item) => item.id === payload.id)) {
        state.push(payload);
        StorageService.save(WATCH_LIST, state);
      }
    },
    removeItem: (state, { payload }: PayloadAction<IMovie>) => {
      const newState = state.filter((item) => item.id !== payload.id);
      StorageService.save(WATCH_LIST, state);
      return newState;
    },
  },
});

/**
 *
 *
 *
 */

const useWatchList = () => {
  const store = useStore();
  const dispatch = useAppDispatch();
  injectLazyReducer(store, {
    key: watchListSlice.name,
    reducer: watchListSlice.reducer,
  });

  const watchList = useSelector((state: PartialStoreState) => state.watchList);

  const addToWatchList = useCallback(
    (item: IMovie) => {
      dispatch(watchListSlice.actions.addItem(item));
    },
    [dispatch]
  );

  const removeFromWatchList = useCallback(
    (item: IMovie) => {
      dispatch(watchListSlice.actions.removeItem(item));
    },
    [dispatch]
  );

  return {
    watchList,
    addToWatchList,
    removeFromWatchList,
  };
};

export default useWatchList;
