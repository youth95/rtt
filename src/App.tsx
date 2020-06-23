import React from "react";

function App(props: { children?: React.ReactElement }) {
  return <div>{props.children}</div>;
}

export default App;
