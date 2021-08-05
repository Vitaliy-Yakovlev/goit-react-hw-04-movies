import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import queryString from 'query-string';
import PageHeading from '../components/PageHeading';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { query } = queryString.parse(location.search);

  useEffect(() => {
    if (!query) {
      return;
    }

    movieShelfAPI.fetchMovieKeywordById(query).then(setMovies);
  }, [query, searchQuery]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <>
      <PageHeading text={`Movies`} />
      <Form onSubmit={handleSubmit} />
      {movies && <MoviesList movies={movies} location={location} />}
    </>
  );
}
