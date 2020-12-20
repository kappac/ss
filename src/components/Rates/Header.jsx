import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import Styles from './Header.module.scss';

const columns = [
  { id: 'ticker', label: 'Ticker' },
  { id: 'bid', label: 'Bid' },
  { id: 'ask', label: 'Ask' },
  { id: 'high', label: 'High' },
  { id: 'low', label: 'Low' },
  { id: 'last', label: 'Last' },
];

export const Header = ({
  onSortChange
}) => {
  const [ sort, setSort ] = useState({ property: undefined, desc: false });
  const onClickHandler = useCallback((e) => {
    const { value: column } = e.target.attributes.getNamedItem('data-id');

    setSort(
      ({ property, desc }) => {
        if (property !== column) {
          return {
            property: column,
            desc: false
          };
        }

        return {
          property: column,
          desc: !desc
        };
      }
    );
  }, [ setSort ]);

  useEffect(() => sort.property !== 'ticker' && onSortChange(sort), [ sort, onSortChange ]);

  return (
    <thead onClick={ onClickHandler }>
      <tr>
        { columns.map(({ id, label }) => (
          <th
            key={id}
            data-id={id}
            className={cx({
              [Styles.SortNone]: id !== 'ticker' && sort.property !== id,
              [Styles.SortAsc]: id !== 'ticker' && sort.property === id && !sort.desc,
              [Styles.SortDesc]: id !== 'ticker' && sort.property === id && sort.desc
            })}
          >
            { label }
          </th>
        )) }
      </tr>
    </thead>
  );
};
