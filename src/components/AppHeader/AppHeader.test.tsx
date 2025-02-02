import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("should render toggle sidebar button and title", () => {
    const { getByText, getByLabelText } = render(<AppHeader />);

    expect(getByText("Foundzy")).toBeInTheDocument();
    expect(getByLabelText("Toggle SideBar")).toBeInTheDocument();
  });

  it("should render icon based on opened value", () => {
    const { getByTestId, rerender } = render(<AppHeader />);
    expect(getByTestId("MenuIcon")).toBeInTheDocument();

    rerender(<AppHeader opened />);
    expect(getByTestId("MenuOpenIcon")).toBeInTheDocument();
  });

  it("should call toggle when click on toggle sidebar button", () => {
    const mockToggleSidebar = vi.fn();

    const { getByLabelText } = render(<AppHeader toggle={mockToggleSidebar} />);
    fireEvent.click(getByLabelText("Toggle SideBar"));

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
