import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import AppSideBar from "./AppSideBar";

describe("AppSideBar", () => {
  it("should render menu links", () => {
    const { getByText } = render(<AppSideBar opened />);

    expect(getByText("Home").parentElement?.parentElement).toHaveAttribute("href", "/");

    fireEvent.click(getByText("Management"));
    expect(getByText("Login").parentElement?.parentElement).toHaveAttribute("href", "/login");
    expect(getByText("Register").parentElement?.parentElement).toHaveAttribute("href", "/register");
  });
});
