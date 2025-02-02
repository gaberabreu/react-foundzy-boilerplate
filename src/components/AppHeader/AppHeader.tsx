import type { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export interface AppHeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({ opened, toggle }) => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <IconButton
          aria-label="Toggle SideBar"
          color="inherit"
          edge="start"
          sx={{ mr: 5 }}
          onClick={toggle}
        >
          {opened ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          Foundzy
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppHeader;
