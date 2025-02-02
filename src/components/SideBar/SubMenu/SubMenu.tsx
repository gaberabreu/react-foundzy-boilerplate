import { useState, type FC, type ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import List, { type ListProps } from "@mui/material/List";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import Menu, { type MenuProps } from "@mui/material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSideBarContext } from "../SideBarContext";
import MenuItem from "../MenuItem";

interface StyledMenuProps extends MenuProps {
  width?: string;
}

const StyledMenu = styled((props: StyledMenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme, width }) => ({
  "& .MuiPaper-root": {
    minWidth: width,
    marginLeft: theme.spacing(1),
  },
}));

const StyledSubMenuList = styled((props: ListProps) => (
  <List
    disablePadding
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

export interface SubMenuProps extends ListItemButtonProps {
  icon?: ReactNode;
  text?: string;
}

const SubMenu: FC<SubMenuProps> = ({ children, icon, text, ...rest }) => {
  const { opened, subMenuWidth } = useSideBarContext();

  const [subOpen, setSubOpen] = useState(false);
  const [subOpenWhenCollapsed, setSubOpenWhenCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (opened) {
      setSubOpen((prev) => !prev);
    } else if (subOpenWhenCollapsed) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
      setSubOpenWhenCollapsed((prev) => !prev);
    }
  };

  const handleClose = () => {
    setSubOpenWhenCollapsed(false);
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem
        icon={icon}
        suffix={subOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        text={text}
        onClick={handleOnClick}
        {...rest}
      ></MenuItem>
      <Collapse
        in={opened && subOpen}
        timeout="auto"
        unmountOnExit
      >
        <StyledSubMenuList>{children}</StyledSubMenuList>
      </Collapse>
      {!opened && (
        <StyledMenu
          open={subOpenWhenCollapsed}
          anchorEl={anchorEl}
          width={subMenuWidth}
          onClose={handleClose}
          onClick={handleClose}
        >
          <List disablePadding>{children}</List>
        </StyledMenu>
      )}
    </>
  );
};

export default SubMenu;
