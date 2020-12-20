import React from 'react';
import cx from 'classnames';

import { useCell } from './useCell';

export const Cell = ({
  value
}) => {
  const classes = useCell(value);

  return <td className={cx(classes)}>{ value }</td>;
};
