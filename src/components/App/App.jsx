import React, { useState } from 'react';
import { Controls } from '@components/Controls';
import { Rates } from '@components/Rates';
import { useApp } from './useApp';
import Styles from './App.module.scss';

const App = () => {
  const [ top, setTop ] = useState(-1);
  useApp();

  return (
    <div className={Styles.App}>
      <Controls className={Styles.AppControls} top={top} onTopChange={setTop} />
      <Rates top={top} />
    </div>
  );
};

export { App };
