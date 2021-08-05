import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import moviesDefault from '../../images/moviesDefault.jpg';
import s from './MoviesList.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <ul className={s.title}>
      {movies['results'].map(movie => (
        <li key={movie.id} className={s.list}>
          <div className={s.container}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              <img
                className={s.images}
                src={
                  movie.poster_path
                    ? `${IMG_URL}${movie.poster_path}`
                    : moviesDefault
                }
                alt={movie.title || movie.name}
                width={360}
                height={400}
              />
            </Link>
            <div className={s.containerInfo}>
              <p className={s.text}>{movie.title || movie.name}</p>
              <p className={s.text}>{}</p>
              <span className={s.average}>{movie.vote_average}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

MoviesList.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MoviesList;
