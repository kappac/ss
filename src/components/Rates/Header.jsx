import React from 'react';

const columns = [
  { id: 'ticker', label: 'Ticker' },
  { id: 'bid', label: 'Bid' },
  { id: 'ask', label: 'Ask' },
  { id: 'high', label: 'High' },
  { id: 'low', label: 'Low' },
  { id: 'last', label: 'Last' },
];

export const Header = () => {
  return (
    <thead>
      <tr>
        { columns.map(({ id, label }) => <th key={id} data-id={id}>{ label }</th>) }
      </tr>
    </thead>
  );
};
