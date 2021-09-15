import { useEffect, useState } from 'react';
import { VscChevronUp } from 'react-icons/vsc';
import s from './UpArrowBtn.module.css';

function UpArrowBtn() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setScrollTop(window.pageYOffset);
    };
  }, []);

  const scrollFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const className = () => {
    const optionClassName = [s.myBtn];

    if (scrollTop > 400) {
      optionClassName.push(s.isHidden);

      return optionClassName.join(' ');
    }
    return optionClassName.join(' ');
  };

  return (
    <button onClick={scrollFunction} title="Go to top" className={className()}>
      <VscChevronUp />
    </button>
  );
}

export default UpArrowBtn;
