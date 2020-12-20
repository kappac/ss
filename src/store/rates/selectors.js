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
export const selectTickers = (top = defaultSelectTickersTop) =>
  createSelector(
    namespaceSelector,
    ({ tickers }) => {
      const tickersToShow = Object.values(tickers).sort(({ last: lastA }, { last: lastB }) => {
        if (lastA === lastB) {
          return 0;
        }
        if (+lastA < +lastB) {
          return 1;
        }
        return -1;
      });

      if (top === defaultSelectTickersTop) {
        return tickersToShow;
      }

      return tickersToShow.slice(0, top);
    }
  );
