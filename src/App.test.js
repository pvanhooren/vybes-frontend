import { render, screen } from "@testing-library/react";
import Navbar from "./components/js/Navbar";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText("People");
  expect(linkElement).toBeInTheDocument();
});
