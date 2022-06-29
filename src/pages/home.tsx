import React, { useState } from 'react';

import { Container, Divider, Grid } from '@mui/material';

import { SearchResponse, searchMovies } from '../data/api';
import MovieCard from '../ui/movie-card';
import SearchField from '../ui/search-field';

const Home = () => {
  const [searchResponse, setSearchResponse] = useState<
    SearchResponse | undefined
  >();

  return (
    <Container maxWidth="xl">
      <SearchField
        value=""
        onChange={(newValue) => {
          if (!newValue) {
            return;
          }

          searchMovies(newValue).then((response) => {
            setSearchResponse(response);
          });
        }}
      />

      <Divider sx={{ margin: 2 }} />

      {searchResponse && (
        <Grid container spacing={1}>
          {searchResponse.results?.map((item) => {
            if (!item.poster_path) {
              return null;
            }

            return (
              <Grid key={item.id} item xs={6} md={4} xl={3}>
                <MovieCard
                  data={{
                    id: item.id,
                    original_language: item.original_language,
                    original_title: item.original_language,
                    poster_path: item.poster_path,
                    title: item.title,
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
