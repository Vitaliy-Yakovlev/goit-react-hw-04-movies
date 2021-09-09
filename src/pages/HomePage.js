import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoReloadSharp } from 'react-icons/io5';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import MoviesList from '../components/MoviesList';
import UpArrowBtn from '../components/UpArrowBtn';
import Spinner from '../components/Loader';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    movieShelfAPI
      .fetchMovies(currentPage)
      .then(data => {
        setMovies(prev => [...prev, ...data.results]);

        if (currentPage > 1) {
          setTimeout(() => {
            window.scrollBy({
              top: document.documentElement.clientHeight - 120,
              behavior: 'smooth',
            });
          }, 600);
        }
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const onClickBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <UpArrowBtn />

      <PageHeading text="Trending today" />
      {movies && <MoviesList movies={movies} location={location} />}

      {!isLoading && (
        <button onClick={onClickBtn} type="button" className="btnLoadMoreSharp">
          <IoReloadSharp className="loadMoreSharp" />
        </button>
      )}
    </>
  );
}
