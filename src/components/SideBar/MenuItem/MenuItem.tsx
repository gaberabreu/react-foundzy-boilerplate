import type { FC, ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export interface MenuItemProps extends ListItemButtonProps {
  icon?: ReactNode;
  suffix?: ReactNode;
  text?: string;
}

const MenuItem: FC<MenuItemProps> = ({ icon, suffix, text, ...rest }) => {
  return (
    <ListItem
      disablePadding
      sx={[{ display: "block" }]}
    >
      <ListItemButton {...rest}>
        <ListItemIcon
          sx={[
            {
              justifyContent: "center",
              marginRight: "10px",
              width: "35px",
              minWidth: "35px",
            },
          ]}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={[
            {
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          ]}
        />
        <ListItemIcon sx={[{ minWidth: "unset" }]}>{suffix}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
