import { useState, useMemo, useEffect } from "react";
import { useToggle } from "./useToggle";

export type ID = string | number;

type LoadFn<P, R> = (params: P) => Promise<R>;
type Fn<P, R> = (p: P) => R
type NoParamLoadFn<R> = () => Promise<R>;

interface LoadAbleDispath<P> {
  setParams: (v: P) => void;
  setPreParams: (params: P[]) => void;
  load: () => void;
}


interface LoadAbleState<P, R> {
  loading: boolean;
  error?: Error;
  params: P;
  data?: R;
}

interface LoadAbleReduce<P = any, R = any> extends LoadAbleState<P, R> {
  dispath: LoadAbleDispath<P>
}

interface UseLoadAbleOptions<P> {
  defaultParams: P;
  defaultLoading?: boolean;
}

export function useLoadAble<P = any, R = any>(
  fn: LoadFn<P, R>,
  options: UseLoadAbleOptions<P>
): LoadAbleReduce<P, R> {
  const { defaultLoading, defaultParams } = options;
  const [preParams, setPreParams] = useState<P[]>([]);
  const [loading, setLoading] = useToggle(!!defaultLoading);
  const [params, setParams] = useState(defaultParams);
  const [data, setData] = useState<R>();
  const [error, setError] = useState<Error>();
  const load = () => setLoading(true);
  const _fn = useMemo(() => toNoParamFn(fn)(params), [params, fn]);

  useEffect(() => {
    if (loading) {
      _fn()
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [loading, _fn]);

  useEffect(() => {
    if (preParams.length !== 0) {
      mapLoadFn(fn)(preParams).forEach(f => f());
    }
  }, [preParams]);

  return {
    loading,
    params,
    data,
    error,
    dispath: {
      load,
      setParams,
      setPreParams,
    }
  }
}

/**
 * 缓存LodaFn
 * @param fn 被缓存的函数
 * @param key 参数映射函数
 */
export function cacheLoadFn<P = any, R = any>(
  fn: LoadFn<P, R>,
  key: (p: P) => ID = p => JSON.stringify(p)
): LoadFn<P, R> {
  const caches = {};
  return async p => {
    if (caches[key(p)] === undefined) {
      caches[key(p)] = await fn(p);
    }
    return caches[key(p)];
  }
}

// export function cacheFn<P = any, R = any>(
//   fn: Fn<P, R>,
//   key: (p: P) => ID = p => JSON.stringify(p)
// )
//   : Fn<P, R> {
//   const caches = {};
//   return p => {
//     if (caches[key(p)] === undefined) {
//       caches[key(p)] = fn(p);
//     }
//     return caches[key(p)];
//   }
// }

/**
 * 将LoadFn map 成NoParamLoadFn
 * @param params 多组参数
 * @param fn 被map的LoadFn
 */
export function mapLoadFn<P = any, R = any>(
  fn: LoadFn<P, R>,
): (params: P[]) => NoParamLoadFn<R>[] {
  const _f = toNoParamFn(fn);
  return params => params.map(_f);
}

/**
 * 将LoadFn 转换成 NoParamLoadFn
 * @param param 参数
 * @param fn 函数
 */
export function toNoParamFn<P = any, R = any>(
  fn: LoadFn<P, R>
): (param: P) => NoParamLoadFn<R> {
  return param => () => fn(param);
}