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
    switchMap(() => new Promise(
      (resolve) => {
        client.connect(connectUrl, resolve);
      }
    )),
    mapTo(GetSymbols())
  );

const getSymbolsEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(ActionTypes.GetSymbols),
    switchMap(() => new Promise(
      (resolve) => {
        client.send('getSymbols', {}, (_, reply = []) => resolve(reply));
      }
    )),
    map((reply) => UpdateSymbols(reply))
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
    bufferTime(500),
    map((tickers) => UpdateTickers(tickers))
  );

const epics = [
  initEpic,
  connectEpic,
  getSymbolsEpic,
  updateSymbolsEpic,
  subscribeTickersEpic
];

export default epics;
