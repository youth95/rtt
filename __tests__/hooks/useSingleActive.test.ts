import { useSingleActive } from '@/src/hooks/useSingleActive';
import { renderHook, act } from '@testing-library/react-hooks';

test('useSingleActive no options', () => {
  const { result } = renderHook(() => useSingleActive([]));
  expect(result.current.activeID).toBeUndefined();
});

test('useSingleActive ', () => {
  const { result } = renderHook(() => useSingleActive([{ id: 1 }, { id: 2 }]));
  expect(result.current.activeID).toEqual(1);
  act(() => {
    result.current.setActiveID(2);
  });
  expect(result.current.activeID).toEqual(2);

  act(() => {
    result.current.setOptions([]);
  });
  expect(result.current.activeID).toBeUndefined();

  act(() => {
    result.current.setOptions([{ id: 1 }]);
  });
  expect(result.current.activeID).toEqual(1);
});

