import { useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import StorageService from '../services/storage-service';
import { injectLazyReducer, useAppDispatch } from '../store';
import { IMovie } from '../types';

const FAVORITE_LIST = 'FAVORITE_LIST';

type PartialStoreState = {
  favorites: Array<IMovie>;
};

/**
 *
 *
 */

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: StorageService.get<Array<IMovie>>(FAVORITE_LIST) || [],
  reducers: {
    addItem: (state, { payload }: PayloadAction<IMovie>) => {
      state.push(payload);
      StorageService.save(FAVORITE_LIST, state);
    },
    removeItem: (state, { payload }: PayloadAction<IMovie>) => {
      const newState = state.filter((item) => item.id !== payload.id);
      StorageService.save(FAVORITE_LIST, state);
      return newState;
    },
  },
});

/**
 *
 *
 *
 */

const useFavorites = () => {
  const store = useStore();
  const dispatch = useAppDispatch();
  injectLazyReducer(store, {
    key: favoriteSlice.name,
    reducer: favoriteSlice.reducer,
  });

  const favorites = useSelector((state: PartialStoreState) => state.favorites);

  const addFavorite = useCallback(
    (item: IMovie) => {
      dispatch(favoriteSlice.actions.addItem(item));
    },
    [dispatch]
  );

  const removeFavorite = useCallback(
    (item: IMovie) => {
      dispatch(favoriteSlice.actions.removeItem(item));
    },
    [dispatch]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
