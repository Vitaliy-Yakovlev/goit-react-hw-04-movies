import s from './MovieReviews.module.css';

function MovieReviews({ page }) {
  console.log('MovieReviews', page.results.length);
  if (page.results.length === 0) {
    return <p className={s.error}>We don't have any reviews for this page.</p>;
  }

  return (
    <ul className={s.title}>
      {page['results'].map(page => (
        <li className={s.list} key={page.id}>
          <p className={s.text}>
            <span className={s.author}>Author :</span>
            {page.author}
          </p>
          <p className={s.text}> {page.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
