import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import HelpIcon from "@mui/icons-material/Help";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import MenuItem from "./MenuItem";

describe("MenuItem", () => {
  it("should render text, icon and suffix properly", () => {
    const { getByText, getByTestId } = render(
      <MenuItem
        text="Help"
        icon={<HelpIcon />}
        suffix={<ExpandLessIcon />}
      />
    );

    expect(getByText("Help")).toBeInTheDocument();
    expect(getByTestId("HelpIcon")).toBeInTheDocument();
    expect(getByTestId("ExpandLessIcon")).toBeInTheDocument();
  });
});
