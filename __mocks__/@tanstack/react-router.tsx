import React, { type ReactNode, forwardRef } from "react";

import { vi } from "vitest";

export const useNavigate = vi.fn().mockReturnValue(vi.fn());

export const Link = forwardRef<HTMLAnchorElement, { to: string; children: ReactNode }>(
  ({ to, children }, ref) => (
    <a
      ref={ref}
      href={to}
    >
      {children}
    </a>
  )
);
