import { mockedMovies } from './__fixtures';

import { fireEvent, render, screen } from '@testing-library/react';

import * as useFavorites from '../../data/hooks/useFavorites';
import * as useWatchList from '../../data/hooks/useWatchList';
import { IMovie } from '../../data/types';

import MovieGrid from './movie-grid';

const mocked_useFavorite = jest.spyOn(useFavorites, 'default');
const mocked_useWatchList = jest.spyOn(useWatchList, 'default');

describe('MovieGrid', () => {
  const mocked_addFavorite = jest.fn();
  const mocked_removeFavorite = jest.fn();

  const mocked_addToWatchList = jest.fn();
  const mocked_removeFromWatchList = jest.fn();

  const mockHooks = (
    defaultData: {
      favorites?: Array<IMovie>;
      watchLater?: Array<IMovie>;
    } = {}
  ) => {
    mocked_useFavorite.mockImplementation(() => ({
      addFavorite: mocked_addFavorite,
      removeFavorite: mocked_removeFavorite,
      favorites: defaultData.favorites || [],
    }));

    mocked_useWatchList.mockImplementation(() => ({
      addToWatchList: mocked_addToWatchList,
      removeFromWatchList: mocked_removeFromWatchList,
      watchList: defaultData.watchLater || [],
    }));
  };

  beforeEach(() => {
    mocked_useFavorite.mockClear();
    mocked_useWatchList.mockClear();

    mocked_addFavorite.mockClear();
    mocked_removeFavorite.mockClear();

    mocked_addToWatchList.mockClear();
    mocked_removeFromWatchList.mockClear();
  });

  it('should render null if passed empty movie array', () => {
    mockHooks();
    const { container } = render(<MovieGrid movies={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render all movies', () => {
    mockHooks();
    render(<MovieGrid movies={mockedMovies} />);

    const items = screen.getAllByTestId('movie-card');

    expect(items).toHaveLength(mockedMovies.length);
  });

  it('should call addFavorite if click on mark as favorite button', () => {
    mockHooks();

    render(<MovieGrid movies={mockedMovies} />);

    const movieToAdd = mockedMovies[0];

    const favoriteButton = screen.getByTestId(
      'favorite-button-' + movieToAdd.id
    );

    fireEvent.click(favoriteButton);

    expect(mocked_addFavorite).toBeCalledWith(movieToAdd);
  });

  it('should call removeFavorite when click on mark as favorite if movie is favorite', () => {
    const movieToAdd = mockedMovies[0];
    mockHooks({ favorites: [movieToAdd] });

    render(<MovieGrid movies={mockedMovies} />);

    const favoriteButton = screen.getByTestId(
      'favorite-button-' + movieToAdd.id
    );

    fireEvent.click(favoriteButton);

    expect(mocked_removeFavorite).toBeCalledWith(movieToAdd);
  });

  it('should call addToWatchList if click on mark as watch later button', () => {
    mockHooks();

    render(<MovieGrid movies={mockedMovies} />);

    const movieToAdd = mockedMovies[0];

    const watchLaterButton = screen.getByTestId(
      'watch-later-button-' + movieToAdd.id
    );

    fireEvent.click(watchLaterButton);

    expect(mocked_addToWatchList).toBeCalledWith(movieToAdd);
  });

  it('should call removeFromWatchList when click on mark as watch later if movie is already watch list', () => {
    const movieToAdd = mockedMovies[0];
    mockHooks({ watchLater: [movieToAdd] });

    render(<MovieGrid movies={mockedMovies} />);

    const watchLaterButton = screen.getByTestId(
      'watch-later-button-' + movieToAdd.id
    );

    fireEvent.click(watchLaterButton);

    expect(mocked_removeFromWatchList).toBeCalledWith(movieToAdd);
  });
});
