import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import JsonRpcWs from 'json-rpc-ws/browser';

import epic from './epics';
import reducer from './reducers';
import initialState from './initialState';

const epicMiddleware = createEpicMiddleware({ 
  dependencies: { client: JsonRpcWs.createClient() }
});

export const configureStore = () => {
  const middlewares = [ epicMiddleware ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
      createLogger({
        collapsed: true,
        diff: true,
        duration: true,
        level: 'info',
      })
    );
  }

  const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middlewares)
  ));

  epicMiddleware.run(epic);

  return store;
};
