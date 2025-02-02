import { type FC } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

import MenuItem, { type MenuItemProps } from "../MenuItem";

export interface MenuLinkProps extends MenuItemProps {
  to: LinkProps["to"];
}

const MenuLink: FC<MenuLinkProps> = ({ ...rest }) => {
  return (
    <MenuItem
      component={Link}
      {...rest}
    ></MenuItem>
  );
};

export default MenuLink;
