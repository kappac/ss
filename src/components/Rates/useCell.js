import { useEffect, useRef, useState } from 'react';

import Styles from './Cell.module.scss';

const timeout = 200;

export const useCell = (value) => {
  const prevValue = useRef(value);
  const classesTimeout = useRef();
  const [ classes, setClasses ] = useState('');

  useEffect(() => {
    const vn = parseFloat(value);
    const pvn = parseFloat(prevValue.current);

    if (vn < pvn) {
      setClasses(Styles.Down);
    }

    if (vn > pvn) {
      setClasses(Styles.Up);
    }

    if (classesTimeout.current) {
      clearTimeout(classesTimeout);
    }

    classesTimeout.current = setTimeout(() => {
      setClasses('');
    }, timeout);

    prevValue.current = value;
  }, [ value, setClasses ]);

  return classes;
};
