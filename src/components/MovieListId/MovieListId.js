import PropTypes from 'prop-types';
import ButtonGoBack from '../ButtonGoBack';
import moviesDefault from '../../images/moviesDefault.jpg';
import s from './MovieListId.module.css';
import ModalOpen from '../ModalOpen/ModalOpen';

function MovieListId({ movie, IMG_URL, video, VideoIdEnglish }) {
  const genresMovie = movie['genres'].map(genre => genre.name).join(' | ');

  return (
    <>
      <ButtonGoBack />

      <div className={s.container}>
        <img
          className={s.images}
          src={
            movie.poster_path ? `${IMG_URL}${movie.poster_path}` : moviesDefault
          }
          alt={movie.title}
          width={400}
        />

        <div className={s.containerInfo}>
          <h2 className={s.desc}>{movie.title} </h2>
          <p className={s.average}>{movie.vote_average}</p>
          <ModalOpen video={video} VideoIdEnglish={VideoIdEnglish} />
          <p className={s.text}>
            <span className={s.spanText}>Genres :</span>
            {genresMovie}
          </p>
          <p className={s.text}>
            <span className={s.spanText}>Release date :</span>
            {movie.release_date}
          </p>
          <p className={s.about}>ABOUT</p>
          <p className={s.overview}>{movie.overview}</p>
        </div>
      </div>
    </>
  );
}

MovieListId.propTypes = {
  movie: PropTypes.object.isRequired,
  IMG_URL: PropTypes.string.isRequired,
};

export default MovieListId;
