import React from 'react';

import { Cell } from './Cell';

export const Row = ({ ticker, bid, ask, high, low, last }) => {
  return (
    <tr>
      <Cell value={ticker} />
      <Cell value={bid} />
      <Cell value={ask} />
      <Cell value={high} />
      <Cell value={low} />
      <Cell value={last} />
    </tr>
  );
};
