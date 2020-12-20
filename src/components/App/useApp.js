import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '@store/rates';

export const useApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.Init());
  }, [ dispatch ]);
};
