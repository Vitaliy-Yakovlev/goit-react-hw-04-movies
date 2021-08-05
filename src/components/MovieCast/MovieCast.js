import s from './MovieCast.module.css';

function MovieCast({ actor, defaultImg, IMG_URL }) {
  return (
    <ul className={s.title}>
      {actor['cast'].map(actor => (
        <li key={actor.cast_id}>
          <img
            className={s.images}
            src={
              actor.profile_path
                ? `${IMG_URL}${actor.profile_path}`
                : defaultImg
            }
            alt={actor.original_name || actor.character}
            width="100"
          />
          <div className={s.containerInfo}>
            <p className={s.text}>{actor.name}</p>
            <p className={s.text}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
