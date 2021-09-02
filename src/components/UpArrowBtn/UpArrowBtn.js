import { VscChevronUp } from 'react-icons/vsc';
import s from './UpArrowBtn.module.css';

function UpArrowBtn() {
  const scrollFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  //не работает!

  const trackScroll = () => {
    const optionClassName = [s.myBtn];

    if (document.body.scrollTop === 200) {
      optionClassName.push(s.isHidden);
    }

    return optionClassName.join(' ');
  };

  return (
    <button
      onClick={scrollFunction}
      title="Go to top"
      className={trackScroll()}
    >
      <VscChevronUp />
    </button>
  );
}

export default UpArrowBtn;
