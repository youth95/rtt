import React from 'react';
import { useEffect, useState } from "react"

export type AsyncComponent = () => Promise<{ default: () => JSX.Element }>

/**
 * 过场组件
 */
export const LoadingComponent = () => {
  return <div>loading</div>;
};

export default function loadable(comp: AsyncComponent, Loading: () => JSX.Element = LoadingComponent) {
  return function LoadAble() {
    const [C, setC] = useState<{ default: () => JSX.Element }>();
    useEffect(() => {
      comp()
        .then(setC)
        .catch(e => {
          console.error(e);
        })
    }, []);
    if (C) {
      const Comp: () => JSX.Element = C.default;
      return <Comp />;
    } else {
      return <Loading />;
    }
  }
}