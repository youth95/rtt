import { useToggle } from "@/src/hooks/index";
import { renderHook, act } from '@testing-library/react-hooks';
test('useToggle', () => {
  const { result } = renderHook(() => useToggle(true));
  expect(result.current[0]).toEqual(true);
  act(() => result.current[1](false))
  expect(result.current[0]).toEqual(false);
  act(() => result.current[1]())
  expect(result.current[0]).toEqual(true);
});

test('useToggle default value', () => {
  const { result } = renderHook(() => useToggle());
  expect(result.current[0]).toEqual(true);
  act(() => result.current[1](false))
  expect(result.current[0]).toEqual(false);
  act(() => result.current[1]())
  expect(result.current[0]).toEqual(true);
});