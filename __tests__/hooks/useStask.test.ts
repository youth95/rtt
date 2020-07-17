import { useStask } from '@/src/hooks/useStask';
import { renderHook, act } from '@testing-library/react-hooks';

test('useStask no options', () => {
  const { result } = renderHook(() => useStask());
  const [top, length,] = result.current;
  expect(top).toBeUndefined();
  expect(length).toEqual(0);
});

test('useSingleActive ', () => {
  const { result } = renderHook(() => useStask([1, 2]));
  let [top, length, { push }] = result.current;
  expect(top).toEqual(2);
  expect(length).toEqual(2);
  act(() => {
    push(3);
  });

  expect(result.current[0]).toEqual(3);
  expect(result.current[1]).toEqual(3);
  act(() => {
    result.current[2].pop();
  });
  expect(result.current[0]).toEqual(2);
  expect(result.current[1]).toEqual(2);
  act(() => {
    result.current[2].clear();
  });
  expect(result.current[0]).toBeUndefined();
  expect(result.current[1]).toEqual(0);
});

