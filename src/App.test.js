import { render, screen } from "@testing-library/react";
import Navbar from "./components/js/Navbar";

import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const linkElement = screen.getByText("People");
  expect(linkElement).toBeInTheDocument();
});
