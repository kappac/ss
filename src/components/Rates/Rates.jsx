import React, { useEffect, useState } from 'react';

import { useRates } from './useRates';
import { Header } from './Header';
import { Row } from './Row';
import Styles from './Rates.module.scss';

export const Rates = ({
  top
}) => {
  const [ sort, setSort ] = useState({});
  const { data } = useRates(top, sort.property, sort.desc);

  return (
    <div className={Styles.Rates}>
      <table>
        <Header onSortChange={ setSort } />
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
