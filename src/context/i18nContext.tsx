import React, { useMemo } from "react";
import { noop } from "../utils/funcs";

const I18nContext = React.createContext<(key: string) => string>(noop);

export const useI18nContext = () => React.useContext(I18nContext);

export const I18nContextPorvider: React.FC = ({ children }) => {
  const i = useMemo(() => (key: string) => key, []);
  // TODO 这里的i可以依据需求定制
  return <I18nContext.Provider value={i}>{children}</I18nContext.Provider>;
};
