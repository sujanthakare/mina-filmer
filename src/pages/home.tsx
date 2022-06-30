import { Box, Divider, Pagination } from '@mui/material';

import useSearchMovies from '../data/hooks/useSearchMovies';
import useSearchQuery from '../data/hooks/useSearchQuery';
import SearchField from '../ui/search-field';
import MovieGrid from '../widgets/movie-grid';

const Home = () => {
  const { queryText, queryPage, setQueryPage, setQueryText } = useSearchQuery();
  const { data, isLoading } = useSearchMovies(queryText, queryPage);

  return (
    <Box>
      <SearchField
        loading={isLoading}
        value={queryText}
        onChange={(newValue) => setQueryText(newValue)}
      />

      <Divider sx={{ margin: 2 }} />
      {data && <MovieGrid movies={data.results || []} />}
      <Divider sx={{ margin: 2 }} />
      {data && (
        <Box justifyContent="center" display="flex">
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
      )}
    </Box>
  );
};

export default Home;
