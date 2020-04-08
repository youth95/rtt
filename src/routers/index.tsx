import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import loadable from "@/src/utils/loadable";
import { HelpView } from "./views";

const Help = loadable(HelpView);

const Routes = () => (
  <BrowserRouter>
    <Route path="/help" component={Help} />
  </BrowserRouter>
);

export default Routes;
