import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import epic from './epics';
import reducer from './reducers';
import initialState from './initialState';

const epicMiddleware = createEpicMiddleware({ 
  dependencies: {}
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

  const middleware = applyMiddleware(...middlewares);
  const store = middleware(createStore)(reducer, initialState);

  epicMiddleware.run(epic);

  return store;
};
