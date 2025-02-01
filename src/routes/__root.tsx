import type { FC } from "react";

import { Outlet, createRootRoute } from "@tanstack/react-router";

const RouteComponent: FC = () => {
  return <Outlet />;
};

export const Route = createRootRoute({
  component: RouteComponent,
});
