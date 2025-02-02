import type { FC } from "react";
import Box from "@mui/material/Box";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AppHeader from "@/components/AppHeader";
import AppSideBar from "@/components/AppSideBar";
import useSideBarStore from "@/stores/sideBarStore";

const RouteComponent: FC = () => {
  const opened = useSideBarStore((state) => state.opened);
  const toggle = useSideBarStore((state) => state.toggle);

  return (
    <>
      <AppHeader
        opened={opened}
        toggle={toggle}
      />
      <Box sx={{ display: "flex" }}>
        <AppSideBar opened={opened} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export const Route = createFileRoute("/_guard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.authenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});
