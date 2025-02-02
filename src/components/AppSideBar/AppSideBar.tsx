import type { FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";

import SideBar from "@/components/SideBar";
import SubMenu from "@/components/SideBar/SubMenu";
import MenuSubHeader from "@/components/SideBar/MenuSubHeader";
import MenuLink from "@/components/SideBar/MenuLink";
import useAuthStore from "@/stores/authStore";

export interface AppSideBarProps {
  opened?: boolean;
}

const AppSideBar: FC<AppSideBarProps> = ({ opened }) => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SideBar opened={opened}>
      <Toolbar />
      <List>
        <MenuSubHeader text="Main items" />
        <MenuLink
          icon={<DashboardIcon />}
          text="Home"
          to="/"
        />
        <SubMenu
          icon={<SettingsIcon />}
          text="Management"
        >
          <MenuLink
            icon={<PeopleIcon />}
            text="Login"
            to="/login"
            onClick={logout}
          />
          <MenuLink
            icon={<SecurityIcon />}
            text="Register"
            to="/register"
            onClick={logout}
          />
        </SubMenu>
      </List>
    </SideBar>
  );
};

export default AppSideBar;
