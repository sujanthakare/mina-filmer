import React from 'react';

import { Card, CardMedia } from '@mui/material';

type MovieCardProps = {
  data: {
    id: number;
    original_language: string;
    original_title: string;
    poster_path: string;
    title: string;
  };
};

const MovieCard = ({ data }: MovieCardProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
        alt={data.title}
      />
    </Card>
  );
};

export default MovieCard;
