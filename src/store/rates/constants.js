import  { createRequestActionTypes } from '../../utils';

export const Namespace = 'Rates';

export const Actions = {
  GetRates: createRequestActionTypes(Namespace, 'GetRates'),
};
