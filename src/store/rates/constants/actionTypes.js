import  { createActionType } from '@utils';
import { Namespace } from './namespace';

export const ActionTypes = {
  Init: createActionType(Namespace, 'Init'),
  Connect: createActionType(Namespace, 'Connect'),
  GetSymbols: createActionType(Namespace, 'GetSymbols'),
  UpdateSymbols: createActionType(Namespace, 'UpdateSymbols'),
  SubscribeTickers: createActionType(Namespace, 'SubscribeTickers'),
  UpdateTickers: createActionType(Namespace, 'UpdateTickers')
};
