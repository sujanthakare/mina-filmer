import { fireEvent, render, screen } from '@testing-library/react';

import MovieCard from './movie-card';

describe('MovieCard', () => {
  it('should call onFavoriteClick if click on mark favorite button', () => {
    const mocked_onFavoriteClick = jest.fn();
    render(
      <MovieCard
        onFavoriteClick={mocked_onFavoriteClick}
        movie={{
          id: 1,
          title: 'TITLE',
          poster_path: 'POST_PATH',
        }}
      />
    );

    const favoriteButton = screen.getByTestId('favorite-button-1');

    fireEvent.click(favoriteButton);

    expect(mocked_onFavoriteClick).toBeCalledTimes(1);
  });

  it('should call onWatchLaterClick if click on mark watch later button', () => {
    const mocked_onWatchLaterClick = jest.fn();
    render(
      <MovieCard
        onWatchLaterClick={mocked_onWatchLaterClick}
        movie={{
          id: 1,
          title: 'TITLE',
          poster_path: 'POST_PATH',
        }}
      />
    );

    const watchLaterButton = screen.getByTestId('watch-later-button-1');

    fireEvent.click(watchLaterButton);

    expect(mocked_onWatchLaterClick).toBeCalledTimes(1);
  });

  it('should match snapshot with movie', () => {
    const { container } = render(
      <MovieCard
        movie={{
          id: 1,
          title: 'TITLE',
          poster_path: 'POST_PATH',
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot if movie is marked as favorite and watch later', () => {
    const { container } = render(
      <MovieCard
        favorite
        watchLater
        movie={{
          id: 1,
          title: 'TITLE',
          poster_path: 'POST_PATH',
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
