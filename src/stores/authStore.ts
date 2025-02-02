import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthenticateResponse } from "@/interfaces/auth";

export type AuthState = {
  authenticated?: boolean;
  user?: AuthenticateResponse;
};

export type AuthAction = {
  login: (user: AuthenticateResponse) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        login: (user: AuthenticateResponse) => set(() => ({ authenticated: true, user })),
        logout: () => set(() => ({ authenticated: false, user: undefined })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
