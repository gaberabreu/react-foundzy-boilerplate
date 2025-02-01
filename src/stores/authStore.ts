import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthenticateResponse } from "@/interfaces/auth";

export type AuthState = {
  isAuthenticated?: boolean;
  data?: AuthenticateResponse;
};

export type AuthAction = {
  login: (data: AuthenticateResponse) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        login: (data: AuthenticateResponse) => set(() => ({ isAuthenticated: true, data })),
        logout: () => set(() => ({ isAuthenticated: false, data: undefined })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
