import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GroupDeatilPage from "../pages/users/groupDetail";

describe("<GroupDetail>", () => {
  it("print all text", () => {
    const { queryByText } = render(<GroupDeatilPage />);
    expect(queryByText("자바스크립트 기초 공부해요")).toBeInTheDocument();
    expect(queryByText("최소 인원: 1")).toBeInTheDocument();
    expect(queryByText("현재 인원: 2")).toBeInTheDocument();
    expect(queryByText("최대 인원: 4")).toBeInTheDocument();
    expect(queryByText("서울시 서초구 서초1동")).toBeInTheDocument();
    expect(queryByText("블라블라...")).toBeInTheDocument();
  });
});
