import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import s from './NavLinkListId.module.css';

function NavLinkListId({ routeMatch }) {
  const location = useLocation();
  return (
    <div className={s.container}>
      <NavLink
        className={s.link}
        activeClassName={s.activeLink}
        to={{
          pathname: `${routeMatch}/cast`,
          state: {
            from: location.state ? location.state.from : '/',
          },
        }}
      >
        Cast
      </NavLink>

      <NavLink
        className={s.link}
        activeClassName={s.activeLink}
        to={{
          pathname: `${routeMatch}/reviews`,
          state: {
            from: location.state ? location.state.from : '/',
          },
        }}
      >
        Reviews
      </NavLink>
    </div>
  );
}

NavLinkListId.propTypes = {
  routeMatch: PropTypes.string.isRequired,
};

export default NavLinkListId;
