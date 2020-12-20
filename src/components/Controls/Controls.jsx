import React from 'react';
import cx from 'classnames';

import Styles from './Controls.module.scss';

const topValues = [
  { value: -1, label: 'All' },
  { value: 50, label: '50' }
];

export const Controls = ({
  className,
  top,
  onTopChange
}) => {
  return (
    <div className={cx(Styles.Controls, className)}>
      <label htmlFor="top">Amount to show:</label>
      <select name="top" value={top} onChange={(e) => onTopChange(e.target.value)}>
        { topValues.map(({ value, label }) => (
          <option key={value} value={value}>{ label }</option>
        )) }
      </select>
    </div>
  );
};
