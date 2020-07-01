import React from "react";
import './App.css';

function App(props: { children?: React.ReactElement }) {
  return <div>{props.children}</div>;
}

export default App;
