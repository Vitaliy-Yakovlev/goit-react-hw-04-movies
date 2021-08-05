import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, Route, Switch } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import defaultImg from '../images/default.png';
import MovieListId from '../components/MovieListId';
import NavLinkListId from '../components/NavLinkListId';
import Spinner from '../components/Loader';

const MovieCast = lazy(() =>
  import('../components/MovieCast' /*webpackChunkName: "movies-cast" */),
);
const MovieReviews = lazy(() =>
  import('../components/MovieReviews' /*webpackChunkName: "movies-review" */),
);

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actor, setActor] = useState(null);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    movieShelfAPI
      .fetchMovieById(movieId)
      .then(setMovie)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  useEffect(() => {
    movieShelfAPI.fetchMovieActorById(movieId).then(setActor);
  }, [movieId]);

  useEffect(() => {
    movieShelfAPI.fetchMoviePageById(movieId).then(setPage);
  }, [movieId]);

  return (
    <>
      {isLoading && <Spinner />}
      <PageHeading text={`Movie`} />

      {movie && <MovieListId movie={movie} IMG_URL={IMG_URL} />}

      <NavLinkListId routeMatch={url} />

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={`${url}/cast`}>
            {actor && (
              <MovieCast
                actor={actor}
                defaultImg={defaultImg}
                IMG_URL={IMG_URL}
              />
            )}
          </Route>

          <Route path={`${url}/reviews`}>
            {page && <MovieReviews page={page} />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
