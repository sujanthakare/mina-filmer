import { useDispatch } from 'react-redux';

import {
  Reducer,
  Store,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import queryApi from './query-api';

const lazyReducers = {} as Record<string, Reducer<any>>;
const combineAppReducer = () => {
  const defaultReducers = {
    [queryApi.reducerPath]: queryApi.reducer,
  };

  return combineReducers({
    ...defaultReducers,
    ...lazyReducers,
  });
};

export const injectLazyReducer = (
  currentStore: Store,
  reducerMap: {
    key: string;
    reducer: Reducer<any>;
  }
) => {
  if (lazyReducers[reducerMap.key]) {
    return;
  }
  lazyReducers[reducerMap.key] = reducerMap.reducer;
  currentStore.replaceReducer(combineAppReducer());
};

const store = configureStore({
  reducer: combineAppReducer(),
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queryApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
