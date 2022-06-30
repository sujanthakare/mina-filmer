import queryApi from '../query-api';

const useSearchMovies = (searchQuery: string, page = 1) => {
  const { data, isLoading, isFetching } = queryApi.useSearchMoviesQuery(
    { page, searchQuery },
    { skip: !searchQuery }
  );

  return {
    data,
    isLoading: isLoading || isFetching,
  };
};

export default useSearchMovies;
