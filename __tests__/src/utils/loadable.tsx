import React from "react";
import { render } from "@testing-library/react";
import { LoadingComponent } from "@/src/utils/loadable";

test("LoadingComponent", () => {
  const { getByText } = render(<LoadingComponent />);
  expect(getByText("loading")).toBeDefined();
});
