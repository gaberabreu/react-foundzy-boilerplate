import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthenticateResponse } from "@/interfaces/auth";

export type AuthState = {
  authenticated?: boolean;
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
        authenticated: true,
        login: (data: AuthenticateResponse) => set(() => ({ authenticated: true, data })),
        logout: () => set(() => ({ authenticated: false, data: undefined })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
