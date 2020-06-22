import React from 'react';
import { useEffect, useState } from "react"

export type AsyncComponent = () => Promise<JSX.Element>
export default function loadable(comp: AsyncComponent, Loading: () => JSX.Element) {
  return function LoadAble() {
    const [C, setC] = useState<JSX.Element>();
    useEffect(() => {
      comp()
        .then(setC)
        .catch(e => {
          console.error(e);
        })
    }, []);
    if (C) {
      const Comp: () => JSX.Element = (C as any).default;
      return <Comp />;
    } else {
      return <Loading />;
    }
  }
}