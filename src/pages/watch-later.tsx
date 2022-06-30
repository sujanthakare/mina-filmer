import { Divider, Typography } from '@mui/material';

import useWatchList from '../data/hooks/useWatchList';
import MovieGrid from '../widgets/movie-grid';

const WatchLater = () => {
  const { watchList } = useWatchList();

  return (
    <>
      <Typography component="h1" fontWeight="bold">
        WATCH LATER
      </Typography>
      <Divider sx={{ m: 1 }} />

      <MovieGrid movies={watchList} />
    </>
  );
};

export default WatchLater;
