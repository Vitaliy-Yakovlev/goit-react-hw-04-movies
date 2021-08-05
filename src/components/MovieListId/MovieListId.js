import ButtonGoBack from '../ButtonGoBack';
import s from './MovieListId.module.css';

function MovieListId({ movie, IMG_URL }) {
  const genresMovie = movie['genres'].map(genre => genre.name).join(' | ');

  return (
    <>
      <ButtonGoBack />

      <div className={s.container}>
        <img
          className={s.images}
          src={`${IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          width={400}
        />

        <div className={s.containerInfo}>
          <h2 className={s.desc}>{movie.title} </h2>
          <p className={s.average}>{movie.vote_average}</p>
          <p className={s.text}>
            <span className={s.spanText}>Budget : </span>
            {movie.budget}$
          </p>
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

export default MovieListId;
