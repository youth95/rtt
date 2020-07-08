import { useReducer } from "react";
import { ID } from "./useLoadAble";


export interface Only {
  id: ID;
}

export interface SingleActiveState<T extends Only = Only> {
  activeID?: ID;
  options: T[];
}

export interface SingleActive<T extends Only = Only> extends SingleActiveState<T> {
  setActiveID(id: ID): void;
  setOptions(onlies: T[]): void;
}

type Action<T> =
  | { type: 'setActiveID', id: ID }
  | { type: 'setOptions', onlies: T[] }

function SingleActiveReducer<T extends Only = Only>
  (state: SingleActiveState<T>, action: Action<T>): SingleActiveState<T> {
  switch (action.type) {
    case 'setActiveID':
      return {
        ...state,
        activeID: action.id,
      };
    case 'setOptions':
      let activeID = undefined;
      if (action.onlies.length !== 0) {
        activeID = action.onlies[0].id;
      }
      return {
        ...state,
        activeID,
        options: action.onlies,
      };
    // default: return state;
  }
}

export function useSingleActive<T extends Only = Only>(options: T[], id?: ID) {
  if (options.length !== 0) {
    id = options[0].id;
  }
  const [state, dispath] = useReducer(SingleActiveReducer, {
    options,
    activeID: id,
  });
  const setActiveID = (id: ID) => dispath({ type: 'setActiveID', id });
  const setOptions = (onlies: T[]) => dispath({ type: 'setOptions', onlies });
  return {
    ...state,
    setActiveID,
    setOptions,
  } as SingleActive<T>;
}