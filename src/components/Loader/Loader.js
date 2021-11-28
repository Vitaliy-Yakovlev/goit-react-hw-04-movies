import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Spinner = () => (
  <Loader
    type="Puff"
    color="rgba(0, 200, 255, 0.694)"
    timeout={1000}
    className={s.spinnerStyle}
  />
);

export default Spinner;
