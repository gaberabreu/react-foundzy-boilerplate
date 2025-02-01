export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  userId: string;
  email: string;
  token: string;
}
