import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './From.module.css';

function Form({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleNameMovieChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      alert('error');
      return;
    }
    onSubmit(searchQuery);

    history.push({ ...location, search: `query=${searchQuery}` });
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          className={s.searchFormInput}
          name="searchQuery"
          onChange={handleNameMovieChange}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <button type="submit" className={s.searchFormButton}></button>
      </form>
    </header>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
