export interface AppConfig {
  /**
   * 根组件
   */
  element: (props: { children?: React.ReactElement }) => JSX.Element;
  /**
   * 挂载容器
   */
  container: Element | DocumentFragment;
  /**
   * 是否支持PWA
   */
  isSupportPWA?: boolean
};