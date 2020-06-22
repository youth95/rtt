import React from "react";

import loadable from '@/src/libs/loadable/index.tsx';

//通用的过场组件
export const LoadingComponent = () => {
  return <div>loading</div>;
};

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader: any, loading = LoadingComponent) => {
  return loadable(loader, loading);
};
