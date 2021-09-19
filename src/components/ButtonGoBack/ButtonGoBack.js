import { GrFormPreviousLink } from 'react-icons/gr';
import { useLocation, useHistory } from 'react-router-dom';
import s from './ButtonGoBack.module.css';

function ButtonGoBack() {
  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');

    console.log(history);
  };

  return (
    <GrFormPreviousLink
      type="button"
      onClick={onGoBack}
      className={s.btn}
    ></GrFormPreviousLink>
  );
}

export default ButtonGoBack;
