import { Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/SearchRounded';
import { Button, Grid, Typography } from '@mui/material';

const Header = () => {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item xs={18}>
        <Typography fontWeight="bold" fontSize={23} textAlign="center">
          Mina Filmer
        </Typography>
      </Grid>
      <Grid item>
        <Button
          aria-label="Navigate to Search"
          component={Link}
          to="/"
          variant="outlined"
        >
          <SearchIcon />
        </Button>
      </Grid>
      <Grid item>
        <Button
          aria-label="Navigate to favorites"
          component={Link}
          to="/favorites"
          variant="outlined"
        >
          Favorites
        </Button>
      </Grid>
      <Grid item>
        <Button
          aria-label="Navigate to watch later"
          component={Link}
          to="/watch-later"
          variant="outlined"
        >
          Watch Later
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
