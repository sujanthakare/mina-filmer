import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Card, CardActions, CardMedia, IconButton } from '@mui/material';

type Props = {
  movie: { title: string; poster_path: string };
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
    <Card>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <CardActions>
        <IconButton onClick={onFavoriteClick}>
          <FavoriteIcon color={favorite ? 'error' : 'inherit'} />
        </IconButton>
        <IconButton onClick={onWatchLaterClick}>
          <WatchLaterIcon color={watchLater ? 'info' : 'inherit'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
