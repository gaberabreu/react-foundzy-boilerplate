import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import Link from "./Link";

describe("Link", () => {
  it("should render Link properly", () => {
    const { getByText } = render(<Link to="/login">Link</Link>);

    const linkElement = getByText("Link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
