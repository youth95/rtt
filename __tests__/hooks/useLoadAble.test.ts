import { useLoadAble, cacheLoadFn } from '@/src/hooks';
import { renderHook, act } from '@testing-library/react-hooks';

const testFn = async (params: { a: number, b: number }) => params.a + params.b;

test('useLoadAble', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoadAble(
    testFn,
    { defaultLoading: false, defaultParams: { a: 1, b: 2 } }
  ));
  expect(result.current.loading).toEqual(false);
  expect(result.current.params).toEqual({ a: 1, b: 2 });
  expect(result.current.data).toBeUndefined();
  act(() => {
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
});

test('cacheLoadFn', async () => {
  const f = cacheLoadFn(testFn);
  const { result, waitForNextUpdate } = renderHook(() => useLoadAble(
    f,
    { defaultLoading: false, defaultParams: { a: 1, b: 2 } }
  ));
  expect(result.current.loading).toEqual(false);
  expect(result.current.params).toEqual({ a: 1, b: 2 });
  expect(result.current.data).toBeUndefined();
  act(() => {
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
  act(() => {
    result.current.dispath.setParams({ a: 2, b: 3 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(5);
  act(() => {
    result.current.dispath.setParams({ a: 1, b: 2 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
});

test('setPreParams', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoadAble(
    testFn,
    { defaultLoading: false, defaultParams: { a: 1, b: 2 } }
  ));
  expect(result.current.loading).toEqual(false);
  expect(result.current.params).toEqual({ a: 1, b: 2 });
  expect(result.current.data).toBeUndefined();
  act(() => {
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
  act(() => {
    result.current.dispath.setPreParams([
      { a: 2, b: 3 },
      { a: 4, b: 5 },
      { a: 5, b: 6 },
    ]);
    result.current.dispath.setParams({ a: 2, b: 3 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(5);
  act(() => {
    result.current.dispath.setParams({ a: 1, b: 2 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);

  act(() => {
    result.current.dispath.setParams({ a: 5, b: 6 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(11);

  act(() => {
    result.current.dispath.setParams({ a: 7, b: 8 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(15);
});

test("pre", async () => {
  const testFn = jest.fn().mockResolvedValue(3);
  const _f = cacheLoadFn(testFn);
  const { result, waitForNextUpdate } = renderHook(() => useLoadAble(
    _f,
    { defaultLoading: false, defaultParams: { a: 1, b: 2 } }
  ));
  expect(result.current.loading).toEqual(false);
  expect(result.current.params).toEqual({ a: 1, b: 2 });
  expect(result.current.data).toBeUndefined();
  // 调用50次相同参数的load
  for (let i = 0; i < 50; i++) {
    act(() => {
      result.current.dispath.load();
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(3);
  }
  expect(testFn.mock.calls.length).toEqual(1);
  // 调用一次不同的
  act(() => {
    result.current.dispath.setParams({ a: 3, b: 4 });
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
  expect(testFn.mock.calls.length).toEqual(2);

  // 预加载4个
  const pre = [
    { a: 5, b: 5 },
    { a: 6, b: 6 },
    { a: 7, b: 7 },
    { a: 8, b: 8 },
    { a: 9, b: 9 },
  ];
  act(() => {
    result.current.dispath.setPreParams(pre);
    result.current.dispath.load();
  });
  await waitForNextUpdate();
  expect(result.current.data).toEqual(3);
  expect(testFn.mock.calls.length).toEqual(7);

  // 接下来的4个就不会在调用 testFn 了
  for (const p of pre) {
    act(() => {
      result.current.dispath.setParams(p);
      result.current.dispath.load();
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(3);
    expect(testFn.mock.calls.length).toEqual(7);
  }
})