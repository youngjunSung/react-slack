import { Dispatch, SetStateAction, useState, useCallback } from 'react';

type ReturnTypes<T> = [T, Dispatch<SetStateAction<T>>, (e: any) => void];

export const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [state, setState] = useState(initialData);
  const handler = useCallback((e) => {
    setState(e.target.value);
  }, [state])
  return [state, setState, handler]
}