import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import MenuLink from "./MenuLink";

describe("MenuLink", () => {
  it("should render as an anchor", () => {
    const { getByText } = render(
      <MenuLink
        icon={<AccountCircleIcon />}
        text="Login"
        to="/login"
      />
    );

    const menuLink = getByText("Login");
    expect(menuLink.parentElement?.parentElement).toHaveAttribute("href", "/login");
  });
});
