import  { createAction } from '@utils';
import { ActionTypes } from './constants';

export const Init = createAction(ActionTypes.Init);

export const Connect = createAction(ActionTypes.Connect);

export const GetSymbols = createAction(ActionTypes.GetSymbols);

export const UpdateSymbols = createAction(ActionTypes.UpdateSymbols);

export const SubscribeTickers = createAction(ActionTypes.SubscribeTickers);

export const UpdateTickers = createAction(ActionTypes.UpdateTickers);
