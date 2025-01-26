import React, { useState } from 'react';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';
// import data from './data.json';
import styles from './Animation.module.css';
import MovieCast from '../MovieCast';
import defaultImg from '../../images/default.png';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export default function Animations({ actor }) {
  const [open, set] = useState(false);

  if (open) {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 600);
  }

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '100%' },
    to: {
      size: open ? '100%' : '100%',
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? actor.cast : [], {
    ref: transApi,
    trail: 400 / actor.cast.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <div className={styles.wrapper}>
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={() => set(open => !open)}
      >
        {open && (
          <MovieCast actor={actor} IMG_URL={IMG_URL} defaultImg={defaultImg} />
        )}
        {!open ? (
          <span className={styles.closesActors}> Actors Push On</span>
        ) : (
          <span className={styles.openActors}> Actors Push of</span>
        )}

        {transition((style, item) => (
          <>
            <animated.div
              className={styles.item}
              style={{ ...style, background: item.css }}
            />
          </>
        ))}
      </animated.div>
    </div>
  );
}
