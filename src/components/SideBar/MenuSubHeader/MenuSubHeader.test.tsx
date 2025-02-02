import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import MenuSubHeader from "./MenuSubHeader";
import { SideBarContext } from "../SideBarContext";

describe("MenuSubHeader", () => {
  it("should render text properly", () => {
    const { getByText } = render(
      <SideBarContext.Provider value={{ opened: true }}>
        <MenuSubHeader text="Help" />
      </SideBarContext.Provider>
    );

    expect(getByText("Help")).toBeInTheDocument();
  });

  it("should set maxHeight properly when opened is true", () => {
    const { getByText } = render(
      <SideBarContext.Provider value={{ opened: true }}>
        <MenuSubHeader text="Help" />
      </SideBarContext.Provider>
    );

    expect(getByText("Help")).toHaveStyle("max-height: 40px");
  });

  it("should set maxHeight properly when opened is false", () => {
    const { getByText } = render(
      <SideBarContext.Provider value={{ opened: false }}>
        <MenuSubHeader text="Help" />
      </SideBarContext.Provider>
    );

    expect(getByText("Help")).toHaveStyle("max-height: 0px");
  });
});
