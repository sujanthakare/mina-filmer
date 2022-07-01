import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';

import useWatchList from './useWatchList';

import { IMovie } from '../types';

const render_useWatchListHook = () => {
  const mockStore = configureStore({ reducer: {} });

  const wrapper = ({ children }: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return renderHook(() => useWatchList(), {
    wrapper,
  });
};

const mockedMovie: IMovie = {
  adult: false,
  backdrop_path: '/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg',
  genre_ids: [28, 12, 878],
  id: 299537,
  original_language: 'en',
  original_title: 'Captain Marvel',
  overview: 'The story follows Carol Danvers',
  popularity: 114.932,
  poster_path: '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  release_date: '2019-03-06',
  title: 'Captain Marvel',
  video: false,
  vote_average: 6.9,
  vote_count: 13189,
};

describe('useWatchList', () => {
  it('should return empty watch-list by default', () => {
    const { result } = render_useWatchListHook();

    expect(result.current.watchList).toEqual([]);
  });

  it('should add movie to watch-list', () => {
    const { result } = render_useWatchListHook();

    act(() => {
      result.current.addToWatchList(mockedMovie);
    });

    expect(result.current.watchList).toContain(mockedMovie);
  });

  it('should avoid adding duplicate movies in watch-list', () => {
    const { result } = render_useWatchListHook();

    act(() => {
      result.current.addToWatchList(mockedMovie);
    });

    act(() => {
      result.current.addToWatchList(mockedMovie);
    });

    expect(result.current.watchList).toHaveLength(1);
    expect(result.current.watchList).toContain(mockedMovie);
  });

  it('should remove movie from watch-list', () => {
    const { result } = render_useWatchListHook();

    act(() => {
      result.current.addToWatchList(mockedMovie);
    });

    expect(result.current.watchList).toHaveLength(1);
    expect(result.current.watchList).toContain(mockedMovie);

    act(() => {
      result.current.removeFromWatchList(mockedMovie);
    });

    expect(result.current.watchList).toHaveLength(0);
  });
});
