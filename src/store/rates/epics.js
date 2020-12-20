import { fromEventPattern } from 'rxjs';
import { bufferTime, map, mapTo, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { Connect, GetSymbols, UpdateSymbols, UpdateTickers, SubscribeTickers } from './actions';
import { ActionTypes } from './constants';

const initEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.Init),
    mapTo(Connect())
  );

const connectUrl = 'wss://api.exchange.bitcoin.com/api/2/ws';
const connectEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(ActionTypes.Connect),
    switchMap(() => fromEventPattern(
      (handler) => client.connect(connectUrl, handler)
    )),
    mapTo(GetSymbols())
  );

const getSymbolsEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(ActionTypes.GetSymbols),
    switchMap(() => fromEventPattern(
      (handler) => client.send('getSymbols', {}, handler)
    )),
    map(([, res = []]) => UpdateSymbols(res))
  );

const updateSymbolsEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.UpdateSymbols),
    map(({ payload: symbols = [] }) => {
      const symbolsToWatchFor = symbols.map(({ id }) => id);
      return SubscribeTickers(symbolsToWatchFor);
    })
  );

const subscribeTickersEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(ActionTypes.SubscribeTickers),
    switchMap(({ payload: symbols }) => {
      symbols.map(
        (symbol) => client.send('subscribeTicker', { symbol })
      );
      return fromEventPattern(
        (handler) => client.expose('ticker', handler)
      );
    }),
    map(([ ticker ]) => ticker),
    bufferTime(300),
    map((tickers) => {
      const ts = tickers.reduce(
        (acc, ticker) => ({
          ...acc,
          [ticker.symbol]: ticker
        }),
        {}
      );
      return UpdateTickers(Object.values(ts));
    })
  );

const epics = [
  initEpic,
  connectEpic,
  getSymbolsEpic,
  updateSymbolsEpic,
  subscribeTickersEpic
];

export default epics;
