import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';

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
    <Card
      data-testid="movie-card"
      sx={{ height: '100%', position: 'relative', backgroundColor: grey[600] }}
    >
      <CardMedia
        component="img"
        sx={{ height: 'inherit', aspectRatio: '2/3' }}
        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />

      <Box
        className="card-actions"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 1,
          height: 36,
          padding: '0px 4px 0px 4px',
          borderRadius: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <IconButton
          data-testid={`favorite-button-${movie.id}`}
          onClick={onFavoriteClick}
          aria-label="Mark favorite"
        >
          <FavoriteIcon color={favorite ? 'error' : 'inherit'} />
        </IconButton>
        <IconButton
          data-testid={`watch-later-button-${movie.id}`}
          aria-label="Mark watch later"
          onClick={onWatchLaterClick}
        >
          <WatchLaterIcon color={watchLater ? 'info' : 'inherit'} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;
