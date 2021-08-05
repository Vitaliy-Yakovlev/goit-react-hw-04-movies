import { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Route, Switch } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading';
import defaultImg from '../images/default.png';
import MovieReviews from '../components/MovieReviews';
import MovieCast from '../components/MovieCast';
import MovieListId from '../components/MovieListId';
import NavLinkListId from '../components/NavLinkListId';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export default function MoviesPage({ query }) {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actor, setActor] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    movieShelfAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  useEffect(() => {
    movieShelfAPI.fetchMovieActorById(movieId).then(setActor);
  }, [movieId]);

  useEffect(() => {
    movieShelfAPI.fetchMoviePageById(movieId).then(setPage);
  }, [movieId]);

  return (
    <>
      <PageHeading text={`Movie`} />

      {movie && <MovieListId movie={movie} IMG_URL={IMG_URL} />}

      <NavLinkListId routeMatch={url} />

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
    </>
  );
}
