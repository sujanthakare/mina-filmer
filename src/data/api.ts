export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type SearchResponse = {
  page: number;
  results: Array<IMovie>;
  total_pages: number;
  total_results: number;
};

export const searchMovies = async (
  searchQuery: string,
  page = 1
): Promise<SearchResponse | undefined> => {
  const url = new URL(`${process.env.REACT_APP_TMDB_API_URL}/3/search/movie`);

  url.search = new URLSearchParams({
    api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
    language: 'en-US',
    page: page.toString(),
    include_adult: 'false',
    query: searchQuery,
  }).toString();

  try {
    const res = await fetch(url);
    return await res.json();
  } catch {}
};
