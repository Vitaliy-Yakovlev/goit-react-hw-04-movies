import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import MoviesList from '../components/MoviesList';
import Spinner from '../components/Loader';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    movieShelfAPI
      .fetchMovies()
      .then(data => {
        setMovies(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Spinner />}

      <PageHeading text="Trending today" />

      {movies && <MoviesList movies={movies} location={location} />}
    </>
  );
}
