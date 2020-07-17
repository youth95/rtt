import { useState, useMemo } from 'react';

export type Stask<T> = [number, number, {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}]

export function useStask<T>(defaultValue?: T[]): Stask<T> {
  const [data, setData] = useState<T[]>(defaultValue ?? []);
  const push = useMemo(() => (v: T) => {
    setData([...data, v]);
  }, [data, setData]);
  const top = useMemo(() => data.length > 0 ? data[data.length - 1] : undefined, [data]);
  const pop = useMemo(() => () => {
    setData(data.slice(0, data.length - 1));
  }, [data, setData]);
  const clear = () => setData([]);
  const length = useMemo(() => data.length, [data]);
  return [top, length, {
    push,
    pop,
    clear,
  }]
}