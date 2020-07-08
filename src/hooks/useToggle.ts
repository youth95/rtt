import { useReducer, Reducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state);

export const useToggle = (initialValue: boolean = true): [boolean, (nextValue?: any) => void] =>
  useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);