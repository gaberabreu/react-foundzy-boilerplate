import { describe, expect, it } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import HelpIcon from "@mui/icons-material/Help";

import SubMenu from "./SubMenu";
import { SideBarContext } from "../SideBarContext";

describe("SubMenu", () => {
  it("should render text and icon properly", () => {
    const { getByText, getByTestId } = render(
      <SideBarContext.Provider value={{ opened: true }}>
        <SubMenu
          text="Help"
          icon={<HelpIcon />}
        />
      </SideBarContext.Provider>
    );

    expect(getByText("Help")).toBeInTheDocument();
    expect(getByTestId("HelpIcon")).toBeInTheDocument();
  });

  it("should render children when sidebar opened and sub opened", () => {
    const { getByText, queryByText, getByTestId } = render(
      <SideBarContext.Provider value={{ opened: true }}>
        <SubMenu
          text="Help"
          icon={<HelpIcon />}
        >
          FAQ
        </SubMenu>
      </SideBarContext.Provider>
    );

    expect(queryByText("FAQ")).not.toBeInTheDocument();
    expect(getByTestId("ExpandMoreIcon")).toBeInTheDocument();

    fireEvent.click(getByText("Help"));

    expect(getByText("FAQ")).toBeInTheDocument();
    expect(getByTestId("ExpandLessIcon")).toBeInTheDocument();
  });

  it("should render children when sidebar collapsed and sub opened", async () => {
    const { getByText, queryByText } = render(
      <SideBarContext.Provider value={{ opened: false }}>
        <SubMenu
          text="Help"
          icon={<HelpIcon />}
        >
          FAQ
        </SubMenu>
      </SideBarContext.Provider>
    );

    expect(queryByText("FAQ")).not.toBeInTheDocument();

    fireEvent.click(getByText("Help"));

    expect(getByText("FAQ")).toBeInTheDocument();

    fireEvent.click(getByText("Help"));

    await waitFor(() => expect(queryByText("FAQ")).not.toBeInTheDocument());
  });
});
