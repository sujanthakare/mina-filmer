import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';

import useFavorites from './useFavorites';

import { IMovie } from '../types';

const render_useFavoritesHook = () => {
  const mockStore = configureStore({ reducer: {} });

  const wrapper = ({ children }: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return renderHook(() => useFavorites(), {
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

describe('useFavorites', () => {
  it('should return empty favorites by default', () => {
    const { result } = render_useFavoritesHook();

    expect(result.current.favorites).toEqual([]);
  });

  it('should add movie to favorites', () => {
    const { result } = render_useFavoritesHook();

    act(() => {
      result.current.addFavorite(mockedMovie);
    });

    expect(result.current.favorites).toContain(mockedMovie);
  });

  it('should avoid adding duplicate movies in favorites', () => {
    const { result } = render_useFavoritesHook();

    act(() => {
      result.current.addFavorite(mockedMovie);
    });

    act(() => {
      result.current.addFavorite(mockedMovie);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites).toContain(mockedMovie);
  });

  it('should remove movie from favorites', () => {
    const { result } = render_useFavoritesHook();

    act(() => {
      result.current.addFavorite(mockedMovie);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites).toContain(mockedMovie);

    act(() => {
      result.current.removeFavorite(mockedMovie);
    });

    expect(result.current.favorites).toHaveLength(0);
  });
});
