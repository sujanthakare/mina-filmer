import { Divider, Typography } from '@mui/material';

import useFavorites from '../data/hooks/useFavorites';
import MovieGrid from '../widgets/movie-grid';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <Typography component="h1" fontWeight="bold">
        FAVORITES
      </Typography>
      <Divider sx={{ m: 1 }} />

      <MovieGrid movies={favorites} />
    </>
  );
};

export default Favorites;
