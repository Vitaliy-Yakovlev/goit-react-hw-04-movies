import { useState, useEffect } from 'react';
// import { IoReloadSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import MoviesList from '../components/MoviesList';
import UpArrowBtn from '../components/UpArrowBtn';
import Spinner from '../components/Loader';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    movieShelfAPI
      .fetchMovies(currentPage)
      .then(data => {
        setMovies(prev => [...prev, ...data.results]);

        // TODO: Добавляет плавный Scroll в низ при нажатии на Loader
        // if (currentPage > 1) {
        //   setTimeout(() => {
        //     window.scrollBy({
        //       top: document.documentElement.clientHeight - 120,
        //       behavior: 'smooth',
        //     });
        //   }, 600);
        // }
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  // TODO : Замена "Infinite Scroll" на кнопку "Loader"
  // const onClickBtn = () => {
  //   setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  // };

  const onNextPages = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <UpArrowBtn />
      <InfiniteScroll
        dataLength={currentPage}
        next={() => onNextPages()}
        hasMore={true}
      >
        <PageHeading text="Trending today" />
        {movies && <MoviesList movies={movies} />}
      </InfiniteScroll>

      {
        // TODO: Замена "Infinite Scroll" на кнопку "Loader"
        /* {!isLoading && (
        <button onClick={onClickBtn} type="button" className="btnLoadMoreSharp">
          <IoReloadSharp className="loadMoreSharp" />
        </button>
      )} */
      }
    </>
  );
}
