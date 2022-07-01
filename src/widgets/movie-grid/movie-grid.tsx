import { TransitionGroup } from 'react-transition-group';

import { Fade, Grid } from '@mui/material';

import useFavorites from '../../data/hooks/useFavorites';
import useWatchList from '../../data/hooks/useWatchList';
import { IMovie } from '../../data/types';
import MovieCard from '../../ui/movie-card';

type Props = {
  movies: Array<IMovie>;
};

const MovieGrid = ({ movies = [] }: Props) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const { addToWatchList, removeFromWatchList, watchList } = useWatchList();

  if (!movies.length) {
    return null;
  }

  return (
    <Grid container spacing={1} component={TransitionGroup} pb={10}>
      {movies.map((item, index) => {
        if (!item.poster_path) {
          return null;
        }

        const isFavorite = favorites.some(
          (favorite) => favorite.id === item.id
        );

        const isInWatchList = watchList.some(
          (watchListItem) => watchListItem.id === item.id
        );

        return (
          <Fade in key={item.id}>
            <Grid item xs={6} md={3} xl={3}>
              <MovieCard
                movie={{
                  id: item.id,
                  title: item.title,
                  poster_path: item.poster_path,
                }}
                favorite={isFavorite}
                watchLater={isInWatchList}
                onFavoriteClick={() => {
                  if (isFavorite) {
                    return removeFavorite(item);
                  }
                  addFavorite(item);
                }}
                onWatchLaterClick={() => {
                  if (isInWatchList) {
                    return removeFromWatchList(item);
                  }
                  addToWatchList(item);
                }}
              />
            </Grid>
          </Fade>
        );
      })}
    </Grid>
  );
};

export default MovieGrid;
