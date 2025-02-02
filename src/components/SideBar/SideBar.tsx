import { useMemo, type FC, type ReactNode } from "react";
import { styled, type CSSObject, type Theme } from "@mui/material/styles";
import Drawer, { type DrawerProps } from "@mui/material/Drawer";

import { SideBarContext } from "./SideBarContext";

const openedMixin = (theme: Theme, width: string): CSSObject => ({
  width: width,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(8)} + 1px)`,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

interface StyledDrawerProps extends DrawerProps {
  width: string;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "opened",
})<StyledDrawerProps>(({ theme, open, width }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open ? openedMixin(theme, width) : closedMixin(theme)),
  "& .MuiDrawer-paper": open ? openedMixin(theme, width) : closedMixin(theme),
}));

export interface SideBarProps {
  children?: ReactNode;
  opened?: boolean;
  width?: string;
  subMenuWidth?: string;
}

const SideBar: FC<SideBarProps> = ({
  children,
  opened,
  subMenuWidth = "240px",
  width = "240px",
}) => {
  const value = useMemo(() => ({ opened, subMenuWidth }), [opened, subMenuWidth]);

  return (
    <SideBarContext.Provider value={value}>
      <StyledDrawer
        variant="permanent"
        open={opened}
        width={width}
      >
        {children}
      </StyledDrawer>
    </SideBarContext.Provider>
  );
};

export default SideBar;
