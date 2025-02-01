import { httpClient } from "@/libs/axios";

import type { AuthenticateResponse, LoginRequest, RegisterRequest } from "@/interfaces/auth";

export const postLogin = async (data: LoginRequest) => {
  return await httpClient.post<AuthenticateResponse>("auth/login", data).then((response) => {
    return response.data;
  });
};

export const postRegister = async (data: RegisterRequest) => {
  return await httpClient.post<AuthenticateResponse>("auth/register", data).then((response) => {
    return response.data;
  });
};
