import { createSelector } from 'reselect';
import { Namespace } from './constants';

export const namespaceSelector = (state) => state?.[Namespace] || {};

export const selectSymbols = (symbols) => 
  createSelector(
    namespaceSelector,
    ({ symbols: existingSymbols }) => symbols.reduce(
      (acc, symbol) => ({
        ...acc,
        [symbol]: existingSymbols[symbol]
      }),
      {}
    )
  );

const defaultSelectTickersTop = -1;
const defaultSelectTickersProperty = 'last';
export const selectTickers = (top = defaultSelectTickersTop, property = defaultSelectTickersProperty) =>
  createSelector(
    namespaceSelector,
    ({ symbols }) => {
      const tickersToShow = Object
        .values(symbols)
        .sort((a, b) => +a[property] === +b[property] ? 0 : (+a[property] > +b[property] ? -1 : 1));

      if (top === defaultSelectTickersTop) {
        return tickersToShow;
      }

      return tickersToShow.slice(0, top);
    }
  );
