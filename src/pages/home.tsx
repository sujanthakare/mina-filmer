import { Box, CircularProgress, Divider, Pagination } from '@mui/material';

import useSearchMovies from '../data/hooks/useSearchMovies';
import useSearchQuery from '../data/hooks/useSearchQuery';
import SearchField from '../ui/search-field';
import MovieGrid from '../widgets/movie-grid';

const Home = () => {
  const { queryText, queryPage, setQueryPage, setQueryText } = useSearchQuery();
  const { data, isLoading } = useSearchMovies(queryText, queryPage);

  const renderMovies = () => {
    if (!data) {
      return null;
    }

    if (isLoading) {
      return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />;
        </Box>
      );
    }

    return (
      <>
        <MovieGrid movies={data.results} />
        <Divider sx={{ margin: 2 }} />
        <Box justifyContent="center" display="flex" pb={5}>
          <Pagination
            page={queryPage}
            count={data.total_pages}
            variant="outlined"
            shape="rounded"
            onChange={(e, page) => {
              setQueryPage(page);
            }}
          />
        </Box>
      </>
    );
  };

  return (
    <Box>
      <SearchField
        loading={isLoading}
        value={queryText}
        onChange={(newValue) => setQueryText(newValue)}
      />

      <Divider sx={{ margin: 2 }} />
      {renderMovies()}
    </Box>
  );
};

export default Home;
