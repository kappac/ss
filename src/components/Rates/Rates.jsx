import React from 'react';

import { useRates } from './useRates';
import { Header } from './Header';
import { Row } from './Row';
import Styles from './Rates.module.scss';

export const Rates = ({
  top
}) => {
  const { data } = useRates(top);

  return (
    <div className={Styles.Rates}>
      <table>
        <Header />
        <tbody>
        { data.map(({ ask, bid, high, last, low, baseCurrency, feeCurrency, symbol }) => (
          <Row
            key={symbol}
            ticker={`${baseCurrency} / ${feeCurrency}`}
            ask={ask}
            bid={bid}
            high={high}
            last={last}
            low={low}
          />
        )) }
        </tbody>
      </table>
    </div>
  );
};
