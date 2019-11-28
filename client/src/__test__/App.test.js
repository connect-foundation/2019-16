import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

it("App.js: '존재하지 않는 페이지입니다.'가 상단에 노출된다", () => {
  expect(true).toBeTruthy();
  const { queryByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(queryByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();
});
