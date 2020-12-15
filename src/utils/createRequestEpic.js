import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import uuid from 'uuid-random';

export const createRequestEpic = (actionTypes, requestCreator, requestChecker) =>
  (actions$, state$, deps$) => {
    let stream$ = actions$.pipe(
      ofType(actionTypes.Init)
    );
    const UUID = uuid();

    if (requestChecker) {
      stream$ = requestChecker(stream$, state$);
    }

    const pending$ = stream$.pipe(
      map(() => ({ type: actionTypes.Pending, meta: { uuid: UUID } }))
    );

    const request$ = requestCreator(stream$, state$, deps$)
      .pipe(
        map(response => ({
          meta: {
            uuid: UUID,
          },
          payload: response,
          type: actionTypes.Success
        })),
        catchError((error, caught$) => merge(
          caught$,
          of({
            meta: { uuid: UUID },
            payload: error,
            type: actionTypes.Fail
          }),
        ))
      );

    return merge(pending$, request$);
  };
