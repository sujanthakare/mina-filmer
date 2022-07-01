import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Card, CardActions, CardMedia, IconButton } from '@mui/material';

type Props = {
  movie: { title: string; poster_path: string; id: number };
  favorite?: boolean;
  watchLater?: boolean;
  onFavoriteClick?: () => void;
  onWatchLaterClick?: () => void;
};

const MovieCard = ({
  movie,
  onFavoriteClick,
  onWatchLaterClick,
  favorite,
  watchLater,
}: Props) => {
  return (
    <Card data-testId="movie-card">
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <CardActions>
        <IconButton
          data-testId={`favorite-button-${movie.id}`}
          onClick={onFavoriteClick}
          aria-label="Mark favorite"
        >
          <FavoriteIcon color={favorite ? 'error' : 'inherit'} />
        </IconButton>
        <IconButton
          data-testId={`watch-later-button-${movie.id}`}
          aria-label="Mark watch later"
          onClick={onWatchLaterClick}
        >
          <WatchLaterIcon color={watchLater ? 'info' : 'inherit'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
