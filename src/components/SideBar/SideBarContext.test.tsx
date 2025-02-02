import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";

import { SideBarContext, useSideBarContext } from "./SideBarContext";

describe("useSideBarContext", () => {
  it("should return context value when inside provider", () => {
    const { result } = renderHook(() => useSideBarContext(), {
      wrapper: ({ children }) => (
        <SideBarContext.Provider value={{ opened: true }}>{children}</SideBarContext.Provider>
      ),
    });

    expect(result.current.opened).toBe(true);
  });
});
