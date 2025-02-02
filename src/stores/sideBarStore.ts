import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type SideBarState = {
  opened?: boolean;
};

export type SideBarAction = {
  toggle: () => void;
};

const useSideBarStore = create<SideBarState & SideBarAction>()(
  devtools(
    persist(
      (set) => ({
        toggle: () => set((state) => ({ opened: !state.opened })),
      }),
      { name: "sideBarStore" }
    )
  )
);

export default useSideBarStore;
