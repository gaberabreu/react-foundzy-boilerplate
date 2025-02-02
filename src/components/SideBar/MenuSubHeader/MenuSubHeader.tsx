import type { FC } from "react";
import ListSubheader from "@mui/material/ListSubheader";

import { useSideBarContext } from "../SideBarContext";

export interface MenuSubHeaderProps {
  text?: string;
}

const MenuSubHeader: FC<MenuSubHeaderProps> = ({ text }) => {
  const { opened } = useSideBarContext();

  return (
    <ListSubheader
      sx={{
        height: "40px",
        overflow: "hidden",
        maxHeight: opened ? "40px" : "0px",
        transition: `max-height 225ms ease`,
      }}
    >
      {text}
    </ListSubheader>
  );
};

export default MenuSubHeader;
