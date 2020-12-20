import React from 'react';
import cx from 'classnames';

import { useCell } from './useCell';

export const Cell = ({
  sorting,
  value
}) => {
  const classes = useCell(value, sorting);

  return <td className={cx(sorting && classes)}>{ value }</td>;
};
