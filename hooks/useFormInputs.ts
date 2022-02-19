import { Dispatch, useReducer } from 'react';

type State = {
  [key: string]: string
}

type Action = React.ChangeEvent<HTMLInputElement>;

const initialState: State = {};

const reducer = (inputStore: State, action: Action): State => {
  const { name, value } = action.target;
  return {
    ...inputStore,
    [name]: value,
    autoFocusInputName: name
  };
}

type ReturnType = [inputStore: State, dispatchInputStore: Dispatch<Action>];

export function useFormInputs(): ReturnType {
  const [inputStore, dispatchInputStore] = useReducer(reducer, initialState);
  return [inputStore, dispatchInputStore];
}
