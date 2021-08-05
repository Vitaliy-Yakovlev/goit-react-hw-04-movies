import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import MoviesList from '../components/MoviesList';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    movieShelfAPI.fetchMovies().then(data => {
      setMovies(data);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movies && <MoviesList movies={movies} location={location} />}
    </>
  );
}
