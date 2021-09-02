import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import queryString from 'query-string';
import { IoReloadSharp } from 'react-icons/io5';
import PageHeading from '../components/PageHeading';
import Form from '../components/Form';
import MoviesList from '../components/MoviesList';
import Spinner from '../components/Loader';
import UpArrowBtn from '../components/UpArrowBtn';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { query } = queryString.parse(location.search);

  useEffect(() => {
    setIsLoading(true);

    if (!query || currentPage < 2) {
      return;
    }

    movieShelfAPI
      .fetchMovieKeywordById(query, currentPage)
      .then(data => {
        setMovies(prev => [...prev, ...data.results]);

        if (currentPage > 2) {
          setTimeout(() => {
            window.scrollBy({
              top: document.documentElement.clientHeight - 120,
              behavior: 'smooth',
            });
          }, 600);
        }
      })

      .finally(() => setIsLoading(false));
  }, [currentPage, query, searchQuery]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setMovies([]);
    if (currentPage > 2) {
      return;
    }
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const onClickBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <>
      {isLoading && <Spinner />}

      <PageHeading text={`Movies`} />
      <Form onSubmit={handleSubmit} />
      {movies && <MoviesList movies={movies} location={location} />}
      {movies.length > 1 && (
        <button onClick={onClickBtn} type="button" className="btnLoadMoreSharp">
          <IoReloadSharp className="loadMoreSharp" />
        </button>
      )}
      {movies && <UpArrowBtn />}
    </>
  );
}
