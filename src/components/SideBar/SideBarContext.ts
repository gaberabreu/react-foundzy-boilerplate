import { createContext, useContext } from "react";

export interface SideBarContextProps {
  opened?: boolean;
  subMenuWidth?: string;
}

export const SideBarContext = createContext<SideBarContextProps>({ opened: true });

export const useSideBarContext = () => {
  return useContext(SideBarContext);
};
